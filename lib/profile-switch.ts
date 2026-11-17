// Cambio de perfil con barrido en diagonal (View Transitions API) y estado compartido de la portada.
// Sin soporte del navegador o con "reducir movimiento" se navega sin animación.
import type { Profile } from "@/data/profiles";

type Router = { push: (href: string) => void };
type ViewTransition = { finished: Promise<void> };
type TransitionDocument = Document & {
	startViewTransition?: (update: () => Promise<void> | void) => ViewTransition;
};

let pending: (() => void) | null = null;
let runs = 0;

/** Lo llama la página nueva al montarse: el navegador ya puede capturarla y arrancar el barrido */
export const routeCommitted = () => {
	pending?.();
	pending = null;
};

// Sección visible (la actualiza el menú): al cambiar de perfil se aterriza en la sección equivalente
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

export function switchProfile(router: Router, target: Profile) {
	const pastHero = window.scrollY > window.innerHeight * 0.6;
	const section = equivalent[navState.section] ?? navState.section;
	const href = pastHero && section ? `${target.path}#${section}` : target.path;

	const doc = document as TransitionDocument;
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!doc.startViewTransition || reduceMotion) {
		router.push(href);
		return;
	}

	const root = document.documentElement;
	const run = ++runs;
	root.dataset.wipe = target.id;
	const transition = doc.startViewTransition(
		() =>
			new Promise<void>((resolve) => {
				pending = resolve;
				router.push(href);
				// Red de seguridad: si la ruta tarda, no dejamos la página congelada
				setTimeout(() => {
					if (pending === resolve) routeCommitted();
				}, 1500);
			})
	);
	transition.finished.finally(() => {
		// Si entretanto ha empezado otro cambio, el atributo es suyo
		if (run === runs) delete root.dataset.wipe;
	});
}
