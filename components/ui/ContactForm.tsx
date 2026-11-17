"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

// Credenciales públicas de EmailJS (la public key está pensada para usarse en el cliente)
const EMAILJS_SERVICE_ID = "service_190801";
const EMAILJS_TEMPLATE_ID = "template_b8i6517";
const EMAILJS_PUBLIC_KEY = "rMN3ao-jFpJxWP7ij";

type FormData = {
	name: string;
	email: string;
	message: string;
	company: string; // honeypot anti-spam: los humanos no lo ven
};

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		if (data.company) return;
		setStatus("sending");
		try {
			// EmailJS solo se descarga al enviar: no pesa en la carga de la página
			const { default: emailjs } = await import("@emailjs/browser");
			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				{
					from_name: data.name,
					from_email: data.email,
					message: data.message,
				},
				{ publicKey: EMAILJS_PUBLIC_KEY }
			);
			setStatus("success");
			reset();
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

			<form className="mt-8" onSubmit={handleSubmit(onSubmit)} noValidate>
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
							{...register("name", { required: labels.errors.name })}
						/>
						{errors.name && <ErrorMessage id="name-error">{errors.name.message}</ErrorMessage>}
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
							{...register("email", {
								required: labels.errors.email,
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: labels.errors.emailInvalid,
								},
							})}
						/>
						{errors.email && <ErrorMessage id="email-error">{errors.email.message}</ErrorMessage>}
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
						{...register("message", {
							required: labels.errors.message,
							minLength: { value: 10, message: labels.errors.messageShort },
						})}
					/>
					{errors.message && <ErrorMessage id="message-error">{errors.message.message}</ErrorMessage>}
				</Field>

				<div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
					<label htmlFor="company">{labels.company}</label>
					<input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
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
