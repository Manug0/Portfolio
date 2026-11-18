"use client";

import React, { useState } from "react";

import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

// Credenciales públicas de EmailJS (la public key está pensada para usarse en el cliente)
const EMAILJS_SERVICE_ID = "service_190801";
const EMAILJS_TEMPLATE_ID = "template_b8i6517";
const EMAILJS_PUBLIC_KEY = "rMN3ao-jFpJxWP7ij";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

type Labels = {
	title: string;
	subtitle: string;
	name: string;
	namePlaceholder: string;
	email: string;
	emailPlaceholder: string;
	message: string;
	company: string;
	sending: string;
	send: string;
	success: string;
	error: string;
	errors: { name: string; email: string; emailInvalid: string; message: string; messageShort: string };
};

export function ContactForm({ placeholder, email, labels }: { placeholder: string; email: string; labels: Labels }) {
	const [status, setStatus] = useState<Status>("idle");
	const [errors, setErrors] = useState<Errors>({});
	// Tras el primer intento de envío, los errores se revisan según se escribe
	const [attempted, setAttempted] = useState(false);

	const validate = (data: FormData): Errors => {
		const value = (field: string) => String(data.get(field) ?? "").trim();
		const found: Errors = {};
		if (!value("name")) found.name = labels.errors.name;
		if (!value("email")) found.email = labels.errors.email;
		else if (!EMAIL_PATTERN.test(value("email"))) found.email = labels.errors.emailInvalid;
		if (!value("message")) found.message = labels.errors.message;
		else if (value("message").length < 10) found.message = labels.errors.messageShort;
		return found;
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		// Honeypot anti-spam: los humanos no ven ese campo
		if (data.get("company")) return;

		const found = validate(data);
		setErrors(found);
		setAttempted(true);
		const firstInvalid = (["name", "email", "message"] as const).find((field) => found[field]);
		if (firstInvalid) {
			form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
			return;
		}

		setStatus("sending");
		try {
			// EmailJS solo se descarga al enviar: no pesa en la carga de la página
			const { default: emailjs } = await import("@emailjs/browser");
			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				{
					from_name: String(data.get("name")).trim(),
					from_email: String(data.get("email")).trim(),
					message: String(data.get("message")).trim(),
				},
				{ publicKey: EMAILJS_PUBLIC_KEY }
			);
			setStatus("success");
			form.reset();
			setAttempted(false);
			setTimeout(() => setStatus("idle"), 6000);
		} catch (error) {
			console.error("Error al enviar el mensaje:", error);
			setStatus("error");
		}
	};

	return (
		<div className="card w-full p-6 md:p-8">
			<h3 className="text-xl font-semibold tracking-tight">{labels.title}</h3>
			<p className="mt-2 text-sm text-muted">{labels.subtitle}</p>

			<form
				className="mt-8"
				onSubmit={onSubmit}
				onChange={(event) => attempted && setErrors(validate(new FormData(event.currentTarget)))}
				noValidate>
				<div className="mb-4 flex flex-col gap-4 md:flex-row">
					<Field className="flex-1">
						<label htmlFor="name" className="text-sm font-medium">
							{labels.name}
						</label>
						<input
							id="name"
							autoComplete="name"
							placeholder={labels.namePlaceholder}
							type="text"
							className="field"
							aria-invalid={errors.name ? "true" : "false"}
							aria-describedby={errors.name ? "name-error" : undefined}
							name="name"
						/>
						{errors.name && <ErrorMessage id="name-error">{errors.name}</ErrorMessage>}
					</Field>

					<Field className="flex-1">
						<label htmlFor="email" className="text-sm font-medium">
							{labels.email}
						</label>
						<input
							id="email"
							autoComplete="email"
							placeholder={labels.emailPlaceholder}
							type="email"
							className="field"
							aria-invalid={errors.email ? "true" : "false"}
							aria-describedby={errors.email ? "email-error" : undefined}
							name="email"
						/>
						{errors.email && <ErrorMessage id="email-error">{errors.email}</ErrorMessage>}
					</Field>
				</div>

				<Field className="mb-6">
					<label htmlFor="message" className="text-sm font-medium">
						{labels.message}
					</label>
					<textarea
						id="message"
						rows={5}
						placeholder={placeholder}
						className="field min-h-32 resize-y"
						aria-invalid={errors.message ? "true" : "false"}
						aria-describedby={errors.message ? "message-error" : undefined}
						name="message"
					/>
					{errors.message && <ErrorMessage id="message-error">{errors.message}</ErrorMessage>}
				</Field>

				<div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
					<label htmlFor="company">{labels.company}</label>
					<input id="company" name="company" tabIndex={-1} autoComplete="off" />
				</div>

				<button
					type="submit"
					disabled={status === "sending"}
					className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-60">
					{status === "sending" ? labels.sending : labels.send}
					{status !== "sending" && <HiArrowRight aria-hidden className="size-4" />}
				</button>
			</form>

			<div aria-live="polite" className="mt-4 min-h-6 text-center text-sm">
				{status === "success" && <p className="text-up">{labels.success}</p>}
				{status === "error" && (
					<p className="text-red-400">
						{labels.error}{" "}
						<a className="underline hover:text-red-300" href={`mailto:${email}`}>
							{email}
						</a>
						.
					</p>
				)}
			</div>
		</div>
	);
}

const Field = ({ children, className }: { children: React.ReactNode; className?: string }) => (
	<div className={cn("flex w-full flex-col gap-2", className)}>{children}</div>
);

const ErrorMessage = ({ children, id }: { children: React.ReactNode; id: string }) => (
	<p id={id} role="alert" className="text-sm text-red-400">
		{children}
	</p>
);
