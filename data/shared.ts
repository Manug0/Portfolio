// Piezas comunes a los dos idiomas: iconos y colores de cada tecnología, enlaces y capturas de los proyectos.
// Los nombres que se traducen (p. ej. "Modelado de datos") se ponen en cada idioma con `named`.
import {
	SiAdobe,
	SiAngular,
	SiCss3,
	SiFigma,
	SiFramer,
	SiGithub,
	SiHtml5,
	SiJavascript,
	SiJenkins,
	SiLinkedin,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiPython,
	SiReact,
	SiSalesforce,
	SiSolana,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import {
	TbApi,
	TbBuildingBank,
	TbChartCandle,
	TbChartLine,
	TbChartPie,
	TbDatabase,
	TbFileSpreadsheet,
	TbPresentation,
	TbReportMoney,
	TbRobot,
	TbScale,
	TbSql,
	TbWorld,
} from "react-icons/tb";

import type { TechItem } from "./types";
import projects from "./projects.json";
import { siteConfig } from "./site";

const brand = "rgb(var(--brand-rgb))";

export const tech = {
	react: { name: "React", icon: SiReact, color: "#61DAFB" },
	js: { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
	ts: { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
	next: { name: "Next.js", icon: SiNextdotjs, color: "rgb(var(--fg-rgb))" },
	angular: { name: "Angular", icon: SiAngular, color: "#DD0031" },
	node: { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
	html: { name: "HTML", icon: SiHtml5, color: "#E34F26" },
	css: { name: "CSS", icon: SiCss3, color: "#1572B6" },
	tailwind: { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
	framer: { name: "Framer Motion", icon: SiFramer, color: "rgb(var(--fg-rgb))" },
	figma: { name: "Figma", icon: SiFigma, color: "#F24E1E" },
	python: { name: "Python", icon: SiPython, color: "#FFD43B" },
	sql: { name: "SQL", icon: TbSql, color: brand },
	mongodb: { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
	solana: { name: "Solana", icon: SiSolana, color: "#14F195" },
	salesforce: { name: "Salesforce", icon: SiSalesforce, color: "#00A1E0" },
	jenkins: { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
	adobe: { name: "Adobe Experience Platform", icon: SiAdobe, color: "#FA0F00" },
	powerpoint: { name: "PowerPoint", icon: TbPresentation, color: "#D35230" },
	api: { name: "APIs", icon: TbApi, color: brand },
} satisfies Record<string, TechItem>;

/** Iconos de conceptos cuyo nombre cambia con el idioma */
export const icons = {
	salesforce: SiSalesforce,
	adobe: SiAdobe,
	api: TbApi,
	ai: TbRobot,
	database: TbDatabase,
	excel: TbFileSpreadsheet,
	statements: TbReportMoney,
	valuation: TbScale,
	investments: TbChartCandle,
	macro: TbWorld,
	portfolios: TbChartPie,
	markets: TbChartLine,
	bank: TbBuildingBank,
};

/** Tecnología o competencia con nombre traducido: `named("Modelado de datos", icons.database)` */
export const named = (name: string, icon?: TechItem["icon"], color: string = brand): TechItem =>
	icon ? { name, icon, color } : { name };

// Enlace y captura de cada proyecto web. Viven en projects.json porque también los lee
// scripts/update-screenshots.mjs, que renueva las capturas cuando la portada de una web cambia.
export const projectLinks = {
	aurean: projects.aurean.link,
	gdc: projects.gdc.link,
	phoneFusion: projects.phoneFusion.link,
};

export const projectImages = {
	aurean: projects.aurean.image,
	gdc: projects.gdc.image,
	phoneFusion: projects.phoneFusion.image,
};

export const socialMedia = [
	{ id: 1, name: "GitHub", icon: SiGithub, link: siteConfig.github },
	{ id: 2, name: "LinkedIn", icon: SiLinkedin, link: siteConfig.linkedin },
];
