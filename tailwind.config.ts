import type { Config } from "tailwindcss";

// Los colores viven en variables CSS (app/globals.css) para que cada perfil cambie la marca sin recompilar
const rgb = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config = {
	content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				ink: {
					DEFAULT: rgb("--ink-rgb"),
					2: rgb("--ink-2-rgb"),
					3: rgb("--ink-3-rgb"),
				},
				// Líneas y velos: blanco en el tema oscuro, azul noche en el claro
				line: rgb("--line-rgb"),
				fg: rgb("--fg-rgb"),
				muted: rgb("--muted-rgb"),
				faint: rgb("--faint-rgb"),
				// Color de marca del perfil activo
				brand: {
					DEFAULT: rgb("--brand-rgb"),
					soft: rgb("--brand-soft-rgb"),
					deep: rgb("--brand-deep-rgb"),
				},
				// Color fijo de cada perfil (la portada enseña los dos a la vez)
				fin: rgb("--fin-rgb"),
				tech: rgb("--tech-rgb"),
				up: rgb("--up-rgb"),
			},
			fontFamily: {
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
				serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
			},
			transitionTimingFunction: {
				out: "cubic-bezier(0.16, 1, 0.3, 1)",
				"in-out": "cubic-bezier(0.77, 0, 0.18, 1)",
			},
		},
	},
	plugins: [],
} satisfies Config;

export default config;
