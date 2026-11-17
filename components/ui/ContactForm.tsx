"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data";

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

export function ContactForm({ placeholder }: { placeholder: string }) {
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
			<h3 className="text-xl font-semibold tracking-tight">Escríbeme</h3>
			<p className="mt-2 text-sm text-muted">Te responderé lo antes posible.</p>

			<form className="mt-8" onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-4 flex flex-col gap-4 md:flex-row">
					<Field className="flex-1">
						<label htmlFor="name" className="text-sm font-medium">
							Nombre
						</label>
						<input
							id="name"
							autoComplete="name"
							placeholder="Tu nombre"
							type="text"
							className="field"
							aria-invalid={errors.name ? "true" : "false"}
							aria-describedby={errors.name ? "name-error" : undefined}
							{...register("name", { required: "El nombre es obligatorio" })}
						/>
						{errors.name && <ErrorMessage id="name-error">{errors.name.message}</ErrorMessage>}
					</Field>

					<Field className="flex-1">
						<label htmlFor="email" className="text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							autoComplete="email"
							placeholder="correo@ejemplo.com"
							type="email"
							className="field"
							aria-invalid={errors.email ? "true" : "false"}
							aria-describedby={errors.email ? "email-error" : undefined}
							{...register("email", {
								required: "El email es obligatorio",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "El email no es válido",
								},
							})}
						/>
						{errors.email && <ErrorMessage id="email-error">{errors.email.message}</ErrorMessage>}
					</Field>
				</div>

				<Field className="mb-6">
					<label htmlFor="message" className="text-sm font-medium">
						Mensaje
					</label>
					<textarea
						id="message"
						rows={5}
						placeholder={placeholder}
						className="field min-h-32 resize-y"
						aria-invalid={errors.message ? "true" : "false"}
						aria-describedby={errors.message ? "message-error" : undefined}
						{...register("message", {
							required: "El mensaje es obligatorio",
							minLength: { value: 10, message: "Cuéntame un poco más (mínimo 10 caracteres)" },
						})}
					/>
					{errors.message && <ErrorMessage id="message-error">{errors.message.message}</ErrorMessage>}
				</Field>

				<div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
					<label htmlFor="company">Empresa</label>
					<input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
				</div>

				<button
					type="submit"
					disabled={status === "sending"}
					className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-60">
					{status === "sending" ? "Enviando…" : "Enviar mensaje"}
					{status !== "sending" && <HiArrowRight aria-hidden className="size-4" />}
				</button>
			</form>

			<div aria-live="polite" className="mt-4 min-h-6 text-center text-sm">
				{status === "success" && <p className="text-up">¡Mensaje enviado! Gracias por escribirme.</p>}
				{status === "error" && (
					<p className="text-red-400">
						No se pudo enviar el mensaje. Escríbeme directamente a{" "}
						<a className="underline hover:text-red-300" href={`mailto:${siteConfig.email}`}>
							{siteConfig.email}
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
