"use client";

import TechSphere from "./TechSphere";

interface TechSpheresCanvasProps {
	spheres?: Array<{
		position: [number, number, number];
		scale: number;
		textureUrl: string;
	}>;
}

export default function TechSpheresCanvas({ spheres }: TechSpheresCanvasProps) {
	const defaultSpheres = [
		{
			position: [-5, 1.5, 0] as [number, number, number],
			scale: 1,
			textureUrl: "/bitcoin-btc-logo.svg",
		},
		{
			position: [2, 1.5, 0] as [number, number, number],
			scale: 1.2,
			textureUrl: "/ethereum-eth-logo.svg",
		},
	];

	const spheresToRender = spheres || defaultSpheres;

	return (
		<div className="w-full h-full relative overflow-hidden">
			{spheresToRender.map((sphere, index) => (
				<TechSphere
					key={index}
					position={sphere.position}
					scale={sphere.scale}
					textureUrl={sphere.textureUrl}
				/>
			))}
		</div>
	);
}
