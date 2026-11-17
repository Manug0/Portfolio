// Gráfico decorativo (sin datos reales) para la tarjeta "Economista e inversor" del perfil de finanzas.
// Se dibuja con CSS al entrar en pantalla (ver .mchart en globals.css).
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

export const MarketChart = () => (
	<svg aria-hidden viewBox="0 0 300 160" className="mchart">
		<defs>
			<linearGradient id="market-area" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0%" stopColor="rgb(var(--brand-rgb))" stopOpacity="0.35" />
				<stop offset="100%" stopColor="rgb(var(--brand-rgb))" stopOpacity="0" />
			</linearGradient>
		</defs>

		{[40, 80, 120].map((y) => (
			<line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgb(var(--line-rgb))" strokeOpacity="0.08" />
		))}

		{candles.map((candle, index) => (
			<g key={candle.x} className="mchart-candle" style={{ "--n": index } as React.CSSProperties}>
				<line
					x1={candle.x}
					x2={candle.x}
					y1={candle.high}
					y2={candle.low}
					stroke="rgb(var(--brand-soft-rgb))"
					strokeWidth="1"
				/>
				<rect
					x={candle.x - 5}
					y={Math.min(candle.open, candle.close)}
					width="10"
					height={Math.abs(candle.open - candle.close)}
					rx="1.5"
					fill="rgb(var(--brand-deep-rgb))"
					stroke="rgb(var(--brand-rgb))"
				/>
			</g>
		))}

		<path d={area} fill="url(#market-area)" className="mchart-area" />
		<path
			d={line}
			pathLength={1}
			fill="none"
			stroke="rgb(var(--brand-rgb))"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mchart-line"
		/>
		<circle cx="300" cy="22" r="4" fill="rgb(var(--brand-soft-rgb))" className="mchart-dot" />
	</svg>
);
