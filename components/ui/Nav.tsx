"use client";

import { type LanguageOption, LanguageSwitch } from "./LanguageSwitch";
import type { Locale, ProfileId } from "@/data/site";
import { ProfileSwitch, type SwitchOption } from "./ProfileSwitch";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { HiArrowUp } from "react-icons/hi2";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { navState } from "@/lib/profile-switch";

type NavItem = { name: string; link: string; hideOnMobile?: boolean };

const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const Nav = ({
	current,
	locale,
	items,
	options,
	languages,
	labels,
}: {
	current: ProfileId;
	locale: Locale;
	items: NavItem[];
	options: SwitchOption[];
	languages: LanguageOption[];
	labels: { nav: string; chooseProfile: string; theme: string; language: string; backToTop: string };
}) => {
	const wrapRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const dockRef = useRef<HTMLDivElement>(null);
	const navSwitchRef = useRef<HTMLDivElement>(null);
	const [scrolledAway, setScrolledAway] = useState(false);
	const [summoned, setSummoned] = useState(false);
	const [active, setActive] = useState("");
	const [dock, setDock] = useState(false);
	const [deep, setDeep] = useState(false);
	const hidden = scrolledAway && !summoned;
	const placed = useRef(false);

	// Al montarse a mitad de página (cambio de idioma) el estado sale ya correcto, sin animar su aparición
	useBeforePaint(() => {
		if (window.scrollY < 4) return;
		const heroSwitch = document.querySelector(".pswitch--hero");
		setDock(heroSwitch ? heroSwitch.getBoundingClientRect().bottom < 0 : false);
		setDeep(window.scrollY > window.innerHeight * 0.9);
		const from = window.innerHeight * 0.45;
		const to = window.innerHeight * 0.5;
		const visible = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).find((section) => {
			const rect = section.getBoundingClientRect();
			return rect.top < to && rect.bottom > from;
		});
		const id = visible && visible.id !== "top" ? visible.id : "";
		navState.section = id;
		setActive(id);
	}, []);

	// Visible arriba del todo y al subir; se esconde al bajar
	useEffect(() => {
		let last = window.scrollY;
		let tick = 0;
		const measure = () => {
			tick = 0;
			const position = window.scrollY;
			if (position < 120) setScrolledAway(false);
			else if (Math.abs(position - last) > 4) setScrolledAway(position > last);
			setDeep(position > window.innerHeight * 0.9);
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

	// También aparece al llevar el ratón al borde superior (o al entrar con el teclado), sin tener que hacer scroll
	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
		const onMove = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") return;
			const overNav = event.target instanceof Node && wrap.contains(event.target);
			setSummoned((shown) => (event.clientY < 72 || overNav ? true : shown && event.clientY < 130));
		};
		const onLeave = () => setSummoned(false);
		window.addEventListener("pointermove", onMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onLeave);
		return () => {
			window.removeEventListener("pointermove", onMove);
			document.documentElement.removeEventListener("pointerleave", onLeave);
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

	// Ocultos, los controles secundarios no deben recibir foco (React 18 no gestiona el atributo inert)
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
			// La primera vez se coloca sin deslizarse desde la esquina
			const pill = nav.querySelector<HTMLElement>(".nav-pill");
			if (pill && !placed.current) {
				pill.style.transition = "none";
				requestAnimationFrame(() => requestAnimationFrame(() => (pill.style.transition = "")));
			}
			placed.current = true;
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

	const languageSwitch = <LanguageSwitch current={locale} options={languages} label={labels.language} />;

	return (
		<>
			<div aria-hidden data-progress className="progress" />

			<div
				ref={wrapRef}
				className="nav-wrap"
				data-hidden={hidden}
				onFocus={(event) => {
					// Solo con teclado: un clic con el ratón no debe dejar el menú fijo
					if (event.target.matches(":focus-visible")) setSummoned(true);
				}}
				onBlur={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget)) setSummoned(false);
				}}>
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
						<span aria-hidden className="mx-1.5 h-5 w-px shrink-0 bg-line/15" />
						<ProfileSwitch current={current} options={options} label={labels.chooseProfile} variant="compact" className="shrink-0" />
					</div>
					{/* Idioma y tema: en el menú a partir de tableta; en móvil van junto al nombre y en la barra flotante */}
					<div className="utils hidden sm:flex">
						<span aria-hidden className="mx-1.5 h-5 w-px shrink-0 bg-line/15" />
						{languageSwitch}
						<ThemeToggle label={labels.theme} />
					</div>
				</nav>
			</div>

			{/* Móvil: al dejar atrás la portada aparece abajo una barra con el perfil, el idioma y el tema */}
			<div ref={dockRef} className="dock md:hidden" data-show={dock}>
				<ProfileSwitch current={current} options={options} label={labels.chooseProfile} variant="dock" />
				<div className="utils sm:hidden">
					{languageSwitch}
					<ThemeToggle label={labels.theme} />
				</div>
			</div>

			{/* Volver arriba: aparece cuando ya se ha bajado una pantalla. El anillo marca el progreso de lectura */}
			<a
				href="#top"
				aria-label={labels.backToTop}
				title={labels.backToTop}
				className="to-top"
				data-show={deep}
				tabIndex={deep ? undefined : -1}
				onClick={(event) => {
					event.preventDefault();
					window.scrollTo({ top: 0 });
				}}>
				<HiArrowUp aria-hidden />
			</a>
		</>
	);
};
