"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "./Input";
import { Label } from "./Label";
import { cn } from "@/lib/utils";
import emailjs from "emailjs-com";

type FormData = {
	name: string;
	email: string;
	message: string;
};

export function ContactFormDemo() {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await emailjs.send(
				"service_190801",
				"template_b8i6517",
				{
					from_name: data.name,
					from_email: data.email,
					message: data.message,
				},
				"rMN3ao-jFpJxWP7ij"
			);
			setShowConfirmation(true);
			reset();
			setTimeout(() => setShowConfirmation(false), 5000);
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	};

	return (
		<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input z-10 relative bg-white dark:bg-black">
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Contacta conmigo</h2>
			<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
				Por favor, completa los campos para enviarme un mensaje.
			</p>

			<form className="my-8" onSubmit={handleSubmit(onSubmit)}>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="name">Tu nombre</Label>
					<Input
						id="name"
						{...register("name", { required: "El nombre es requerido" })}
						placeholder="Juan Pérez"
						type="text"
					/>
					{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
				</LabelInputContainer>

				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Tu email</Label>
					<Input
						id="email"
						{...register("email", {
							required: "El email es requerido",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "El email no es válido",
							},
						})}
						placeholder="correo@ejemplo.com"
						type="email"
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</LabelInputContainer>

				<LabelInputContainer className="mb-4">
					<Label htmlFor="message">Mensaje</Label>
					<Input
						id="message"
						{...register("message", { required: "El mensaje es requerido" })}
						placeholder="Escribe tu mensaje aquí..."
						className="resize-none h-32"
					/>
					{errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
				</LabelInputContainer>

				<button
					className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit">
					Enviar mensaje &rarr;
					<BottomGradient />
				</button>
			</form>

			{showConfirmation && (
				<div className="text-green-600 text-center mt-4">¡Mensaje enviado con éxito!</div>
			)}
		</div>
	);
}

const BottomGradient = () => (
	<>
		<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
		<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
	</>
);

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
	<p className="text-red-500 text-sm mt-1">{children}</p>
);
