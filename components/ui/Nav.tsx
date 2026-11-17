"use client";

import { type LanguageTarget, LanguageLink } from "./LanguageLink";
import { ProfileSwitch, type SwitchOption } from "./ProfileSwitch";
import { useEffect, useRef, useState } from "react";

import type { ProfileId } from "@/data/site";
import { cn } from "@/lib/utils";
import { navState } from "@/lib/profile-switch";

type NavItem = { name: string; link: string; hideOnMobile?: boolean };

export const Nav = ({
	current,
	items,
	options,
	language,
	labels,
}: {
	current: ProfileId;
	items: NavItem[];
	options: SwitchOption[];
	language: LanguageTarget;
	labels: { nav: string; chooseProfile: string };
}) => {
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
			const position = window.scrollY;
			if (position < 120) setHidden(false);
			else if (Math.abs(position - last) > 4) setHidden(position > last);
			last = position;
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

	// Sección en pantalla (para el menú y para aterrizar en la equivalente al cambiar de perfil o de idioma)
	useEffect(() => {
		const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
		const onScreen = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) onScreen.add(entry.target.id);
					else onScreen.delete(entry.target.id);
				});
				const visible = sections.find((section) => onScreen.has(section.id))?.id ?? "";
				navState.section = visible === "top" ? "" : visible;
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
				<nav ref={navRef} aria-label={labels.nav} className="nav">
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
						<ProfileSwitch current={current} options={options} label={labels.chooseProfile} variant="compact" className="shrink-0" />
					</div>
					<span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-white/15 sm:mx-1.5" />
					<LanguageLink target={language} className="nav-lang">
						{language.code}
					</LanguageLink>
				</nav>
			</div>

			<div ref={dockRef} className="dock md:hidden" data-show={dock}>
				<ProfileSwitch current={current} options={options} label={labels.chooseProfile} variant="dock" />
			</div>
		</>
	);
};
