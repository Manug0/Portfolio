"use client";

import { Decal, Float } from "@react-three/drei";

import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

interface TechSphereProps {
	position: [number, number, number];
	scale: number;
	textureUrl: string;
}

export default function TechSphere({ position, scale, textureUrl }: TechSphereProps) {
	const decal = useLoader(TextureLoader, textureUrl);

	return (
		<Float speed={1.75} rotationIntensity={1} floatIntensity={2} position={position}>
			<mesh castShadow receiveShadow scale={scale}>
				<icosahedronGeometry args={[1, 1]} />
				<meshStandardMaterial color="white" polygonOffset polygonOffsetFactor={-5} flatShading />
				<Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={decal} />
			</mesh>
		</Float>
	);
}
