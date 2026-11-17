"use client";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

type TransitionDocument = Document & {
	startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

// Cambia entre tema oscuro (por defecto) y claro, y recuerda la elección.
// El tema nuevo se revela en círculo desde el botón (View Transitions); sin soporte, con un fundido.
export const ThemeToggle = ({ label }: { label: string }) => {
	const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		const root = document.documentElement;
		const next = root.dataset.theme === "light" ? "dark" : "light";
		const apply = () => {
			if (next === "light") root.dataset.theme = "light";
			else delete root.dataset.theme;
			try {
				localStorage.setItem("theme", next);
			} catch {
				// Sin almacenamiento (modo privado): el tema dura lo que la visita
			}
			// El lienzo de la portada lee sus colores de las variables CSS
			window.dispatchEvent(new Event("theme:change"));
		};

		const doc = document as TransitionDocument;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			apply();
			return;
		}
		if (!doc.startViewTransition) {
			root.classList.add("theme-fade");
			apply();
			window.setTimeout(() => root.classList.remove("theme-fade"), 450);
			return;
		}

		const rect = event.currentTarget.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
		root.style.setProperty("--tx", `${x}px`);
		root.style.setProperty("--ty", `${y}px`);
		root.style.setProperty("--tr", `${radius}px`);
		root.dataset.themeSwitch = "";
		doc.startViewTransition(apply).finished.finally(() => delete root.dataset.themeSwitch);
	};

	return (
		<button type="button" onClick={toggle} aria-label={label} title={label} className="theme-toggle">
			<HiOutlineSun aria-hidden className="to-light" />
			<HiOutlineMoon aria-hidden className="to-dark" />
		</button>
	);
};
