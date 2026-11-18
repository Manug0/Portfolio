// Cambios de perfil y de idioma con transición (View Transitions API) y estado compartido de la portada.
// Sin soporte del navegador o con "reducir movimiento" se navega sin animación.
import type { ProfileId } from "@/data/site";

export type ProfileTarget = { id: ProfileId; href: string };

type Router = { push: (href: string, options?: { scroll?: boolean }) => void };
type ViewTransition = { finished: Promise<void> };
type TransitionDocument = Document & {
	startViewTransition?: (update: () => Promise<void> | void) => ViewTransition;
};

let pending: (() => void) | null = null;
let runs = 0;

// Cambio de idioma en curso: la página nueva debe aparecer tal como estaba la anterior
// (sin animaciones de entrada y con lo ya visto, visible). Lo consulta la página al montarse.
export const transitionState = { instant: false, steady: false };

/** Lo llama la página nueva al montarse: el navegador ya puede capturarla y arrancar la transición */
export const routeCommitted = () => {
	pending?.();
	pending = null;
};

/** Navega y espera a que la página nueva esté montada (con un margen, para no dejar la pantalla congelada) */
const navigate = (go: () => void, onCommit?: () => void) =>
	new Promise<void>((resolve) => {
		const done = () => {
			onCommit?.();
			resolve();
		};
		pending = done;
		go();
		setTimeout(() => {
			if (pending === done) routeCommitted();
		}, 1500);
	});

const canAnimate = () =>
	"startViewTransition" in document && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Sección visible (la actualiza el menú): al cambiar de perfil se aterriza en la equivalente
export const navState = { section: "" };
const equivalent: Record<string, string> = { markets: "projects" };

// Posición de la costura de la portada al salir, para que el lienzo nuevo continúe el movimiento
let seamCarry: { value: number; at: number } | null = null;
export const carrySeam = (value: number) => {
	seamCarry = { value, at: Date.now() };
};
export const takeSeam = () => {
	const carried = seamCarry && Date.now() - seamCarry.at < 3000 ? seamCarry.value : null;
	seamCarry = null;
	return carried;
};

/** Avisa al lienzo de la portada de que el cursor está sobre el otro perfil (se asoma) */
export const peekProfile = (on: boolean) => {
	window.dispatchEvent(new CustomEvent("profile:peek", { detail: on }));
};

/** Cambio de perfil: barrido en diagonal; si el lector ya ha bajado, aterriza en la sección equivalente */
export function switchProfile(router: Router, target: ProfileTarget) {
	const pastHero = window.scrollY > window.innerHeight * 0.6;
	const section = equivalent[navState.section] ?? navState.section;
	const href = pastHero && section ? `${target.href}#${section}` : target.href;

	transitionState.steady = true;
	if (!canAnimate()) {
		router.push(href);
		return;
	}

	const root = document.documentElement;
	const run = ++runs;
	root.dataset.wipe = target.id;
	const transition = (document as TransitionDocument).startViewTransition!(() => navigate(() => router.push(href)));
	transition.finished.finally(() => {
		// Si entretanto ha empezado otro cambio, el atributo es suyo
		if (run === runs) delete root.dataset.wipe;
	});
}

// ── Cambio de idioma: la página es la misma en otro idioma, así que el lector debe quedarse donde estaba.
// Se anota qué sección tiene delante (y cuánto ha avanzado en ella) y se recoloca el scroll en la página nueva
// antes de mostrarla: los textos traducidos no ocupan exactamente lo mismo.
type Anchor = { id: string; progress: number } | null;

const captureAnchor = (): Anchor => {
	if (window.scrollY < 4) return null;
	const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
	const current = sections.filter((section) => section.getBoundingClientRect().top <= 1).pop();
	if (!current) return null;
	const rect = current.getBoundingClientRect();
	return { id: current.id, progress: rect.height > 0 ? -rect.top / rect.height : 0 };
};

const restoreAnchor = (anchor: Anchor) => {
	const section = anchor && document.getElementById(anchor.id);
	if (!anchor || !section) return;
	const rect = section.getBoundingClientRect();
	window.scrollTo({ top: window.scrollY + rect.top + anchor.progress * rect.height, behavior: "instant" });
};

/** Cambio de idioma: la página traducida se revela en círculo desde el control pulsado */
export function switchLanguage(router: Router, href: string, origin: HTMLElement) {
	const anchor = captureAnchor();
	const go = () => {
		transitionState.instant = true;
		router.push(href, { scroll: false });
	};

	if (!canAnimate()) {
		void navigate(go, () => restoreAnchor(anchor));
		return;
	}

	const rect = origin.getBoundingClientRect();
	const x = rect.left + rect.width / 2;
	const y = rect.top + rect.height / 2;
	const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
	// React vuelve a montar <html> al cambiar de idioma y borra lo que no sea suyo: se marca antes y después
	const mark = () => {
		const root = document.documentElement;
		root.dataset.reveal = "";
		root.style.setProperty("--tx", `${x}px`);
		root.style.setProperty("--ty", `${y}px`);
		root.style.setProperty("--tr", `${radius}px`);
	};

	const run = ++runs;
	mark();
	const transition = (document as TransitionDocument).startViewTransition!(() =>
		navigate(go, () => {
			mark();
			restoreAnchor(anchor);
		})
	);
	transition.finished.finally(() => {
		if (run === runs) delete document.documentElement.dataset.reveal;
	});
}
