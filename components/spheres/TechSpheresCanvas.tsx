"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import TechSpheres from "./TechSpheres";

export default function TechSpheresCanvas() {
	return (
		<div className="w-full h-full">
			<Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
				<Suspense fallback={null}>
					<TechSpheres />
				</Suspense>
			</Canvas>
		</div>
	);
}
