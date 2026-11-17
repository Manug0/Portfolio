"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { type ProfileTarget, carrySeam, switchProfile, takeSeam } from "@/lib/profile-switch";
import { useEffect, useRef } from "react";

import Link from "next/link";
import type { ProfileId } from "@/data/site";
import { useRouter } from "next/navigation";

// Ilustración de la portada: una sola serie de datos con dos lecturas. A la izquierda de la "costura"
// se ve como un gráfico de mercado (finanzas, dorado); a la derecha, la misma serie continúa convertida
// en bloques de datos (tech, violeta). La costura se puede arrastrar para pasar de un perfil al otro.
// Es decorativa: no representa datos reales.
//
// Rendimiento:
//  · un único <canvas> 2D que solo ocupa la franja del dibujo, con la resolución limitada;
//  · pocos trazados por fotograma y ningún recorte (clip): cada lectura se dibuja solo hasta la costura;
//  · el bucle se detiene cuando la franja no está en pantalla o la pestaña está oculta;
//  · mientras se hace scroll, o si el equipo no llega a 60 fps, se dibujan menos fotogramas.

const SLANT = 0.17;
const DIM = 0.5;
const MAX_COLUMNS = 320;

// Generador pseudoaleatorio con semilla: el dibujo es el mismo en cada visita
const seeded = (seed: number) => () => {
	seed = (seed + 0x6d2b79f5) | 0;
	let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
	t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const HeroArt = ({
	profileId,
	other,
	label,
}: {
	profileId: ProfileId;
	/** El otro perfil: a él lleva el tirador de la costura */
	other: ProfileTarget;
	/** Nombre accesible del tirador ("Ver el perfil Tech") */
	label: string;
}) => {
	const bandRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const handleRef = useRef<HTMLAnchorElement>(null);
	const router = useRouter();
	const { id: otherId, href: otherHref } = other;

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

		// La serie: paseo aleatorio con deriva positiva que se desplaza hacia la izquierda
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

		// Bloques de datos: columnas de celdas alineadas con el eje de tiempo de la serie
		let cell = 12;
		let gap = 3;
		const columnX = new Float32Array(MAX_COLUMNS);
		const columnTop = new Int16Array(MAX_COLUMNS); // fila de la celda superior (el valor)
		const columnLit = new Int16Array(MAX_COLUMNS); // última fila que queda a la derecha de la costura
		const columnMax = new Int16Array(MAX_COLUMNS); // filas disponibles hasta la costura
		// Barrido de lectura que recorre los bloques cada pocos segundos
		let scan = -1;

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
			// El tirador va por debajo de la línea del gráfico para no tapar el último valor
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

			cell = clamp(Math.round(W / 118), 8, 13);
			gap = cell > 10 ? 3 : 2;

			areaGradient = ctx.createLinearGradient(0, top, 0, bottom);
			areaGradient.addColorStop(0, color(FIN, 0.3));
			areaGradient.addColorStop(1, color(FIN, 0));
			seamGradient = ctx.createLinearGradient(0, 0, 0, H);
			seamGradient.addColorStop(0, "rgb(255 255 255 / 0)");
			seamGradient.addColorStop(0.3, "rgb(255 255 255 / 0.4)");
			seamGradient.addColorStop(0.8, "rgb(255 255 255 / 0.5)");
			seamGradient.addColorStop(1, "rgb(255 255 255 / 0)");
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

			// La serie avanza y reajusta la escala con suavidad, como un gráfico en vivo
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

			// Barrido de lectura: recorre los bloques en ~2,4 s y descansa hasta completar 6 s
			scan += dt / 2.4;
			if (scan > 2.5) scan = 0;
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
			// Altura a la que la costura pasa por x (por encima, x queda a su izquierda)
			const seamYAt = (x: number) => mid - (x - seam * W) / SLANT;

			// Punto donde la serie toca la costura: el "último valor"
			let ix = seam * W;
			let iy = yAtX(ix);
			for (let n = 0; n < 3; n++) {
				ix = seamAt(iy);
				iy = yAtX(ix);
			}
			// Último punto de la serie que queda a la izquierda de la costura
			let last = 0;
			while (last + 1 < values.length && xOf(last + 1) < ix) last++;

			// ── Finanzas: gráfico de línea. Todo se dibuja solo hasta la costura (sin recortes)
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
					const end = Math.min(bottom, seamYAt(x));
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

				// Nivel del último valor
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
					ctx.lineTo(x, Math.min(bottom, seamYAt(x)));
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

			// ── Tech: la misma serie, celda a celda. Cada columna es un instante; su altura, el valor
			const rows = Math.floor((bottom - top) / cell);
			const phase = (shifted * step + offset) % cell;
			let count = 0;
			for (let k = Math.floor((seamAt(bottom) + phase) / cell); count < MAX_COLUMNS; k++) {
				const x = k * cell - phase;
				if (x >= W) break;
				// Filas de esta columna que quedan enteras a la derecha de la costura
				const maxRow = Math.min(rows - 1, Math.floor((bottom - seamYAt(x - gap)) / cell - 1.001));
				if (maxRow < 0) continue;
				const valueRow = clamp(Math.floor((bottom - yAtX(x + cell / 2)) / cell), 0, rows - 1);
				columnX[count] = x;
				columnTop[count] = valueRow;
				columnMax[count] = maxRow;
				columnLit[count] = Math.min(valueRow, maxRow);
				count++;
			}

			if (count) {
				ctx.globalAlpha = litTech;
				const hovered =
					pointer.active && pointer.x > columnX[0] && pointer.y > top - 40 && pointer.y < bottom + 10
						? Math.floor((pointer.x - columnX[0]) / cell)
						: -1;

				// Cuerpo de las columnas: un único polígono escalonado
				ctx.beginPath();
				ctx.moveTo(columnX[0], bottom);
				for (let i = 0; i < count; i++) {
					const y = bottom - (columnLit[i] + 1) * cell;
					ctx.lineTo(columnX[i], y);
					ctx.lineTo(columnX[i] + cell, y);
				}
				ctx.lineTo(columnX[count - 1] + cell, bottom);
				ctx.closePath();
				ctx.fillStyle = color(TECH, 0.15);
				ctx.fill();

				// Las celdas más altas de cada columna, más encendidas: dos pasadas dan un degradado de tres niveles
				for (const depth of [4, 2]) {
					ctx.beginPath();
					for (let i = 0; i < count; i++) {
						const lit = columnLit[i] + 1;
						ctx.rect(columnX[i], bottom - lit * cell, cell, Math.min(depth, lit) * cell);
					}
					ctx.fillStyle = color(TECH, 0.14);
					ctx.fill();
				}

				// La celda del valor
				ctx.beginPath();
				for (let i = 0; i < count; i++) {
					if (columnTop[i] > columnMax[i]) continue;
					ctx.rect(columnX[i], bottom - (columnTop[i] + 1) * cell, cell, cell);
				}
				ctx.fillStyle = color(TECH_SOFT, 0.95);
				ctx.fill();

				// Barrido de lectura: una franja que ilumina las columnas a su paso
				if (scan >= 0 && scan <= 1) {
					const start = columnX[0];
					const head = start + (W - start + cell * 8) * scan;
					for (let i = 0; i < count; i++) {
						const distance = Math.abs(columnX[i] + cell / 2 - head) / (cell * 6);
						if (distance >= 1) continue;
						ctx.fillStyle = color(TECH_SOFT, (1 - distance) ** 2 * 0.22);
						ctx.fillRect(columnX[i], bottom - (columnLit[i] + 1) * cell, cell, (columnLit[i] + 1) * cell);
					}
				}

				// Cursor: se enciende la columna sobre la que está
				if (hovered >= 0 && hovered < count) {
					ctx.fillStyle = color(TECH_SOFT, 0.3);
					ctx.fillRect(columnX[hovered], bottom - (columnLit[hovered] + 1) * cell, cell, (columnLit[hovered] + 1) * cell);
				}

				// Separación entre celdas: se "borra" una rejilla sobre lo ya pintado, solo a la derecha de la costura
				ctx.globalAlpha = 1;
				ctx.globalCompositeOperation = "destination-out";
				ctx.beginPath();
				let tallest = 0;
				for (let i = 0; i < count; i++) {
					if (columnLit[i] > tallest) tallest = columnLit[i];
					ctx.moveTo(columnX[i], bottom - (columnLit[i] + 1) * cell - 1);
					ctx.lineTo(columnX[i], bottom + 1);
				}
				for (let row = 0; row <= tallest + 1; row++) {
					const y = bottom - row * cell;
					ctx.moveTo(Math.max(columnX[0], seamAt(y) + gap), y);
					ctx.lineTo(W + 1, y);
				}
				ctx.lineWidth = gap;
				ctx.strokeStyle = "#000";
				ctx.stroke();
				ctx.globalCompositeOperation = "source-over";
				ctx.globalAlpha = litTech;

				// Celdas vacías justo por encima del valor: un punto tenue en cada una
				ctx.beginPath();
				for (let i = 0; i < count; i++) {
					const x = columnX[i] + cell / 2 - 0.75;
					const until = Math.min(columnMax[i], columnTop[i] + 6);
					for (let row = columnTop[i] + 1; row <= until; row++) {
						ctx.rect(x, bottom - (row + 0.5) * cell - 0.75, 1.5, 1.5);
					}
				}
				ctx.fillStyle = color(TECH, 0.2);
				ctx.fill();

				// Cursor: nivel del valor de la columna señalada
				if (hovered >= 0 && hovered < count && columnTop[hovered] <= columnMax[hovered]) {
					const y = Math.round(bottom - (columnTop[hovered] + 0.5) * cell) + 0.5;
					ctx.beginPath();
					ctx.moveTo(seamAt(y) + gap, y);
					ctx.lineTo(W, y);
					ctx.setLineDash([2, 6]);
					ctx.strokeStyle = color(TECH_SOFT, 0.4);
					ctx.lineWidth = 1;
					ctx.stroke();
					ctx.setLineDash([]);
					ctx.strokeStyle = color(TECH_SOFT, 1);
					ctx.lineWidth = 1.5;
					ctx.strokeRect(
						columnX[hovered] - 2,
						bottom - (columnTop[hovered] + 1) * cell - 2,
						cell + 4,
						cell + 4
					);
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

			// Último valor: punto con pulso, a caballo entre las dos lecturas
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
		let tick = 0;
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
			// Durante el scroll, uno de cada tres: la prioridad es que la página se desplace fluida
			const scrolling = now - lastScroll < 180;
			tick++;
			const every = dragging ? 1 : scrolling ? 3 : halfRate ? 2 : 1;
			if (tick % every === 0) draw(now / 1000);
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
			switchProfile(router, { id: otherId, href: otherHref });
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
	}, [profileId, router, otherId, otherHref]);

	return (
		<div ref={bandRef} className="hero-band">
			<canvas ref={canvasRef} aria-hidden className="hero-canvas" />
			<Link ref={handleRef} href={otherHref} draggable={false} aria-label={label} className="seam-handle">
				<HiChevronLeft aria-hidden className="size-4" />
				<HiChevronRight aria-hidden className="size-4" />
			</Link>
		</div>
	);
};
