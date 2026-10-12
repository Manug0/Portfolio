import type { IconType } from "react-icons";
import {
	SiAngular,
	SiCss3,
	SiFigma,
	SiFramer,
	SiHtml5,
	SiJavascript,
	SiJenkins,
	SiMongodb,
	SiNextdotjs,
	SiPython,
	SiReact,
	SiSalesforce,
	SiSolana,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import { TbApi, TbDatabase, TbRobot, TbSql } from "react-icons/tb";

export const siteConfig = {
	name: "Manuel González",
	shortName: "Manu",
	role: "Desarrollador Salesforce",
	tagline: "Backend, Integraciones y Datos",
	url: "https://manu-gonzalez.vercel.app",
	email: "mgongar12@gmail.com",
	location: "Madrid, España",
	cv: "/Manuel_Gonzalez_Garcia_CV.pdf",
	github: "https://github.com/Manug0",
	linkedin: "https://www.linkedin.com/in/manuel-gonz%C3%A1lez-garc%C3%ADa/",
};

export const navItems = [
	{ name: "Sobre mí", link: "#about" },
	{ name: "Experiencia", link: "#experience" },
	{ name: "Proyectos", link: "#projects" },
	{ name: "Stack", link: "#tech-stack" },
	{ name: "Contacto", link: "#contact" },
];

export const heroStats = [
	{ value: "Accenture", label: "Data Architecture Analyst" },
	{ value: "Agentforce", label: "AI Agent Specialist" },
	{ value: "7 años", label: "invirtiendo en mercados" },
];

export const gridItems = [
	{
		id: 1,
		title: "Traduzco necesidades de negocio en soluciones técnicas claras.",
		description: "De la economía al código",
		className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
		imgClassName: "w-full h-full",
		titleClassName: "justify-end",
		img: "/b1.png",
		spareImg: "",
	},
	{
		id: 2,
		title: "Salesforce Developer",
		description: "Apex · LWC · Flows · Agentforce",
		className: "lg:col-span-2 md:col-span-3 md:row-span-2",
		imgClassName: "absolute right-0 bottom-0 w-40 md:w-44 lg:w-72 opacity-90",
		titleClassName: "justify-start",
		img: "/b8.png",
		spareImg: "",
	},
	{
		id: 3,
		title: "Mi stack tecnológico",
		description: "Siempre ampliando",
		className: "lg:col-span-2 md:col-span-3 md:row-span-2",
		imgClassName: "",
		titleClassName: "justify-center",
		img: "",
		spareImg: "",
	},
	{
		id: 4,
		title: "Economista de formación: datos, estadística y visión de negocio",
		description: "Grado en Economía · URJC",
		className: "lg:col-span-2 md:col-span-3 md:row-span-1",
		imgClassName: "",
		titleClassName: "justify-start",
		img: "/grid.svg",
		spareImg: "/b4.svg",
	},
	{
		id: 5,
		title: "Mercados, inversión y blockchain",
		description: "7 años invirtiendo · bot de liquidez en Solana",
		className: "md:col-span-3 md:row-span-2",
		imgClassName: "",
		titleClassName: "justify-start lg:justify-center",
		img: "",
		spareImg: "/grid.svg",
	},
	{
		id: 6,
		title: "¿Hablamos de tu próximo proyecto?",
		description: "",
		className: "lg:col-span-2 md:col-span-3 md:row-span-1",
		imgClassName: "",
		titleClassName: "justify-center md:max-w-full max-w-full text-center",
		img: "",
		spareImg: "",
	},
];

export const bentoStack = {
	left: ["Apex", "LWC", "Flows"],
	right: ["TypeScript", "Python", "Next.js"],
};

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

export const workExperience: Experience[] = [
	{
		id: 1,
		role: "Data Architecture Analyst",
		company: "Accenture",
		period: "04/2026 – actualidad",
		current: true,
		summary: "Proyecto de experiencia de cliente para una entidad bancaria.",
		bullets: [
			"Definí modelos de datos, esquemas e integraciones del proyecto.",
			"Diseñé segmentaciones de clientes y flujos de comunicación sobre Adobe Experience Platform.",
			"Recogí requisitos funcionales y técnicos y documenté las soluciones junto a equipos de negocio y tecnología.",
		],
		tags: ["Modelado de datos", "Integraciones", "Adobe Experience Platform", "Banca"],
	},
	{
		id: 2,
		role: "Salesforce Developer · Prácticas",
		company: "Telefónica",
		period: "03/2025 – 01/2026",
		summary: "Desarrollo y mantenimiento de soluciones Salesforce en un entorno corporativo.",
		bullets: [
			"Desarrollé y mantuve soluciones con Apex, SOQL, Triggers, Flows y componentes LWC/Aura.",
			"Participé en integraciones entre sistemas mediante APIs REST y SOAP.",
			"Automaticé procesos y colaboré en pruebas, despliegues (CI/CD con Salesforce CLI y Jenkins) y documentación técnica.",
			"Trabajé con control de cambios y procedimientos de calidad.",
		],
		tags: ["Apex", "LWC", "Flows", "REST / SOAP", "Jenkins"],
	},
	{
		id: 3,
		role: "Departamento de Producto",
		company: "EDP Solar",
		period: "11/2022 – 05/2023",
		summary: "Apoyo a decisiones de producto en soluciones de energía solar.",
		bullets: [
			"Evalué la viabilidad técnica y económica de soluciones solares.",
			"Analicé mercado y competencia para identificar oportunidades de negocio.",
			"Colaboré en la valoración económica de propuestas comerciales.",
		],
		tags: ["Análisis de negocio", "Producto", "Finanzas"],
	},
	{
		id: 4,
		role: "Popular Investor",
		company: "eToro",
		period: "01/2020 – 01/2022",
		summary: "Gestión de una cartera pública copiada por otros inversores.",
		bullets: [
			"Gestioné una cartera copiada por 50 inversores (≈50k € copiados).",
			"Comuniqué mi estrategia y las decisiones de la cartera, adaptando el mensaje a cada perfil.",
			"Operé siguiendo los requisitos de cumplimiento de la plataforma.",
		],
		tags: ["Inversión", "Comunicación", "Compliance"],
	},
];

export type TechItem = { name: string; icon?: IconType; color?: string };

export type Project = {
	id: number;
	title: string;
	des: string;
	img?: string;
	stack: TechItem[];
	link?: string;
	badge?: string;
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
	api: { name: "APIs", icon: TbApi, color: "#CBACF9" },
	ai: { name: "Agentes de IA", icon: TbRobot, color: "#CBACF9" },
} satisfies Record<string, TechItem>;

export const projects: Project[] = [
	{
		id: 1,
		title: "Bot de liquidez en Solana",
		des: "Proyecto personal: automatiza posiciones de provisión de liquidez en mercados descentralizados. Python, APIs, servidor propio e IAs autónomas integradas.",
		stack: [tech.python, tech.solana, tech.api, tech.ai],
		badge: "Proyecto personal",
	},
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

export const techStack: { title: string; description: string; items: TechItem[] }[] = [
	{
		title: "Salesforce",
		description: "Desarrollo en plataforma, automatización y agentes de IA.",
		items: [
			{ name: "Apex", icon: SiSalesforce, color: "#00A1E0" },
			{ name: "SOQL", icon: SiSalesforce, color: "#00A1E0" },
			{ name: "Triggers" },
			{ name: "Flows" },
			{ name: "LWC" },
			{ name: "Aura" },
			{ name: "Agentforce" },
			{ name: "Salesforce CLI" },
			{ name: "Jenkins", icon: SiJenkins, color: "#F0D6B7" },
		],
	},
	{
		title: "Desarrollo",
		description: "Backend, frontend y APIs para construir de punta a punta.",
		items: [
			{ name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
			{ name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
			{ name: "React", icon: SiReact, color: "#61DAFB" },
			{ name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
			{ name: "Angular", icon: SiAngular, color: "#DD0031" },
			{ name: "HTML", icon: SiHtml5, color: "#E34F26" },
			{ name: "CSS", icon: SiCss3, color: "#1572B6" },
			{ name: "APIs REST / SOAP", icon: TbApi, color: "#CBACF9" },
			{ name: "SQL", icon: TbSql, color: "#CBACF9" },
			{ name: "MongoDB", icon: SiMongodb, color: "#47A248" },
			{ name: "Python", icon: SiPython, color: "#FFD43B" },
		],
	},
	{
		title: "Datos",
		description: "Modelado, integraciones y plataformas de datos de cliente.",
		items: [
			{ name: "Modelado de datos", icon: TbDatabase, color: "#CBACF9" },
			{ name: "Integraciones" },
			{ name: "Adobe Experience Platform" },
		],
	},
];

export const marqueeTech: TechItem[] = [
	{ name: "Salesforce", icon: SiSalesforce, color: "#00A1E0" },
	{ name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
	{ name: "React", icon: SiReact, color: "#61DAFB" },
	{ name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
	{ name: "Python", icon: SiPython, color: "#FFD43B" },
	{ name: "Angular", icon: SiAngular, color: "#DD0031" },
	{ name: "MongoDB", icon: SiMongodb, color: "#47A248" },
	{ name: "Jenkins", icon: SiJenkins, color: "#F0D6B7" },
	{ name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
	{ name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
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
