"use client";

import { IoCheckmarkDone, IoCopyOutline } from "react-icons/io5";

import { siteConfig } from "@/data";
import { useState } from "react";

// canvas-confetti necesita hex: leemos el color de marca del perfil activo desde las variables CSS
const brandHex = (element: HTMLElement, variable: string) => {
	const rgb = getComputedStyle(element).getPropertyValue(variable).trim().split(/\s+/).map(Number);
	if (rgb.length !== 3 || rgb.some(Number.isNaN)) return "#ffffff";
	return "#" + rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("");
};

export const CopyEmail = () => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
		if (copied) return;
		// Guardamos el botón antes del await: React anula currentTarget al terminar el evento
		const button = event.currentTarget;
		try {
			await navigator.clipboard.writeText(siteConfig.email);
		} catch {
			// Sin acceso al portapapeles (p. ej. HTTP o permisos): abrimos el cliente de correo
			window.location.href = `mailto:${siteConfig.email}`;
			return;
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 3000);

		// El confeti solo se descarga la primera vez que hace falta
		const { default: confetti } = await import("canvas-confetti");
		const { left, top, width, height } = button.getBoundingClientRect();
		confetti({
			particleCount: 120,
			spread: 80,
			startVelocity: 35,
			origin: {
				x: (left + width / 2) / window.innerWidth,
				y: (top + height / 2) / window.innerHeight,
			},
			colors: ["--brand-rgb", "--brand-soft-rgb", "--other-rgb"]
				.map((variable) => brandHex(button, variable))
				.concat("#ffffff"),
			disableForReducedMotion: true,
		});
	};

	return (
		<>
			<button type="button" onClick={handleCopy} className="btn btn-ghost bg-ink/70">
				{copied ? <IoCheckmarkDone aria-hidden className="size-4 text-up" /> : <IoCopyOutline aria-hidden className="size-4" />}
				{copied ? "¡Email copiado!" : "Copia mi email"}
			</button>
			<span className="sr-only" aria-live="polite">
				{copied ? "Email copiado al portapapeles" : ""}
			</span>
		</>
	);
};
