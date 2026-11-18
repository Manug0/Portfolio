"use client";

import { routeCommitted, transitionState } from "@/lib/profile-switch";
import { useEffect, useLayoutEffect } from "react";

import { restoreRoot } from "@/lib/theme";

const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Comportamientos globales de la página, con un único observador / listener por tipo:
//  · [data-reveal]  → aparece al entrar en pantalla (IntersectionObserver + transición CSS)
//  · [data-spot]    → foco de luz que sigue al cursor (variables CSS --mx / --my)
//  · [data-tilt]    → inclinación 3D según el cursor
//  · [data-timeline] y [data-progress] → progreso ligado al scroll
// Todo lo que se anima es transform / opacity, así que el scroll no provoca recálculos de layout.
export const Effects = () => {
	// Antes de pintar: se reponen la marca de JS y el tema, y, si venimos de cambiar de idioma, la página
	// se deja como estaba la anterior (sin animaciones de entrada y con lo ya visto, visible)
	useBeforePaint(() => {
		restoreRoot();
		if (!transitionState.instant) return;
		transitionState.instant = false;
		document.querySelector<HTMLElement>("[data-profile]")?.setAttribute("data-static", "");
		const limit = window.innerHeight;
		document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
			if (element.getBoundingClientRect().top < limit) element.dataset.in = "now";
		});
	}, []);

	useEffect(() => {
		// La página nueva ya está montada: puede arrancar la transición de cambio de perfil o de idioma
		routeCommitted();

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		const cleanups: (() => void)[] = [];

		// ── Aparición al hacer scroll
		const revealables = document.querySelectorAll<HTMLElement>("[data-reveal]");
		if (reduceMotion) {
			revealables.forEach((element) => (element.dataset.in = ""));
		} else {
			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						// Lo que ya queda por encima de la pantalla (p. ej. al aterrizar a mitad de página) se da
						// por visto: así, al subir, el contenido está ahí en vez de aparecer de nuevo
						if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) continue;
						(entry.target as HTMLElement).dataset.in = "";
						observer.unobserve(entry.target);
					}
				},
				{ rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
			);
			revealables.forEach((element) => {
				if (!("in" in element.dataset)) observer.observe(element);
			});
			cleanups.push(() => observer.disconnect());
		}

		// ── Foco de luz e inclinación (solo con ratón)
		if (finePointer && !reduceMotion) {
			let frame = 0;
			let lastEvent: PointerEvent | null = null;
			let tilted: HTMLElement | null = null;

			const release = (element: HTMLElement) => {
				delete element.dataset.tilting;
				element.style.setProperty("--rx", "0deg");
				element.style.setProperty("--ry", "0deg");
			};
			const apply = () => {
				frame = 0;
				const event = lastEvent;
				const target = event?.target;
				if (!event || !(target instanceof Element)) return;

				const spot = target.closest<HTMLElement>("[data-spot]");
				if (spot) {
					const rect = spot.getBoundingClientRect();
					spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
					spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
				}

				const tilt = target.closest<HTMLElement>("[data-tilt]");
				if (tilted && tilted !== tilt) release(tilted);
				if (tilt) {
					const rect = tilt.getBoundingClientRect();
					const x = (event.clientX - rect.left) / rect.width - 0.5;
					const y = (event.clientY - rect.top) / rect.height - 0.5;
					tilt.dataset.tilting = "";
					tilt.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
					tilt.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
				}
				tilted = tilt;
			};
			const onMove = (event: PointerEvent) => {
				lastEvent = event;
				if (!frame) frame = requestAnimationFrame(apply);
			};
			const onLeave = () => {
				if (tilted) release(tilted);
				tilted = null;
			};
			document.addEventListener("pointermove", onMove, { passive: true });
			document.documentElement.addEventListener("pointerleave", onLeave);
			cleanups.push(() => {
				cancelAnimationFrame(frame);
				document.removeEventListener("pointermove", onMove);
				document.documentElement.removeEventListener("pointerleave", onLeave);
			});
		}

		// ── Progreso de lectura y línea de tiempo
		const bar = document.querySelector<HTMLElement>("[data-progress]");
		const toTop = document.querySelector<HTMLElement>(".to-top");
		const timeline = document.querySelector<HTMLElement>("[data-timeline]");
		const fill = timeline?.querySelector<HTMLElement>(".tl-fill");
		const head = timeline?.querySelector<HTMLElement>(".tl-head");
		const items = timeline ? Array.from(timeline.querySelectorAll<HTMLElement>(".tl-item")) : [];
		const RAIL_OFFSET = 8;
		let timelineVisible = false;
		let tick = 0;

		const measure = () => {
			tick = 0;
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
			if (bar) bar.style.transform = `scaleX(${progress})`;
			toTop?.style.setProperty("--p", progress.toFixed(3));

			if (!timeline || !fill || !timelineVisible) return;
			const rect = timeline.getBoundingClientRect();
			const railHeight = rect.height - RAIL_OFFSET;
			// La línea se rellena hasta la altura de lectura (algo por debajo del centro de la pantalla)
			const reached = Math.min(railHeight, Math.max(0, window.innerHeight * 0.56 - rect.top - RAIL_OFFSET));
			fill.style.transform = `scaleY(${railHeight > 0 ? reached / railHeight : 0})`;
			if (head) {
				head.style.transform = `translate3d(0, ${reached}px, 0)`;
				head.style.opacity = reached > 2 && reached < railHeight - 2 ? "1" : "0";
			}
			for (const item of items) {
				if (reached >= item.offsetTop + 7) item.dataset.on = "";
				else delete item.dataset.on;
			}
		};
		const onScroll = () => {
			if (!tick) tick = requestAnimationFrame(measure);
		};

		if (timeline) {
			const observer = new IntersectionObserver(([entry]) => {
				timelineVisible = entry.isIntersecting;
				onScroll();
			});
			observer.observe(timeline);
			cleanups.push(() => observer.disconnect());
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		measure();
		cleanups.push(() => {
			cancelAnimationFrame(tick);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		});

		return () => cleanups.forEach((cleanup) => cleanup());
	}, []);

	return null;
};
