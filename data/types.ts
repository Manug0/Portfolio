import type { Locale, ProfileId } from "./site";

import type { IconType } from "react-icons";

export type TechItem = { name: string; icon?: IconType; color?: string };

export type Experience = {
	id: number;
	role: string;
	company: string;
	period: string;
	current?: boolean;
	summary: string;
	bullets: string[];
	tags: string[];
};

export type Project = {
	id: number;
	title: string;
	des: string;
	/** Captura de la web y sus dimensiones reales (se muestra entera, sin recortar) */
	img?: { src: string; width: number; height: number };
	stack: TechItem[];
	link?: string;
	badge?: string;
};

export type Card = { title: string; description: string };

type SectionCopy = { eyebrow: string; title: string; highlight: string; intro?: string };

export type MarketItem = { title: string; des: string; icon: IconType };

export type Profile = {
	id: ProfileId;
	/** Etiquetas del interruptor de perfil */
	label: string;
	sublabel: string;
	role: string;
	tagline: string;
	headline: string;
	/** Índice de la palabra del titular a partir de la cual se resalta con el color de marca */
	highlightFrom: number;
	intro: string;
	primaryCta: { title: string; href: string };
	stats: { value: string; label: string }[];
	/** hideOnMobile: se oculta en pantallas pequeñas para que el menú quepa */
	nav: { name: string; link: string; hideOnMobile?: boolean }[];
	/** Textos de las seis tarjetas de "Sobre mí"; la disposición y los gráficos viven en components/Grid.tsx */
	about: {
		statement: Card;
		/** Uno o varios roles. Con icono se muestran en lista; sin icono, como titular con gráfico */
		roles: (Card & { icon?: IconType; color?: string })[];
		tools: Card & { rows: string[][] };
		crossover: Card;
		markets: Card;
		cta: { title: string };
	};
	experienceIntro: string;
	experience: Experience[];
	projects: SectionCopy & { items: Project[] };
	markets?: SectionCopy & { items: MarketItem[]; featured: Project };
	stack: SectionCopy & {
		groups: { title: string; description: string; items: TechItem[] }[];
		marquee: TechItem[];
	};
	approach: SectionCopy & { phases: { title: string; des: string }[] };
	contact: SectionCopy & { text: string; cta: string };
	cv: { file: string; preview: string; label: string };
	meta: { title: string; description: string; keywords: string[] };
};

/** Textos de interfaz (todo lo que no es contenido de un perfil) */
export type Ui = {
	skip: string;
	navLabel: string;
	footerNavLabel: string;
	chooseProfile: string;
	viewProfile: (label: string) => string;
	viewProfileAria: (label: string) => string;
	/** Nombre accesible del selector de idioma */
	language: string;
	backToTop: string;
	/** Nombre accesible del botón de tema claro / oscuro */
	theme: string;
	hero: { photoAlt: string; greeting: string; download: (cv: string) => string };
	about: { eyebrow: string; mainTech: string };
	copyEmail: { idle: string; done: string; announce: string };
	experience: { eyebrow: string; title: string; highlight: string; current: string; tagsLabel: string };
	projects: {
		screenshotAlt: (title: string) => string;
		visit: string;
		visitAria: (title: string) => string;
		stackLabel: string;
	};
	approach: { phase: (n: number) => string };
	education: {
		eyebrow: string;
		title: string;
		highlight: string;
		certification: string;
		languages: string;
		cvNote: string;
		download: string;
		viewOnline: string;
		viewCvAria: string;
		otherCv: (profile: string, cv: string) => string;
	};
	contact: { email: string; linkedin: string; github: string; location: string };
	form: {
		title: string;
		subtitle: string;
		name: string;
		namePlaceholder: string;
		email: string;
		emailPlaceholder: string;
		message: string;
		company: string;
		sending: string;
		send: string;
		success: string;
		error: string;
		errors: { name: string; email: string; emailInvalid: string; message: string; messageShort: string };
	};
	footer: { madeWith: string };
	/** Líneas de la terminal del bot de liquidez (decorativas) */
	bot: [string, string, string];
};

export type Content = {
	locale: Locale;
	location: string;
	ui: Ui;
	profiles: Record<ProfileId, Profile>;
	education: { id: number; title: string; school: string; period: string; des: string }[];
	certifications: { id: number; title: string; issuer: string }[];
	languages: { name: string; level: string }[];
};
