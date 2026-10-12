// Contenido común a ambos perfiles. Lo específico de cada perfil (tech / finanzas) vive en ./profiles.ts
import type { IconType } from "react-icons";
import {
	SiAngular,
	SiFigma,
	SiFramer,
	SiJavascript,
	SiPython,
	SiReact,
	SiSolana,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import { TbApi, TbRobot } from "react-icons/tb";

export const siteConfig = {
	name: "Manuel González",
	shortName: "Manu",
	url: "https://manu-gonzalez.vercel.app",
	email: "mgongar12@gmail.com",
	location: "Madrid, España",
	github: "https://github.com/Manug0",
	linkedin: "https://www.linkedin.com/in/manuel-gonz%C3%A1lez-garc%C3%ADa/",
};

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
	img?: string;
	stack: TechItem[];
	link?: string;
	badge?: string;
};

export type GridItem = {
	id: number;
	title: string;
	description: string;
	className: string;
	imgClassName: string;
	titleClassName: string;
	img: string;
	spareImg: string;
};

const tech = {
	react: { name: "React", icon: SiReact, color: "#61DAFB" },
	js: { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
	ts: { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
	angular: { name: "Angular", icon: SiAngular, color: "#DD0031" },
	tailwind: { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
	framer: { name: "Framer Motion", icon: SiFramer, color: "#FFFFFF" },
	figma: { name: "Figma", icon: SiFigma, color: "#F24E1E" },
	python: { name: "Python", icon: SiPython, color: "#FFD43B" },
	solana: { name: "Solana", icon: SiSolana, color: "#14F195" },
	api: { name: "APIs", icon: TbApi, color: "rgb(var(--brand-rgb))" },
	ai: { name: "Agentes de IA", icon: TbRobot, color: "rgb(var(--brand-rgb))" },
} satisfies Record<string, TechItem>;

export const liquidityBot: Project = {
	id: 1,
	title: "Bot de liquidez en Solana",
	des: "Proyecto personal: automatiza posiciones de provisión de liquidez en mercados descentralizados. Python, APIs, servidor propio e IAs autónomas integradas.",
	stack: [tech.python, tech.solana, tech.api, tech.ai],
	badge: "Proyecto personal",
};

export const webProjects: Project[] = [
	{
		id: 2,
		title: "Aurean Talent",
		des: "Web corporativa para una consultora de captación y desarrollo de talento.",
		img: "/projects/aureantalent.jpg",
		stack: [tech.react, tech.js, tech.tailwind, tech.framer, tech.figma],
		link: "https://www.aureantalent.com",
		badge: "Cliente",
	},
	{
		id: 3,
		title: "GdC Fiscal",
		des: "Web para una asesoría fiscal y legal, construida con Angular y TypeScript.",
		img: "/projects/gdcfiscal.jpg",
		stack: [tech.angular, tech.ts, tech.tailwind, tech.framer, tech.figma],
		link: "https://gdcfiscal.es",
		badge: "Cliente",
	},
	{
		id: 4,
		title: "Phone Fusion",
		des: "E-commerce ficticio en el que apliqué todo el stack, de frontend a backend.",
		img: "/projects/phonefusion.jpg",
		stack: [tech.react, tech.js, tech.framer, tech.figma],
		link: "https://phone-fusion.vercel.app",
		badge: "Fullstack",
	},
];

export const education = [
	{
		id: 1,
		title: "Tecnología Aplicada al Desarrollo de Empresas",
		school: "Universidad Internacional de La Rioja",
		period: "03/2025 – 03/2026",
		des: "Desarrollo backend orientado a soluciones empresariales.",
	},
	{
		id: 2,
		title: "Máster en Desarrollo Fullstack",
		school: "ThePower Business School",
		period: "2023 – 2024",
		des: "Desarrollo de aplicaciones web y soluciones digitales.",
	},
	{
		id: 3,
		title: "Grado en Economía",
		school: "Universidad Rey Juan Carlos",
		period: "2019 – 2023",
		des: "Econometría, estadística y análisis financiero. Club de inversión universitario (2 años). TFG sobre blockchain y finanzas tradicionales.",
	},
];

export const certifications = [
	{
		id: 1,
		title: "AI Agent Specialist",
		issuer: "Salesforce · Agentforce",
	},
];

export const languages = [
	{ name: "Español", level: "Nativo" },
	{ name: "Inglés", level: "Avanzado" },
];

export const socialMedia = [
	{ id: 1, name: "GitHub", img: "/git.svg", link: siteConfig.github },
	{ id: 2, name: "LinkedIn", img: "/link.svg", link: siteConfig.linkedin },
];
