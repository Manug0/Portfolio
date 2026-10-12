"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

export const BackgroundGradientAnimation = ({
	gradientBackgroundStart = "rgb(108, 0, 162)",
	gradientBackgroundEnd = "rgb(0, 17, 82)",
	firstColor = "18, 113, 255",
	secondColor = "221, 74, 255",
	thirdColor = "100, 220, 255",
	fourthColor = "200, 50, 50",
	fifthColor = "180, 180, 50",
	pointerColor = "140, 100, 255",
	size = "80%",
	blendingValue = "hard-light",
	children,
	className,
	interactive = true,
	containerClassName,
}: {
	gradientBackgroundStart?: string;
	gradientBackgroundEnd?: string;
	firstColor?: string;
	secondColor?: string;
	thirdColor?: string;
	fourthColor?: string;
	fifthColor?: string;
	pointerColor?: string;
	size?: string;
	blendingValue?: string;
	children?: React.ReactNode;
	className?: string;
	interactive?: boolean;
	containerClassName?: string;
}) => {
	const interactiveRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const isSafari = useSyncExternalStore(
		noopSubscribe,
		() => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
		() => false
	);

	// Variables CSS en el propio contenedor (no en <body>) para no contaminar el resto de la página
	const cssVars = {
		"--gradient-background-start": gradientBackgroundStart,
		"--gradient-background-end": gradientBackgroundEnd,
		"--first-color": firstColor,
		"--second-color": secondColor,
		"--third-color": thirdColor,
		"--fourth-color": fourthColor,
		"--fifth-color": fifthColor,
		"--pointer-color": pointerColor,
		"--size": size,
		"--blending-value": blendingValue,
	} as React.CSSProperties;

	// El puntero interactivo sigue al ratón con interpolación suave en un único bucle rAF
	useEffect(() => {
		if (!interactive) return;
		const container = containerRef.current;
		const pointer = interactiveRef.current;
		if (!container || !pointer) return;

		let frame = 0;
		let curX = 0;
		let curY = 0;
		let tgX = 0;
		let tgY = 0;

		const onMove = (event: MouseEvent) => {
			const rect = container.getBoundingClientRect();
			tgX = event.clientX - rect.left - rect.width / 2;
			tgY = event.clientY - rect.top - rect.height / 2;
		};

		const tick = () => {
			curX += (tgX - curX) / 20;
			curY += (tgY - curY) / 20;
			pointer.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
			frame = requestAnimationFrame(tick);
		};

		window.addEventListener("mousemove", onMove, { passive: true });
		frame = requestAnimationFrame(tick);
		return () => {
			window.removeEventListener("mousemove", onMove);
			cancelAnimationFrame(frame);
		};
	}, [interactive]);

	return (
		<div
			ref={containerRef}
			style={cssVars}
			className={cn(
				"h-full w-full absolute overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
				containerClassName
			)}>
			<svg className="hidden" aria-hidden>
				<defs>
					<filter id="blurMe">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
							result="goo"
						/>
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>
			<div className={cn("", className)}>{children}</div>
			<div
				className={cn(
					"gradients-container h-full w-full blur-lg",
					isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
				)}>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
						`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
						`[transform-origin:center_center]`,
						`animate-first`,
						`opacity-100`
					)}></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
						`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
						`[transform-origin:calc(50%-400px)]`,
						`animate-second`,
						`opacity-100`
					)}></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
						`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
						`[transform-origin:calc(50%+400px)]`,
						`animate-third`,
						`opacity-100`
					)}></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
						`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
						`[transform-origin:calc(50%-200px)]`,
						`animate-fourth`,
						`opacity-70`
					)}></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
						`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
						`[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
						`animate-fifth`,
						`opacity-100`
					)}></div>

				{interactive && (
					<div
						ref={interactiveRef}
						className={cn(
							`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
							`[mix-blend-mode:var(--blending-value)] w-full h-full top-0 left-0`,
							`opacity-70`
						)}></div>
				)}
			</div>
		</div>
	);
};
