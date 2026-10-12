"use client";

import { motion } from "framer-motion";

// Gráfico decorativo (sin datos reales) para la tarjeta "Economista e inversor" del perfil de finanzas
const points = [
	[0, 120], [25, 112], [50, 118], [75, 96], [100, 102], [125, 80], [150, 88],
	[175, 64], [200, 70], [225, 48], [250, 56], [275, 30], [300, 22],
];

const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
const area = `${line} L300,160 L0,160 Z`;

const candles = [
	{ x: 40, open: 128, close: 112, high: 106, low: 134 },
	{ x: 90, open: 112, close: 100, high: 94, low: 118 },
	{ x: 140, open: 100, close: 92, high: 84, low: 106 },
	{ x: 190, open: 92, close: 74, high: 68, low: 96 },
	{ x: 240, open: 74, close: 62, high: 54, low: 80 },
];

export const MarketChart = () => {
	return (
		<svg
			aria-hidden
			viewBox="0 0 300 160"
			className="pointer-events-none absolute right-0 bottom-0 w-56 md:w-48 lg:w-80 opacity-90"
			preserveAspectRatio="none">
			<defs>
				<linearGradient id="market-area" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="rgb(var(--brand-rgb))" stopOpacity="0.35" />
					<stop offset="100%" stopColor="rgb(var(--brand-rgb))" stopOpacity="0" />
				</linearGradient>
			</defs>

			{[40, 80, 120].map((y) => (
				<line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />
			))}

			{candles.map((c, i) => (
				<motion.g
					key={c.x}
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 0.5, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 + i * 0.12 }}>
					<line x1={c.x} x2={c.x} y1={c.high} y2={c.low} stroke="rgb(var(--brand-soft-rgb))" strokeWidth="1" />
					<rect
						x={c.x - 5}
						y={Math.min(c.open, c.close)}
						width="10"
						height={Math.abs(c.open - c.close)}
						rx="1.5"
						fill="rgb(var(--brand-deep-rgb))"
						stroke="rgb(var(--brand-rgb))"
					/>
				</motion.g>
			))}

			<motion.path
				d={area}
				fill="url(#market-area)"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 1.2, delay: 0.6 }}
			/>
			<motion.path
				d={line}
				fill="none"
				stroke="rgb(var(--brand-rgb))"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 1.6, ease: "easeInOut" }}
			/>
			<motion.circle
				cx="300"
				cy="22"
				r="4"
				fill="rgb(var(--brand-rgb))"
				initial={{ scale: 0 }}
				whileInView={{ scale: [0, 1.4, 1] }}
				viewport={{ once: true }}
				transition={{ delay: 1.6, duration: 0.5 }}
			/>
		</svg>
	);
};
