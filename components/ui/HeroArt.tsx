"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { type ProfileId, otherProfile } from "@/data/profiles";
import { carrySeam, switchProfile, takeSeam } from "@/lib/profile-switch";
import { useEffect, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Ilustración de la portada: un gráfico de mercado (finanzas, dorado) que desemboca en una red de
// sistemas (tech, violeta). Los dos mundos se ven siempre; una "costura" en diagonal los separa y se
// puede arrastrar para pasar de un perfil al otro. Es decorativa: no representa datos reales.
//
// Rendimiento:
//  · un único <canvas> 2D que solo ocupa la franja del dibujo, con la resolución limitada;
//  · unos 15 trazados por fotograma y ningún recorte (clip): cada mundo se dibuja solo hasta la costura;
//  · el bucle se detiene cuando la franja no está en pantalla o la pestaña está oculta;
//  · mientras se hace scroll, o si el equipo no llega a 60 fps, se dibuja un fotograma de cada dos.

type Node = { x: number; y: number; kind: 0 | 1 | 2; glow: number; vis: number; out: number[] };
type Edge = { a: number; b: number; mx: number; l1: number; l2: number; len: number };
type Packet = { edge: number; dist: number; speed: number };

const SLANT = 0.17;
const DIM = 0.5;

// Generador pseudoaleatorio con semilla: el dibujo es el mismo en cada visita
const seeded = (seed: number) => () => {
	seed = (seed + 0x6d2b79f5) | 0;
	let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
	t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const HeroArt = ({ profileId }: { profileId: ProfileId }) => {
	const bandRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const handleRef = useRef<HTMLAnchorElement>(null);
	const router = useRouter();
	const other = otherProfile(profileId);

	useEffect(() => {
		const band = bandRef.current;
		const canvas = canvasRef.current;
		const handle = handleRef.current;
		const ctx = canvas?.getContext("2d");
		if (!band || !canvas || !handle || !ctx) return;

		const styles = getComputedStyle(document.documentElement);
		const token = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
		const FIN = token("--fin-rgb", "233 196 106");
		const FIN_SOFT = token("--fin-soft-rgb", "248 231 190");
		const TECH = token("--tech-rgb", "190 166 255");
		const TECH_SOFT = token("--tech-soft-rgb", "228 216 255");
		const INK = token("--ink-rgb", "5 6 13");
		const color = (rgb: string, alpha: number) => `rgb(${rgb} / ${alpha})`;

		const isFin = profileId === "finanzas";
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

		// Geometría en píxeles CSS, relativa al lienzo. top/bottom delimitan la franja del dibujo
		let W = 0;
		let H = 0;
		let top = 0;
		let bottom = 0;
		let mid = 0;
		let handleY = 0;
		let pageLeft = 0;
		let pageTop = 0;
		const restSeam = () => {
			const narrow = W < 700;
			if (isFin) return narrow ? 0.64 : 0.69;
			return narrow ? 0.36 : 0.31;
		};
		const seamAt = (y: number) => seam * W + (mid - y) * SLANT;

		// Estado de la costura. Si venimos del otro perfil, continúa desde donde estaba
		const carried = takeSeam();
		let seam = carried ?? 0.5;
		let seamVelocity = 0;
		let litFin = carried === null ? 1 : isFin ? DIM : 1;
		let litTech = carried === null ? 1 : isFin ? 1 : DIM;
		let intro = carried === null && !reduceMotion;
		let peeking = false;
		let dragging = false;
		let dragSeam = 0.5;
		const introTimer = window.setTimeout(() => (intro = false), 850);

		// Serie del gráfico: paseo aleatorio con deriva positiva que se desplaza hacia la izquierda
		const random = seeded(11);
		let step = 20;
		let values: number[] = [];
		let offset = 0;
		let shifted = 0;
		let lastValue = 0;
		let low = 0;
		let high = 1;
		const nextValue = () => {
			const jump = random() < 0.07 ? (random() - 0.55) * 5.5 : 0;
			lastValue += 0.34 + (random() - 0.5) * 2.5 + jump;
			return lastValue;
		};
		const range = () => {
			let min = Infinity;
			let max = -Infinity;
			for (const value of values) {
				if (value < min) min = value;
				if (value > max) max = value;
			}
			return [min, max];
		};

		// Red de sistemas
		let nodes: Node[] = [];
		let edges: Edge[] = [];
		let packets: Packet[] = [];
		let gridX = 100;
		const graphRandom = seeded(29);

		const buildGraph = () => {
			const rnd = seeded(5);
			const bandHeight = bottom - top;
			gridX = clamp(W / 12, 76, 124);
			const gridY = clamp(bandHeight / 3.5, 52, 88);
			const cols = Math.ceil(W / gridX) + 1;
			const rows = Math.max(3, Math.round(bandHeight / gridY));
			const columns: number[][] = [];
			nodes = [];
			edges = [];
			for (let c = 0; c < cols; c++) {
				columns[c] = [];
				for (let r = 0; r < rows; r++) {
					if (rnd() < 0.17) continue;
					const x = c * gridX + gridX * 0.3 + (rnd() - 0.5) * gridX * 0.4;
					const y = top + 34 + r * gridY + (c % 2 ? gridY * 0.5 : 0) + (rnd() - 0.5) * gridY * 0.34;
					if (y > bottom + 4) continue;
					const roll = rnd();
					columns[c].push(nodes.length);
					nodes.push({ x, y, kind: roll < 0.1 ? 2 : roll < 0.34 ? 1 : 0, glow: 0, vis: 1, out: [] });
				}
			}
			for (let c = 0; c < cols - 1; c++) {
				for (const a of columns[c]) {
					const nearest = columns[c + 1]
						.map((b) => ({ b, dy: Math.abs(nodes[b].y - nodes[a].y) }))
						.sort((p, q) => p.dy - q.dy);
					nearest.slice(0, rnd() < 0.44 ? 2 : 1).forEach(({ b }) => {
						const A = nodes[a];
						const B = nodes[b];
						const mx = (A.x + B.x) / 2;
						const l1 = mx - A.x;
						const l2 = Math.abs(B.y - A.y);
						A.out.push(edges.length);
						edges.push({ a, b, mx, l1, l2, len: l1 + l2 + (B.x - mx) });
					});
				}
			}
			const count = clamp(Math.round(W / 105), 5, 15);
			packets = Array.from({ length: count }, () => spawn(true));
		};

		// Los paquetes nacen junto a la costura: el dato sale del gráfico y recorre los sistemas
		function spawn(anywhere = false): Packet {
			const candidates: number[] = [];
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				if (!node.out.length) continue;
				const fromSeam = node.x - seamAt(node.y);
				if (anywhere ? fromSeam > 0 : fromSeam > 6 && fromSeam < gridX * 1.6) candidates.push(i);
			}
			const pool = candidates.length ? candidates : nodes.map((_, i) => i).filter((i) => nodes[i].out.length);
			const node = nodes[pool[Math.floor(graphRandom() * pool.length)]];
			const edge = node ? node.out[Math.floor(graphRandom() * node.out.length)] : 0;
			return {
				edge,
				dist: anywhere && edges[edge] ? graphRandom() * edges[edge].len : 0,
				speed: 80 + graphRandom() * 70,
			};
		}

		const packetPoint = (edge: Edge, dist: number): [number, number] => {
			const A = nodes[edge.a];
			const B = nodes[edge.b];
			if (dist <= edge.l1) return [A.x + Math.max(0, dist), A.y];
			if (dist <= edge.l1 + edge.l2) return [edge.mx, A.y + Math.sign(B.y - A.y) * (dist - edge.l1)];
			return [edge.mx + (dist - edge.l1 - edge.l2), B.y];
		};

		// Recorrido en ángulo recto con esquinas redondeadas, como un esquema de integraciones
		const elbow = (x1: number, y1: number, x2: number, y2: number, mx: number) => {
			ctx.moveTo(x1, y1);
			const dy = Math.abs(y2 - y1);
			if (dy < 1) {
				ctx.lineTo(x2, y2);
				return;
			}
			const radius = Math.min(7, dy / 2, Math.abs(mx - x1), Math.abs(x2 - mx));
			ctx.arcTo(mx, y1, mx, y2, radius);
			ctx.arcTo(mx, y2, x2, y2, radius);
			ctx.lineTo(x2, y2);
		};
		// Contorno de los nodos "anillo" y "chip", y núcleo de cualquier nodo
		const nodeShape = (node: Node) => {
			if (node.kind === 1) {
				ctx.moveTo(node.x + 5, node.y);
				ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
			} else if (node.kind === 2) {
				ctx.roundRect(node.x - 9, node.y - 9, 18, 18, 5);
			}
		};
		const nodeCore = (node: Node) => {
			const radius = node.kind === 2 ? 2.6 : node.kind === 1 ? 1.6 : 2.2;
			ctx.moveTo(node.x + radius, node.y);
			ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
		};

		const pointer = { x: -1, y: -1, active: false };
		let areaGradient: CanvasGradient | null = null;
		let seamGradient: CanvasGradient | null = null;

		const layout = () => {
			const canvasRect = canvas.getBoundingClientRect();
			const bandRect = band.getBoundingClientRect();
			pageLeft = canvasRect.left + window.scrollX;
			pageTop = canvasRect.top + window.scrollY;
			// Si solo se ha movido (p. ej. al cargar las fuentes), no hay nada que reconstruir
			if (canvasRect.width === W && canvasRect.height === H) return;

			W = canvasRect.width;
			H = canvasRect.height;
			top = bandRect.top - canvasRect.top;
			bottom = bandRect.bottom - canvasRect.top;
			mid = (top + bottom) / 2;
			// El tirador va por debajo de la línea del gráfico para no tapar el último precio
			handleY = top + (bottom - top) * 0.76;

			// En pantallas grandes se limita la resolución: las líneas finas no la necesitan
			const dpr = Math.min(window.devicePixelRatio || 1, W > 1000 ? 1.5 : 2);
			canvas.width = Math.round(W * dpr);
			canvas.height = Math.round(H * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			step = clamp(W / 52, 10, 24);
			const needed = Math.ceil(W / step) + 4;
			while (values.length < needed) values.push(nextValue());
			values = values.slice(values.length - needed);
			[low, high] = range();

			areaGradient = ctx.createLinearGradient(0, top, 0, bottom);
			areaGradient.addColorStop(0, color(FIN, 0.3));
			areaGradient.addColorStop(1, color(FIN, 0));
			seamGradient = ctx.createLinearGradient(0, 0, 0, H);
			seamGradient.addColorStop(0, "rgb(255 255 255 / 0)");
			seamGradient.addColorStop(0.3, "rgb(255 255 255 / 0.4)");
			seamGradient.addColorStop(0.8, "rgb(255 255 255 / 0.5)");
			seamGradient.addColorStop(1, "rgb(255 255 255 / 0)");

			buildGraph();
		};

		const update = (dt: number) => {
			// Costura: muelle hacia su posición de reposo (o hacia el cursor mientras se arrastra)
			let targetSeam = restSeam();
			let targetFin = isFin ? 1 : DIM;
			let targetTech = isFin ? DIM : 1;
			if (dragging) {
				targetSeam = dragSeam;
				targetFin = targetTech = 1;
			} else if (intro) {
				targetSeam = 0.5;
				targetFin = targetTech = 1;
			} else if (peeking) {
				targetSeam += isFin ? -0.1 : 0.1;
				if (isFin) targetTech = 0.92;
				else targetFin = 0.92;
			}
			const stiffness = dragging ? 520 : 62;
			const damping = dragging ? 44 : 14;
			seamVelocity += (stiffness * (targetSeam - seam) - damping * seamVelocity) * dt;
			seam += seamVelocity * dt;
			const ease = 1 - Math.exp(-dt * 5);
			litFin += (targetFin - litFin) * ease;
			litTech += (targetTech - litTech) * ease;

			// Gráfico: avanza y reajusta la escala con suavidad, como un gráfico en vivo
			offset += dt * 9;
			while (offset >= step) {
				offset -= step;
				shifted++;
				values.shift();
				values.push(nextValue());
			}
			const [min, max] = range();
			const scaleEase = 1 - Math.exp(-dt * 1.6);
			low += (min - low) * scaleEase;
			high += (max - high) * scaleEase;

			// Paquetes de datos
			for (let i = 0; i < packets.length; i++) {
				const packet = packets[i];
				const edge = edges[packet.edge];
				if (!edge) continue;
				packet.dist += packet.speed * dt;
				if (packet.dist < edge.len) continue;
				const arrival = nodes[edge.b];
				arrival.glow = 1;
				if (arrival.out.length && graphRandom() > 0.22) {
					packet.edge = arrival.out[Math.floor(graphRandom() * arrival.out.length)];
					packet.dist = 0;
				} else {
					packets[i] = spawn();
				}
			}
			const fade = Math.exp(-dt * 2.6);
			for (const node of nodes) if (node.glow > 0.01) node.glow *= fade;
		};

		const draw = (time: number) => {
			ctx.clearRect(0, 0, W, H);
			if (W === 0) return;

			const bandHeight = bottom - top;
			const chartTop = top + bandHeight * 0.06;
			const chartBottom = bottom - bandHeight * 0.2;
			const span = Math.max(0.001, high - low);
			const xOf = (i: number) => i * step - offset - step;
			const yOf = (value: number) => chartBottom - ((value - low) / span) * (chartBottom - chartTop);
			const yAtX = (x: number) => {
				const position = clamp((x + offset + step) / step, 0, values.length - 1.001);
				const i = Math.floor(position);
				return yOf(values[i] + (values[i + 1] - values[i]) * (position - i));
			};
			// Altura hasta la que una vertical en x queda a la izquierda de la costura
			const seamYAt = (x: number) => Math.min(bottom, mid - (x - seam * W) / SLANT);

			// Punto donde el gráfico toca la costura: el "último precio" y origen de la red
			let ix = seam * W;
			let iy = yAtX(ix);
			for (let n = 0; n < 3; n++) {
				ix = seamAt(iy);
				iy = yAtX(ix);
			}
			// Último punto de la serie que queda a la izquierda de la costura
			let last = 0;
			while (last + 1 < values.length && xOf(last + 1) < ix) last++;

			// ── Finanzas: todo se dibuja solo hasta la costura (sin recortes)
			if (ix > 0) {
				ctx.globalAlpha = litFin;

				// Rejilla
				ctx.beginPath();
				for (let n = 0; n <= 4; n++) {
					const y = Math.round(chartTop + ((bottom - chartTop) * n) / 4) + 0.5;
					ctx.moveTo(0, y);
					ctx.lineTo(seamAt(y), y);
				}
				for (let i = 0; i < values.length; i++) {
					if ((i + shifted) % 6) continue;
					const x = Math.round(xOf(i)) + 0.5;
					const end = seamYAt(x);
					if (end <= chartTop) break;
					ctx.moveTo(x, chartTop - 8);
					ctx.lineTo(x, end);
				}
				ctx.strokeStyle = "rgb(255 255 255 / 0.05)";
				ctx.lineWidth = 1;
				ctx.stroke();

				// Volumen
				ctx.beginPath();
				const barWidth = Math.max(2, step * 0.42);
				const maxBar = bandHeight * 0.15;
				const barLimit = seamAt(bottom) - barWidth / 2 - 2;
				for (let i = 1; i <= last && xOf(i) < barLimit; i++) {
					const height = clamp(0.18 + Math.abs(values[i] - values[i - 1]) / 4.5, 0.18, 1) * maxBar;
					ctx.rect(xOf(i) - barWidth / 2, bottom - height, barWidth, height);
				}
				ctx.fillStyle = color(FIN, 0.17);
				ctx.fill();

				// Área bajo la línea, cerrada por la costura
				ctx.beginPath();
				ctx.moveTo(xOf(0), yOf(values[0]));
				for (let i = 1; i <= last; i++) ctx.lineTo(xOf(i), yOf(values[i]));
				ctx.lineTo(ix, iy);
				ctx.lineTo(seamAt(bottom), bottom);
				ctx.lineTo(xOf(0), bottom);
				ctx.closePath();
				if (areaGradient) ctx.fillStyle = areaGradient;
				ctx.fill();

				// Media móvil
				ctx.beginPath();
				let sum = 0;
				const windowSize = 7;
				for (let i = 0; i <= last; i++) {
					sum += values[i];
					if (i >= windowSize) sum -= values[i - windowSize];
					if (i < windowSize - 1) continue;
					const y = yOf(sum / windowSize) + bandHeight * 0.07;
					if (i === windowSize - 1) ctx.moveTo(xOf(i), y);
					else ctx.lineTo(xOf(i), y);
				}
				ctx.setLineDash([4, 6]);
				ctx.strokeStyle = color(FIN_SOFT, 0.3);
				ctx.stroke();
				ctx.setLineDash([]);

				// Línea de precio, con un halo ancho debajo
				ctx.beginPath();
				ctx.moveTo(xOf(0), yOf(values[0]));
				for (let i = 1; i <= last; i++) ctx.lineTo(xOf(i), yOf(values[i]));
				ctx.lineTo(ix, iy);
				ctx.lineJoin = "round";
				ctx.strokeStyle = color(FIN, 0.13);
				ctx.lineWidth = 8;
				ctx.stroke();
				ctx.strokeStyle = color(FIN, 1);
				ctx.lineWidth = 2;
				ctx.stroke();

				// Nivel del último precio
				ctx.beginPath();
				ctx.moveTo(0, Math.round(iy) + 0.5);
				ctx.lineTo(ix, Math.round(iy) + 0.5);
				ctx.setLineDash([2, 6]);
				ctx.strokeStyle = color(FIN_SOFT, 0.32);
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.setLineDash([]);

				// Cursor: retícula enganchada a la línea
				if (pointer.active && pointer.x < ix - 6 && pointer.y > top - 40 && pointer.y < bottom + 10) {
					const x = Math.round(pointer.x) + 0.5;
					const y = yAtX(pointer.x);
					ctx.beginPath();
					ctx.moveTo(x, chartTop - 8);
					ctx.lineTo(x, seamYAt(x));
					ctx.strokeStyle = color(FIN_SOFT, 0.28);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(pointer.x, y, 4.5, 0, Math.PI * 2);
					ctx.fillStyle = color(INK, 1);
					ctx.fill();
					ctx.strokeStyle = color(FIN_SOFT, 1);
					ctx.lineWidth = 1.5;
					ctx.stroke();
				}
			}

			// ── Tech: los nodos aparecen gradualmente a la derecha de la costura
			let partial = 0;
			for (const node of nodes) {
				const distance = node.x - seamAt(node.y);
				node.vis = distance <= 4 ? 0 : distance >= 34 ? 1 : (distance - 4) / 30;
				if (node.vis > 0 && node.vis < 1) partial++;
			}

			// Conexiones
			ctx.globalAlpha = litTech;
			ctx.strokeStyle = color(TECH, 0.3);
			ctx.lineWidth = 1;
			ctx.beginPath();
			for (const edge of edges) {
				const A = nodes[edge.a];
				const B = nodes[edge.b];
				if (A.vis === 1 && B.vis === 1) elbow(A.x, A.y, B.x, B.y, edge.mx);
			}
			ctx.stroke();
			if (partial) {
				for (const edge of edges) {
					const A = nodes[edge.a];
					const B = nodes[edge.b];
					const vis = Math.min(A.vis, B.vis);
					if (vis <= 0 || vis >= 1) continue;
					ctx.globalAlpha = litTech * vis;
					ctx.beginPath();
					elbow(A.x, A.y, B.x, B.y, edge.mx);
					ctx.stroke();
				}
				ctx.globalAlpha = litTech;
			}

			// Del último precio a los dos sistemas más cercanos: el dato entra en la red
			let first: Node | null = null;
			let second: Node | null = null;
			let firstDistance = Infinity;
			let secondDistance = Infinity;
			for (const node of nodes) {
				if (node.vis < 0.5) continue;
				const distance = Math.hypot(node.x - ix, (node.y - iy) * 1.4);
				if (distance < firstDistance) {
					second = first;
					secondDistance = firstDistance;
					first = node;
					firstDistance = distance;
				} else if (distance < secondDistance) {
					second = node;
					secondDistance = distance;
				}
			}
			ctx.beginPath();
			if (first) elbow(ix, iy, first.x, first.y, (ix + first.x) / 2);
			if (second) elbow(ix, iy, second.x, second.y, (ix + second.x) / 2);
			ctx.setLineDash([3, 7]);
			ctx.lineDashOffset = -time * 34;
			ctx.strokeStyle = color(TECH_SOFT, 0.75);
			ctx.lineWidth = 1.25;
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.lineDashOffset = 0;

			// Cursor: los nodos cercanos se conectan a él
			if (pointer.active && pointer.x > seamAt(pointer.y) + 6 && pointer.y > top - 40) {
				ctx.beginPath();
				for (const node of nodes) {
					if (node.vis <= 0) continue;
					const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
					if (distance > 150) continue;
					ctx.moveTo(node.x, node.y);
					ctx.lineTo(pointer.x, pointer.y);
					node.glow = Math.max(node.glow, 1 - distance / 150);
				}
				ctx.strokeStyle = color(TECH_SOFT, 0.3);
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			// Nodos: puntos, anillos y "chips" (sistemas). Los visibles del todo van en un solo trazado
			ctx.lineWidth = 1.25;
			ctx.strokeStyle = color(TECH, 0.9);
			ctx.beginPath();
			for (const node of nodes) if (node.vis === 1 && node.kind === 0) nodeCore(node);
			ctx.fillStyle = color(TECH, 0.85);
			ctx.fill();
			ctx.beginPath();
			for (const node of nodes) if (node.vis === 1 && node.kind !== 0) nodeShape(node);
			ctx.fillStyle = color(INK, 1);
			ctx.fill();
			ctx.stroke();
			ctx.beginPath();
			for (const node of nodes) if (node.vis === 1 && node.kind !== 0) nodeCore(node);
			ctx.fillStyle = color(TECH_SOFT, 0.95);
			ctx.fill();
			if (partial) {
				for (const node of nodes) {
					if (node.vis <= 0 || node.vis >= 1) continue;
					ctx.globalAlpha = litTech * node.vis;
					if (node.kind !== 0) {
						ctx.beginPath();
						nodeShape(node);
						ctx.fillStyle = color(INK, 1);
						ctx.fill();
						ctx.stroke();
					}
					ctx.beginPath();
					nodeCore(node);
					ctx.fillStyle = color(node.kind === 0 ? TECH : TECH_SOFT, 0.9);
					ctx.fill();
				}
				ctx.globalAlpha = litTech;
			}

			// Destello al recibir un paquete
			for (const node of nodes) {
				if (node.glow < 0.03 || node.vis <= 0) continue;
				ctx.beginPath();
				ctx.arc(node.x, node.y, 5 + node.glow * 8, 0, Math.PI * 2);
				ctx.fillStyle = color(TECH, node.glow * 0.26 * node.vis);
				ctx.fill();
			}

			// Paquetes con estela
			for (const packet of packets) {
				const edge = edges[packet.edge];
				if (!edge) continue;
				for (let n = 3; n >= 0; n--) {
					const [x, y] = packetPoint(edge, packet.dist - n * 7);
					if (x < seamAt(y) + 6) continue;
					ctx.beginPath();
					ctx.arc(x, y, 2.4 - n * 0.4, 0, Math.PI * 2);
					ctx.fillStyle = color(TECH_SOFT, 1 / (1 + n * 1.6));
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;

			// ── Costura
			ctx.beginPath();
			ctx.moveTo(seamAt(0), 0);
			ctx.lineTo(seamAt(H), H);
			if (seamGradient) ctx.strokeStyle = seamGradient;
			ctx.lineWidth = 1;
			ctx.stroke();

			// Último precio: punto con pulso, a caballo entre los dos mundos
			const pulse = (time * 0.55) % 1;
			ctx.beginPath();
			ctx.arc(ix, iy, 5 + pulse * 16, 0, Math.PI * 2);
			ctx.strokeStyle = color(FIN, (1 - pulse) * 0.55);
			ctx.lineWidth = 1.5;
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(ix, iy, 4.5, 0, Math.PI * 2);
			ctx.fillStyle = color(FIN_SOFT, 1);
			ctx.fill();

			handle.style.transform = `translate3d(${seamAt(handleY).toFixed(1)}px, ${(handleY - top).toFixed(1)}px, 0)`;
		};

		// ── Bucle: solo corre con la franja visible y la pestaña activa
		let frame = 0;
		let running = false;
		let visible = true;
		let previous = 0;
		let pace = 16.7;
		let halfRate = false;
		let retryAt = 0;
		let lastScroll = -Infinity;
		let odd = false;
		const loop = (now: number) => {
			const delta = now - previous;
			previous = now;
			update(Math.min(0.05, delta / 1000));
			// Si el equipo va justo (media por encima de ~24 ms) se dibuja un fotograma de cada dos,
			// y cada pocos segundos se vuelve a probar a ritmo completo
			pace += (Math.min(delta, 100) - pace) * 0.1;
			if (!halfRate && pace > 24) {
				halfRate = true;
				retryAt = now + 4000;
			} else if (halfRate && now > retryAt) {
				halfRate = false;
				pace = 16.7;
			}
			// Durante el scroll también: la prioridad es que la página se desplace fluida
			const scrolling = now - lastScroll < 180;
			odd = !odd;
			if ((!halfRate && !scrolling) || odd || dragging) draw(now / 1000);
			frame = requestAnimationFrame(loop);
		};
		const onScroll = () => (lastScroll = performance.now());
		const sync = () => {
			const shouldRun = visible && !document.hidden && !reduceMotion;
			if (shouldRun === running) return;
			running = shouldRun;
			if (running) {
				previous = performance.now();
				frame = requestAnimationFrame(loop);
			} else {
				cancelAnimationFrame(frame);
			}
		};
		// Con "reducir movimiento" no hay bucle: se dibuja un fotograma fijo cuando algo cambia
		const drawStill = () => {
			if (!reduceMotion) return;
			seam = dragging ? dragSeam : restSeam() + (peeking ? (isFin ? -0.1 : 0.1) : 0);
			litFin = isFin || peeking ? 1 : DIM;
			litTech = !isFin || peeking ? 1 : DIM;
			draw(0);
		};

		layout();
		if (carried === null && !intro) seam = restSeam();
		draw(performance.now() / 1000);
		drawStill();
		handle.dataset.ready = "";

		const resizeObserver = new ResizeObserver(() => {
			layout();
			if (!running) draw(performance.now() / 1000);
			drawStill();
		});
		resizeObserver.observe(canvas);
		// La portada cambia de alto al cargar las fuentes: el lienzo se desplaza sin cambiar de tamaño
		const hero = band.closest<HTMLElement>(".hero");
		if (hero) resizeObserver.observe(hero);
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			sync();
		});
		intersectionObserver.observe(canvas);

		const onPeek = (event: Event) => {
			peeking = Boolean((event as CustomEvent<boolean>).detail);
			drawStill();
		};
		const onPointerMove = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") return;
			pointer.x = event.pageX - pageLeft;
			pointer.y = event.pageY - pageTop;
			pointer.active = pointer.y > 0 && pointer.y < H;
		};
		const onPointerLeave = () => (pointer.active = false);

		// ── Arrastrar la costura: pasado el centro se cambia de perfil
		const go = () => {
			carrySeam(seam);
			switchProfile(router, other);
		};
		let moved = false;
		let startX = 0;
		const onDown = (event: PointerEvent) => {
			if (event.button !== 0) return;
			dragging = true;
			moved = false;
			startX = event.clientX;
			dragSeam = seam;
			handle.setPointerCapture(event.pointerId);
			handle.dataset.drag = "";
		};
		const onDrag = (event: PointerEvent) => {
			if (!dragging) return;
			if (Math.abs(event.clientX - startX) > 5) moved = true;
			if (!moved) return;
			dragSeam = clamp((event.pageX - pageLeft - (mid - handleY) * SLANT) / W, 0.05, 0.95);
			drawStill();
		};
		const onUp = () => {
			if (!dragging) return;
			dragging = false;
			delete handle.dataset.drag;
			const crossed = isFin ? dragSeam < 0.5 : dragSeam > 0.5;
			if (moved && crossed) go();
			drawStill();
		};
		const onClick = (event: MouseEvent) => {
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			event.preventDefault();
			// Un clic limpio (o Intro con el teclado) cambia de perfil; el final de un arrastre, no
			if (!moved) go();
			moved = false;
		};
		const onKey = (event: KeyboardEvent) => {
			if ((event.key === "ArrowLeft" && isFin) || (event.key === "ArrowRight" && !isFin)) {
				event.preventDefault();
				go();
			}
		};

		window.addEventListener("profile:peek", onPeek);
		window.addEventListener("scroll", onScroll, { passive: true });
		document.addEventListener("visibilitychange", sync);
		if (finePointer) {
			window.addEventListener("pointermove", onPointerMove, { passive: true });
			document.documentElement.addEventListener("pointerleave", onPointerLeave);
		}
		handle.addEventListener("pointerdown", onDown);
		handle.addEventListener("pointermove", onDrag);
		handle.addEventListener("pointerup", onUp);
		handle.addEventListener("pointercancel", onUp);
		handle.addEventListener("click", onClick);
		handle.addEventListener("keydown", onKey);
		sync();

		return () => {
			// Al cambiar de perfil, el lienzo nuevo retoma la costura donde la dejamos
			carrySeam(seam);
			window.clearTimeout(introTimer);
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			window.removeEventListener("profile:peek", onPeek);
			window.removeEventListener("scroll", onScroll);
			document.removeEventListener("visibilitychange", sync);
			window.removeEventListener("pointermove", onPointerMove);
			document.documentElement.removeEventListener("pointerleave", onPointerLeave);
			handle.removeEventListener("pointerdown", onDown);
			handle.removeEventListener("pointermove", onDrag);
			handle.removeEventListener("pointerup", onUp);
			handle.removeEventListener("pointercancel", onUp);
			handle.removeEventListener("click", onClick);
			handle.removeEventListener("keydown", onKey);
		};
	}, [profileId, router, other]);

	return (
		<div ref={bandRef} className="hero-band">
			<canvas ref={canvasRef} aria-hidden className="hero-canvas" />
			<Link
				ref={handleRef}
				href={other.path}
				draggable={false}
				aria-label={`Ver el perfil ${other.label}`}
				className="seam-handle">
				<HiChevronLeft aria-hidden className="size-4" />
				<HiChevronRight aria-hidden className="size-4" />
			</Link>
		</div>
	);
};
