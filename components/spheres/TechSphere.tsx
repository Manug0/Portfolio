"use client";

import { useEffect, useRef } from "react";

interface TechSphereProps {
	position: [number, number, number];
	scale: number;
	textureUrl: string;
}

export default function TechSphere({ position, scale, textureUrl }: TechSphereProps) {
	const sphereRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sphereRef.current) return;

		let animationFrameId: number;
		let startTime = Date.now();

		const animate = () => {
			const elapsed = (Date.now() - startTime) / 1000;

			// Solo flotación vertical y horizontal suave
			const floatY = Math.sin(elapsed * 1.5) * 15;
			const floatX = Math.cos(elapsed * 1.5 * 0.5) * 8;

			if (sphereRef.current) {
				sphereRef.current.style.transform = `
					translate(
						${position[0] * 50 + floatX}px,
						${position[1] * -50 + floatY}px
					)
					scale(${scale})
				`;
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [position, scale]);

	return (
		<div
			ref={sphereRef}
			className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			style={{
				width: "150px",
				height: "150px",
				transition: "transform 0.1s ease-out",
			}}>
			<img src={textureUrl} alt="" className="w-full h-full object-contain" />
		</div>
	);
}
