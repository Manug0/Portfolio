"use client";

import { type ProfileId, getProfile } from "@/data/profiles";
import { useEffect, useRef, useState } from "react";

import { ProfileSwitch } from "./ProfileSwitch";
import { cn } from "@/lib/utils";
import { navState } from "@/lib/profile-switch";

export const Nav = ({ profileId }: { profileId: ProfileId }) => {
	const items = getProfile(profileId).nav;
	const navRef = useRef<HTMLElement>(null);
	const dockRef = useRef<HTMLDivElement>(null);
	const navSwitchRef = useRef<HTMLDivElement>(null);
	const [hidden, setHidden] = useState(false);
	const [active, setActive] = useState("");
	const [dock, setDock] = useState(false);

	// Visible arriba del todo y al subir; se esconde al bajar
	useEffect(() => {
		let last = window.scrollY;
		let tick = 0;
		const measure = () => {
			tick = 0;
			const current = window.scrollY;
			if (current < 120) setHidden(false);
			else if (Math.abs(current - last) > 4) setHidden(current > last);
			last = current;
		};
		const onScroll = () => {
			if (!tick) tick = requestAnimationFrame(measure);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(tick);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	// Sección en pantalla (para el menú y para aterrizar en la equivalente al cambiar de perfil)
	useEffect(() => {
		const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
		const onScreen = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) onScreen.add(entry.target.id);
					else onScreen.delete(entry.target.id);
				});
				const current = sections.find((section) => onScreen.has(section.id))?.id ?? "";
				navState.section = current === "top" ? "" : current;
				setActive(navState.section);
			},
			{ rootMargin: "-45% 0px -50% 0px" }
		);
		sections.forEach((section) => observer.observe(section));
		return () => {
			observer.disconnect();
			navState.section = "";
		};
	}, []);

	// El interruptor secundario (en el menú, o flotando abajo en móvil) aparece cuando el de la portada sale de pantalla
	useEffect(() => {
		const heroSwitch = document.querySelector(".pswitch--hero");
		if (!heroSwitch) return;
		const observer = new IntersectionObserver(([entry]) => setDock(!entry.isIntersecting));
		observer.observe(heroSwitch);
		return () => observer.disconnect();
	}, []);

	// Ocultos, los interruptores secundarios no deben recibir foco (React 18 no gestiona el atributo inert)
	useEffect(() => {
		if (dockRef.current) dockRef.current.inert = !dock;
		if (navSwitchRef.current) navSwitchRef.current.inert = !dock;
	}, [dock]);

	// La píldora del menú se desliza hasta la sección activa
	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;
		const place = () => {
			const link = active ? nav.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
			if (!link || !link.offsetWidth) {
				nav.style.setProperty("--po", "0");
				return;
			}
			nav.style.setProperty("--px", `${link.offsetLeft}px`);
			nav.style.setProperty("--pw", `${link.offsetWidth}px`);
			nav.style.setProperty("--po", "1");
			if (nav.scrollWidth > nav.clientWidth) {
				nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
			}
		};
		place();
		const observer = new ResizeObserver(place);
		observer.observe(nav);
		return () => observer.disconnect();
	}, [active]);

	return (
		<>
			<div aria-hidden data-progress className="progress" />

			<div className="nav-wrap" data-hidden={hidden}>
				<nav ref={navRef} aria-label="Navegación principal" className="nav">
					<span aria-hidden className="nav-pill" />
					{items.map((item) => {
						const id = item.link.replace("#", "");
						return (
							<a
								key={item.link}
								href={item.link}
								data-section={id}
								aria-current={active === id ? "true" : undefined}
								className={cn("nav-link", item.hideOnMobile && "hidden sm:block")}>
								{item.name}
							</a>
						);
					})}
					{/* Arriba ya está el interruptor grande de la portada: el del menú aparece al dejarlo atrás */}
					<div ref={navSwitchRef} className="nav-switch hidden md:flex" data-show={dock}>
						<span aria-hidden className="mx-1.5 h-5 w-px shrink-0 bg-white/15" />
						<ProfileSwitch current={profileId} variant="compact" className="shrink-0" />
					</div>
				</nav>
			</div>

			<div ref={dockRef} className="dock md:hidden" data-show={dock}>
				<ProfileSwitch current={profileId} variant="dock" />
			</div>
		</>
	);
};
