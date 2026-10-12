"use client";

import { Input, Textarea } from "./Input";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Label } from "./Label";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
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

export function ContactForm() {
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
		<div className="glass-card w-full p-6 md:p-8 shadow-input relative z-10">
			<h3 className="font-bold text-xl text-white">Escríbeme</h3>
			<p className="text-white-200 text-sm mt-2">Te responderé lo antes posible.</p>

			<form className="mt-8" onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col md:flex-row gap-4 mb-4">
					<Field className="flex-1">
						<Label htmlFor="name">Nombre</Label>
						<Input
							id="name"
							autoComplete="name"
							placeholder="Tu nombre"
							type="text"
							aria-invalid={errors.name ? "true" : "false"}
							aria-describedby={errors.name ? "name-error" : undefined}
							{...register("name", { required: "El nombre es obligatorio" })}
						/>
						{errors.name && <ErrorMessage id="name-error">{errors.name.message}</ErrorMessage>}
					</Field>

					<Field className="flex-1">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							autoComplete="email"
							placeholder="correo@ejemplo.com"
							type="email"
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
					<Label htmlFor="message">Mensaje</Label>
					<Textarea
						id="message"
						rows={5}
						placeholder="Cuéntame sobre el puesto o el proyecto…"
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
					className="relative group/btn w-full h-11 rounded-md font-medium text-white border border-purple/30 bg-gradient-to-br from-[#161A31] to-[#10132E] transition hover:border-purple/70 disabled:opacity-60 disabled:cursor-wait"
					type="submit"
					disabled={status === "sending"}>
					{status === "sending" ? "Enviando…" : "Enviar mensaje →"}
					<BottomGradient />
				</button>
			</form>

			<div aria-live="polite" className="min-h-6 mt-4 text-center text-sm">
				{status === "success" && <p className="text-emerald-400">¡Mensaje enviado! Gracias por escribirme.</p>}
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

const BottomGradient = () => (
	<>
		<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-purple to-transparent" />
		<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
	</>
);

const Field = ({ children, className }: { children: React.ReactNode; className?: string }) => (
	<div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);

const ErrorMessage = ({ children, id }: { children: React.ReactNode; id: string }) => (
	<p id={id} role="alert" className="text-red-400 text-sm">
		{children}
	</p>
);
