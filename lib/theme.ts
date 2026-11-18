// Estado de la raíz del documento que React no conoce: la marca "hay JS" y el tema elegido.
// Al cambiar de idioma React vuelve a montar <html> con sus atributos de servidor, así que hay que reponerlos.

export type Theme = "light" | "dark";

let chosen: Theme | null = null;

const stored = (): Theme | null => {
	try {
		const value = localStorage.getItem("theme");
		return value === "dark" || value === "light" ? value : null;
	} catch {
		return null;
	}
};

/** El claro es el tema por defecto (atributo data-theme="light" desde el servidor); el oscuro lo quita */
export const applyTheme = (theme: Theme) => {
	const root = document.documentElement;
	if (theme === "light") root.dataset.theme = "light";
	else delete root.dataset.theme;
	document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f7f6f2" : "#05060d");
};

export const currentTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export const chooseTheme = (theme: Theme) => {
	chosen = theme;
	try {
		localStorage.setItem("theme", theme);
	} catch {
		// Sin almacenamiento (modo privado): el tema dura lo que la visita
	}
	applyTheme(theme);
};

/** Repone la marca de JS y el tema elegido tras un cambio de ruta */
export const restoreRoot = () => {
	document.documentElement.classList.add("js");
	const theme = chosen ?? stored();
	if (theme && theme !== currentTheme()) applyTheme(theme);
};
