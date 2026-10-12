"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import React from "react";

const Approach = () => {
	return (
		<section className="w-full py-20" aria-labelledby="approach-title">
			<p className="eyebrow mb-3">Cómo trabajo</p>
			<h2 id="approach-title" className="heading">
				Mi <span className="text-purple">enfoque</span>
			</h2>
			<div className="mt-14 mb-10 flex flex-col lg:flex-row items-stretch justify-center w-full gap-6 lg:gap-4">
				<Card
					title="Entender el negocio"
					icon={<AceternityIcon order="Fase 1" />}
					des="Recojo requisitos funcionales y técnicos junto a los equipos de negocio y tecnología, y los traduzco en una solución clara y bien documentada.">
					<CanvasRevealEffect
						animationSpeed={5.1}
						containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
					/>
				</Card>
				<Card
					title="Diseñar datos e integraciones"
					icon={<AceternityIcon order="Fase 2" />}
					des="Defino modelos de datos, esquemas e integraciones entre sistemas (APIs REST y SOAP) pensando en la escalabilidad y en el mantenimiento a largo plazo.">
					<CanvasRevealEffect
						animationSpeed={3}
						containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
						colors={[
							[255, 166, 158],
							[221, 255, 247],
						]}
						dotSize={2}
					/>
				</Card>
				<Card
					title="Construir, automatizar y desplegar"
					icon={<AceternityIcon order="Fase 3" />}
					des="Desarrollo con Apex, LWC, Flows y Agentforce, automatizo procesos y cuido la calidad con pruebas, control de cambios y CI/CD (Salesforce CLI y Jenkins).">
					<CanvasRevealEffect
						animationSpeed={3}
						containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
						colors={[[125, 211, 252]]}
					/>
				</Card>
			</div>
		</section>
	);
};

export default Approach;

const Card = ({
	title,
	icon,
	children,
	des,
}: {
	title: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	des: string;
}) => {
	const [hovered, setHovered] = React.useState(false);
	return (
		<article
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="glass-card group/canvas-card relative flex items-center justify-center max-w-sm w-full mx-auto p-6 lg:p-4 lg:h-[32rem] !rounded-3xl border-white/[0.2]">
			<Icon className="absolute h-10 w-10 -top-3 -left-3 text-white opacity-30" />
			<Icon className="absolute h-10 w-10 -bottom-3 -left-3 text-white opacity-30" />
			<Icon className="absolute h-10 w-10 -top-3 -right-3 text-white opacity-30" />
			<Icon className="absolute h-10 w-10 -bottom-3 -right-3 text-white opacity-30" />

			<AnimatePresence>
				{hovered && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="h-full w-full absolute inset-0 hidden lg:block">
						{children}
					</motion.div>
				)}
			</AnimatePresence>

			{/* En móvil/tablet el contenido se muestra siempre; en escritorio se revela al pasar el ratón */}
			<div className="relative z-20 lg:px-6 flex flex-col items-center">
				<div
					className="mb-4 lg:mb-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
					lg:group-hover/canvas-card:-translate-y-4 lg:group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 flex items-center justify-center">
					{icon}
				</div>
				<h3
					className="text-center text-2xl lg:text-3xl font-bold text-white lg:opacity-0 lg:group-hover/canvas-card:opacity-100
					relative z-10 lg:group-hover/canvas-card:-translate-y-2 transition duration-200">
					{title}
				</h3>
				<p
					className="text-sm lg:text-base text-center text-blue-100 mt-4 lg:opacity-0 lg:group-hover/canvas-card:opacity-100
					relative z-10 lg:group-hover/canvas-card:-translate-y-2 transition duration-200">
					{des}
				</p>
			</div>
		</article>
	);
};

const AceternityIcon = ({ order }: { order: string }) => {
	return (
		<div>
			<span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
				<span
					className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
				/>
				<span
					className="inline-flex h-full w-full items-center 
        justify-center rounded-full bg-slate-950 px-5 py-2 text-purple backdrop-blur-3xl font-bold text-xl lg:text-2xl">
					{order}
				</span>
			</span>
		</div>
	);
};

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			{...rest}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
		</svg>
	);
};
