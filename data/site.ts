// Datos del sitio que no dependen del idioma ni del perfil, y utilidades de rutas.
// Este módulo no importa iconos ni textos: lo pueden usar los componentes de cliente sin engordar el JS.

export const siteConfig = {
	name: "Manuel González",
	shortName: "Manu",
	url: "https://manu-gonzalez.vercel.app",
	email: "mgongar12@gmail.com",
	github: "https://github.com/Manug0",
	linkedin: "https://www.linkedin.com/in/manuel-gonz%C3%A1lez-garc%C3%ADa/",
};

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const profileIds = ["finanzas", "tech"] as const;
export type ProfileId = (typeof profileIds)[number];

export const otherProfileId = (id: ProfileId): ProfileId => (id === "tech" ? "finanzas" : "tech");
export const otherLocale = (locale: Locale): Locale => (locale === "es" ? "en" : "es");

/** Rutas: "/" (finanzas) y "/tech" en español; "/en" y "/en/tech" en inglés */
export const profilePath = (locale: Locale, id: ProfileId) => {
	const base = locale === "es" ? "" : "/en";
	return id === "finanzas" ? base || "/" : `${base}/tech`;
};
