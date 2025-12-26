"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const CanvasRevealEffect = ({
	animationSpeed = 0.4,
	opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
	colors = [[0, 255, 255]],
	containerClassName,
	dotSize = 3,
	showGradient = true,
}: {
	animationSpeed?: number;
	opacities?: number[];
	colors?: number[][];
	containerClassName?: string;
	dotSize?: number;
	showGradient?: boolean;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth * 2;
			canvas.height = canvas.offsetHeight * 2;
			ctx.scale(2, 2);
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const totalSize = 4;
		const cols = Math.ceil(canvas.offsetWidth / totalSize);
		const rows = Math.ceil(canvas.offsetHeight / totalSize);

		let startTime = Date.now();
		let animationFrameId: number;

		const getColor = (index: number) => {
			const colorIndex = Math.floor((index % 1000) / 1000 * colors.length);
			return colors[Math.min(colorIndex, colors.length - 1)];
		};

		const random = (x: number, y: number) => {
			const val = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
			return val - Math.floor(val);
		};

		const draw = () => {
			const currentTime = (Date.now() - startTime) / 1000;
			ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					const x = i * totalSize;
					const y = j * totalSize;
					
					const centerX = canvas.offsetWidth / 2;
					const centerY = canvas.offsetHeight / 2;
					const distance = Math.sqrt(
						Math.pow((x - centerX) / totalSize, 2) + 
						Math.pow((y - centerY) / totalSize, 2)
					);

					const introOffset = distance * 0.01 + random(i, j) * 0.15;
					
					if (currentTime * animationSpeed > introOffset) {
						const frequency = 5.0;
						const showOffset = random(i, j);
						const timeVal = Math.floor(currentTime / frequency + showOffset + frequency);
						const rand = random(i * timeVal, j * timeVal);
						
						const opacityIndex = Math.floor(rand * opacities.length);
						let opacity = opacities[Math.min(opacityIndex, opacities.length - 1)];

						const fadeIn = Math.min(
							(1.0 - Math.max(0, Math.min(1, (currentTime * animationSpeed - introOffset - 0.1) / 0.1))) * 1.25,
							1.25
						);
						opacity *= fadeIn;

						const color = getColor(i * rows + j);
						ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
						ctx.fillRect(x, y, dotSize, dotSize);
					}
				}
			}

			animationFrameId = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationFrameId);
		};
	}, [animationSpeed, opacities, colors, dotSize]);

	return (
		<div className={cn("h-full relative bg-white w-full", containerClassName)}>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 h-full w-full"
			/>
			{showGradient && (
				<div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%] pointer-events-none" />
			)}
		</div>
	);
};