"use client";

import { IoCheckmarkDone, IoCopyOutline } from "react-icons/io5";
import { type ProfileId, getProfile } from "@/data/profiles";

import { BackgroundGradientAnimation } from "./GradientBg";
import { FloatingTokens } from "./FloatingTokens";
import MagicButton from "./MagicButton";
import { MarketChart } from "./MarketChart";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { siteConfig } from "@/data";
import { useState } from "react";

// canvas-confetti necesita hex: leemos el color de marca del perfil activo desde las variables CSS
const brandHex = (element: HTMLElement, variable: string) => {
	const rgb = getComputedStyle(element).getPropertyValue(variable).trim().split(/\s+/).map(Number);
	if (rgb.length !== 3 || rgb.some(Number.isNaN)) return "#ffffff";
	return "#" + rgb.map((c) => c.toString(16).padStart(2, "0")).join("");
};

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 lg:gap-8 mx-auto",
				className
			)}>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	id,
	title,
	description,
	img,
	imgClassName,
	titleClassName,
	spareImg,
	index = 0,
	profileId,
}: {
	className?: string;
	id: number;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	img?: string;
	imgClassName?: string;
	titleClassName?: string;
	spareImg?: string;
	index?: number;
	profileId: ProfileId;
}) => {
	const { bentoStack, gradient } = getProfile(profileId);
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
		const { left, top, width, height } = button.getBoundingClientRect();
		confetti({
			particleCount: 120,
			spread: 80,
			startVelocity: 35,
			origin: {
				x: (left + width / 2) / window.innerWidth,
				y: (top + height / 2) / window.innerHeight,
			},
			colors: ["--brand-rgb", "--brand-soft-rgb", "--brand-deep-rgb"]
				.map((variable) => brandHex(button, variable))
				.concat("#ffffff"),
			disableForReducedMotion: true,
		});
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.5, delay: index * 0.06 }}
			className={cn(
				"glass-card relative overflow-hidden group/bento hover:border-white/[0.2] hover:shadow-[0_0_40px_-10px_rgb(var(--brand-rgb)/0.35)] transition-[border-color,box-shadow] duration-300 flex flex-col",
				id === 5 && "min-h-[22rem] md:min-h-0",
				id === 1 && "min-h-[22rem]",
				className
			)}>
			<div className={cn("h-full", id === 6 && "flex justify-center")}>
				<div className="w-full h-full absolute">
					{img && (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={img}
							alt=""
							aria-hidden
							className={cn(imgClassName, "object-cover object-center", id === 1 && "brand-tint")}
						/>
					)}
				</div>
				{id === 1 && (
					<div
						aria-hidden
						className="absolute inset-0 bg-gradient-to-t from-black-100 via-black-100/60 to-transparent"
					/>
				)}
				{spareImg && (
					<div className={cn("absolute right-0 -bottom-5", id === 5 && "w-full opacity-80")}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={spareImg}
							alt=""
							aria-hidden
							className="object-cover object-center w-full h-full"
						/>
					</div>
				)}
				{id === 5 && <FloatingTokens />}
				{id === 2 && !img && <MarketChart />}
				{id === 6 && (
					<BackgroundGradientAnimation
						gradientBackgroundStart={gradient.start}
						gradientBackgroundEnd={gradient.end}
						firstColor={gradient.first}
						secondColor={gradient.second}
						thirdColor={gradient.third}
						fourthColor={gradient.fourth}
						fifthColor={gradient.fifth}
						pointerColor={gradient.pointer}
					/>
				)}

				<div
					className={cn(
						titleClassName,
						"group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col p-5 lg:p-10",
						id === 1 && "h-full"
					)}>
					{description && (
						<p className="font-sans font-light md:max-w-40 lg:max-w-60 text-xs lg:text-sm text-[#C1C2D3] z-10 mb-1">
							{description}
						</p>
					)}
					<h3
						className={cn(
							"font-sans text-lg lg:text-3xl font-bold z-10 text-balance",
							id === 3 || id === 2 ? "max-w-48 lg:max-w-64" : "max-w-96",
							id === 6 && "w-60"
						)}>
						{title}
					</h3>

					{id === 3 && (
						<div
							aria-label="Tecnologías principales"
							className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
							<div className="flex flex-col gap-3 lg:gap-8">
								{bentoStack.left.map((item) => (
									<span
										key={item}
										className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-60 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
										{item}
									</span>
								))}
								<span aria-hidden className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]" />
							</div>
							<div className="flex flex-col gap-3 lg:gap-8">
								<span aria-hidden className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]" />
								{bentoStack.right.map((item) => (
									<span
										key={item}
										className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-60 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
										{item}
									</span>
								))}
							</div>
						</div>
					)}

					{id === 6 && (
						<div className="mt-5 relative m-auto">
							<MagicButton
								title={copied ? "¡Email copiado!" : "Copia mi email"}
								icon={copied ? <IoCheckmarkDone /> : <IoCopyOutline />}
								position="left"
								handleClick={handleCopy}
								otherClasses="!bg-[#161A31] text-xs md:text-sm whitespace-nowrap"
							/>
							<span className="sr-only" aria-live="polite">
								{copied ? "Email copiado al portapapeles" : ""}
							</span>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};
