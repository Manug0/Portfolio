"use client";

import { useEffect, useState } from "react";

import { Suspense } from "react";
import TechSphere from "./TechSphere";

const initialSphereData = [
	{
		name: "Bitcoin",
		position: [-10, 0, 0] as [number, number, number],
		scale: 5,
		textureUrl: "/bitcoin-btc-logo.svg",
	},
	{
		name: "Ethereum",
		position: [10, 0, 0] as [number, number, number],
		scale: 5,
		textureUrl: "/ethereum-eth-logo.svg",
	},
];

export default function TechSpheres() {
	const [sphereData, setSphereData] = useState(initialSphereData);

	return (
		<>
			<ambientLight intensity={0.9} />
			<directionalLight position={[0, 0, 0.25]} />
			{sphereData.map((sphere) => (
				<TechSphere key={sphere.name} {...sphere} />
			))}
		</>
	);
}
