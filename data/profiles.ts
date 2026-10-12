// Contenido de cada perfil. La web se sirve en dos rutas: "/" (tech) y "/finanzas".
// Todos los textos salen de los dos CVs; para cambiar algo de un perfil basta con editar este archivo.
import type { Experience, GridItem, Project, TechItem } from ".";
import type { IconType } from "react-icons";
import {
	SiAdobe,
	SiAngular,
	SiCss3,
	SiHtml5,
	SiJavascript,
	SiJenkins,
	SiMongodb,
	SiNextdotjs,
	SiPython,
	SiReact,
	SiSalesforce,
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
	TbScale,
	TbSql,
	TbWorld,
} from "react-icons/tb";
import { liquidityBot, webProjects } from ".";

export type ProfileId = "tech" | "finanzas";

type SectionCopy = { eyebrow: string; title: string; highlight: string; intro?: string };

export type MarketItem = { title: string; des: string; icon: IconType };

export type Profile = {
	id: ProfileId;
	path: string;
	/** Etiquetas del selector de perfil */
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
	grid: GridItem[];
	bentoStack: { left: string[]; right: string[] };
	/** Colores del gradiente animado de la tarjeta de contacto del bento */
	gradient: Record<
		"start" | "end" | "first" | "second" | "third" | "fourth" | "fifth" | "pointer",
		string
	>;
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

const brand = "rgb(var(--brand-rgb))";

// Disposición del bento grid (común); cada perfil aporta los textos
const gridLayout = [
	{
		id: 1,
		className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
		imgClassName: "w-full h-full",
		titleClassName: "justify-end",
		img: "/b1.png",
		spareImg: "",
	},
	{
		id: 2,
		className: "lg:col-span-2 md:col-span-3 md:row-span-2",
		imgClassName: "absolute right-0 bottom-0 w-40 md:w-44 lg:w-72 opacity-90",
		titleClassName: "justify-start",
		img: "",
		spareImg: "",
	},
	{
		id: 3,
		className: "lg:col-span-2 md:col-span-3 md:row-span-2",
		imgClassName: "",
		titleClassName: "justify-center",
		img: "",
		spareImg: "",
	},
	{
		id: 4,
		className: "lg:col-span-2 md:col-span-3 md:row-span-1",
		imgClassName: "",
		titleClassName: "justify-start",
		img: "/grid.svg",
		spareImg: "/b4.svg",
	},
	{
		id: 5,
		className: "md:col-span-3 md:row-span-2",
		imgClassName: "",
		titleClassName: "justify-start lg:justify-center",
		img: "",
		spareImg: "/grid.svg",
	},
	{
		id: 6,
		className: "lg:col-span-2 md:col-span-3 md:row-span-1",
		imgClassName: "",
		titleClassName: "justify-center md:max-w-full max-w-full text-center",
		img: "",
		spareImg: "",
	},
];

const buildGrid = (
	content: Record<number, { title: string; description: string; img?: string }>
): GridItem[] =>
	gridLayout.map((layout) => ({
		...layout,
		...content[layout.id],
		img: content[layout.id].img ?? layout.img,
	}));

const experienceBase = {
	accenture: {
		id: 1,
		role: "Data Architecture Analyst",
		company: "Accenture",
		period: "04/2026 – actualidad",
		current: true,
	},
	telefonica: { id: 2, role: "Salesforce Developer · Prácticas", company: "Telefónica", period: "03/2025 – 01/2026" },
	edp: { id: 3, role: "Departamento de Producto", company: "EDP Solar", period: "11/2022 – 05/2023" },
	etoro: { id: 4, role: "Popular Investor", company: "eToro", period: "01/2020 – 01/2022" },
};

const edpExperience = {
	summary: "Apoyo a decisiones de producto en soluciones de energía solar.",
	bullets: [
		"Evalué la viabilidad técnica y económica de soluciones solares para apoyar decisiones de producto.",
		"Analicé mercado y competencia para identificar oportunidades de negocio.",
		"Colaboré en la valoración económica de propuestas comerciales.",
	],
};

const etoroExperience = {
	summary: "Gestión de una cartera de inversión pública copiada por otros inversores.",
	bullets: [
		"Gestioné una cartera copiada por 50 inversores (≈50k € copiados).",
		"Comuniqué a los inversores mi estrategia y las decisiones de la cartera, adaptando el mensaje a cada perfil.",
		"Operé siguiendo los requisitos de cumplimiento de la plataforma.",
	],
};

const pythonItem: TechItem = { name: "Python", icon: SiPython, color: "#FFD43B" };
const sqlItem: TechItem = { name: "SQL", icon: TbSql, color: brand };
const salesforceItem: TechItem = { name: "Salesforce", icon: SiSalesforce, color: "#00A1E0" };

export const tech: Profile = {
	id: "tech",
	path: "/",
	label: "Tech",
	sublabel: "Salesforce · Datos",
	role: "Desarrollador Salesforce",
	tagline: "Backend, Integraciones y Datos",
	headline: "Del negocio al código: soluciones Salesforce que escalan",
	highlightFrom: 4,
	intro:
		"desarrollador Salesforce con experiencia en Apex, LWC, Flows e integraciones, y en proyectos de datos para banca. Mi base en economía me ayuda a convertir necesidades de negocio en soluciones técnicas claras.",
	primaryCta: { title: "Ver mi experiencia", href: "#experience" },
	stats: [
		{ value: "Accenture", label: "Data Architecture Analyst" },
		{ value: "Agentforce", label: "AI Agent Specialist" },
		{ value: "7 años", label: "invirtiendo en mercados" },
	],
	nav: [
		{ name: "Sobre mí", link: "#about" },
		{ name: "Experiencia", link: "#experience" },
		{ name: "Proyectos", link: "#projects" },
		{ name: "Stack", link: "#tech-stack" },
		{ name: "Contacto", link: "#contact" },
	],
	grid: buildGrid({
		1: {
			title: "Traduzco necesidades de negocio en soluciones técnicas claras.",
			description: "De la economía al código",
		},
		2: { title: "Salesforce Developer", description: "Apex · LWC · Flows · Agentforce", img: "/b8.png" },
		3: { title: "Mi stack tecnológico", description: "Siempre ampliando" },
		4: {
			title: "Economista de formación: datos, estadística y visión de negocio",
			description: "Grado en Economía · URJC",
		},
		5: {
			title: "Mercados, inversión y blockchain",
			description: "7 años invirtiendo · bot de liquidez en Solana",
		},
		6: { title: "¿Hablamos de tu próximo proyecto?", description: "" },
	}),
	bentoStack: {
		left: ["Apex", "LWC", "Flows"],
		right: ["TypeScript", "Python", "Next.js"],
	},
	gradient: {
		start: "rgb(108, 0, 162)",
		end: "rgb(0, 17, 82)",
		first: "18, 113, 255",
		second: "221, 74, 255",
		third: "100, 220, 255",
		fourth: "200, 50, 50",
		fifth: "180, 180, 50",
		pointer: "140, 100, 255",
	},
	experienceIntro: "De la economía y los mercados al desarrollo en Salesforce y la arquitectura de datos.",
	experience: [
		{
			...experienceBase.accenture,
			summary: "Proyecto de experiencia de cliente para una entidad bancaria.",
			bullets: [
				"Definí modelos de datos, esquemas e integraciones del proyecto.",
				"Diseñé segmentaciones de clientes y flujos de comunicación sobre Adobe Experience Platform.",
				"Recogí requisitos funcionales y técnicos y documenté las soluciones junto a equipos de negocio y tecnología.",
			],
			tags: ["Modelado de datos", "Integraciones", "Adobe Experience Platform", "Banca"],
		},
		{
			...experienceBase.telefonica,
			summary: "Desarrollo y mantenimiento de soluciones Salesforce en un entorno corporativo.",
			bullets: [
				"Desarrollé y mantuve soluciones con Apex, SOQL, Triggers, Flows y componentes LWC/Aura.",
				"Participé en integraciones entre sistemas mediante APIs REST y SOAP.",
				"Automaticé procesos y colaboré en pruebas, despliegues (CI/CD con Salesforce CLI y Jenkins) y documentación técnica.",
				"Trabajé con control de cambios y procedimientos de calidad.",
			],
			tags: ["Apex", "LWC", "Flows", "REST / SOAP", "Jenkins"],
		},
		{ ...experienceBase.edp, ...edpExperience, tags: ["Análisis de negocio", "Producto", "Finanzas"] },
		{ ...experienceBase.etoro, ...etoroExperience, tags: ["Inversión", "Comunicación", "Compliance"] },
	],
	projects: {
		eyebrow: "Portfolio",
		title: "Algunos de mis",
		highlight: "proyectos",
		items: [liquidityBot, ...webProjects],
	},
	stack: {
		eyebrow: "Herramientas",
		title: "Mi",
		highlight: "stack tecnológico",
		groups: [
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
					{ name: "APIs REST / SOAP", icon: TbApi, color: brand },
					sqlItem,
					{ name: "MongoDB", icon: SiMongodb, color: "#47A248" },
					pythonItem,
				],
			},
			{
				title: "Datos",
				description: "Modelado, integraciones y plataformas de datos de cliente.",
				items: [
					{ name: "Modelado de datos", icon: TbDatabase, color: brand },
					{ name: "Integraciones" },
					{ name: "Adobe Experience Platform" },
				],
			},
		],
		marquee: [
			salesforceItem,
			{ name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
			{ name: "React", icon: SiReact, color: "#61DAFB" },
			{ name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
			pythonItem,
			{ name: "Angular", icon: SiAngular, color: "#DD0031" },
			{ name: "MongoDB", icon: SiMongodb, color: "#47A248" },
			{ name: "Jenkins", icon: SiJenkins, color: "#F0D6B7" },
			{ name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
			{ name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
		],
	},
	approach: {
		eyebrow: "Cómo trabajo",
		title: "Mi",
		highlight: "enfoque",
		phases: [
			{
				title: "Entender el negocio",
				des: "Recojo requisitos funcionales y técnicos junto a los equipos de negocio y tecnología, y los traduzco en una solución clara y bien documentada.",
			},
			{
				title: "Diseñar datos e integraciones",
				des: "Defino modelos de datos, esquemas e integraciones entre sistemas (APIs REST y SOAP) pensando en la escalabilidad y en el mantenimiento a largo plazo.",
			},
			{
				title: "Construir, automatizar y desplegar",
				des: "Desarrollo con Apex, LWC, Flows y Agentforce, automatizo procesos y cuido la calidad con pruebas, control de cambios y CI/CD (Salesforce CLI y Jenkins).",
			},
		],
	},
	contact: {
		eyebrow: "Contacto",
		title: "¿Construimos algo",
		highlight: "juntos?",
		text: "Estoy abierto a nuevas oportunidades en el ecosistema Salesforce, especialmente en integraciones y agentes de IA con Agentforce. Escríbeme y hablamos.",
		cta: "Cuéntame sobre el puesto o el proyecto…",
	},
	cv: { file: "/Manuel_Gonzalez_Garcia_CV.pdf", preview: "/cv-preview.jpg", label: "CV Tech" },
	meta: {
		title: "Manuel González · Desarrollador Salesforce",
		description:
			"Portfolio de Manuel González, desarrollador Salesforce especializado en backend, integraciones y datos. Apex, LWC, Flows, Agentforce y proyectos de datos para banca.",
		keywords: ["Salesforce", "Desarrollador Salesforce", "Apex", "LWC", "Agentforce", "Integraciones", "Datos"],
	},
};

export const finanzas: Profile = {
	id: "finanzas",
	path: "/finanzas",
	label: "Finanzas",
	sublabel: "Inversión · Riesgo",
	role: "Economista",
	tagline: "Inversión, Riesgo y Mercados Financieros",
	headline: "Del dato a la decisión: análisis con rigor cuantitativo",
	highlightFrom: 4,
	intro:
		"economista con siete años invirtiendo por cuenta propia, incluida la gestión de carteras familiares. Combino economía, estadística y econometría con un perfil técnico (Python, SQL, datos) para analizar con rigor y construir mis propias herramientas.",
	primaryCta: { title: "Ver inversiones y mercados", href: "#markets" },
	stats: [
		{ value: "7 años", label: "invirtiendo por cuenta propia" },
		{ value: "≈50k €", label: "copiados por 50 inversores" },
		{ value: "Economía", label: "Grado · URJC" },
	],
	nav: [
		{ name: "Sobre mí", link: "#about", hideOnMobile: true },
		{ name: "Experiencia", link: "#experience" },
		{ name: "Mercados", link: "#markets" },
		{ name: "Competencias", link: "#tech-stack" },
		{ name: "Contacto", link: "#contact" },
	],
	grid: buildGrid({
		1: {
			title: "Analizo con rigor y construyo mis propias herramientas.",
			description: "Economía + datos + código",
		},
		2: { title: "Economista e inversor", description: "Macro · Riesgo · Valoración" },
		3: { title: "Mis herramientas", description: "Análisis cuantitativo" },
		4: {
			title: "Perfil técnico: Python, SQL, datos y desarrollo",
			description: "Accenture · Telefónica · Fullstack",
		},
		5: {
			title: "Mercados, inversión y blockchain",
			description: "Carteras familiares · bot de liquidez en Solana",
		},
		6: { title: "¿Buscas un perfil analítico para tu equipo?", description: "" },
	}),
	bentoStack: {
		left: ["Python", "SQL", "Excel"],
		right: ["Valoración", "Macro", "Riesgo"],
	},
	gradient: {
		start: "rgb(105, 70, 8)",
		end: "rgb(3, 22, 36)",
		first: "233, 196, 106",
		second: "20, 184, 166",
		third: "250, 230, 180",
		fourth: "180, 120, 40",
		fifth: "60, 140, 120",
		pointer: "233, 196, 106",
	},
	experienceIntro: "Datos, negocio y mercados: de gestionar una cartera pública a proyectos de datos para banca.",
	experience: [
		{
			...experienceBase.accenture,
			summary: "Proyecto de datos para una entidad bancaria.",
			bullets: [
				"Definí modelos de datos, esquemas e integraciones del proyecto.",
				"Diseñé segmentaciones de clientes a partir de datos, trabajando con equipos de negocio y tecnología.",
				"Traduje necesidades de negocio en requisitos técnicos y documenté las soluciones.",
			],
			tags: ["Datos", "Segmentación de clientes", "Banca", "Requisitos de negocio"],
		},
		{
			...experienceBase.telefonica,
			summary: "Soluciones Salesforce para procesos de negocio y gestión de información.",
			bullets: [
				"Desarrollé y mantuve soluciones en Salesforce para procesos de negocio y gestión de información.",
				"Participé en integraciones entre sistemas mediante APIs REST y SOAP, y en pruebas, despliegues y documentación técnica.",
			],
			tags: ["Procesos de negocio", "Salesforce", "APIs REST / SOAP"],
		},
		{ ...experienceBase.edp, ...edpExperience, tags: ["Viabilidad económica", "Análisis de mercado", "Valoración"] },
		{
			...experienceBase.etoro,
			...etoroExperience,
			tags: ["Gestión de carteras", "Relación con inversores", "Compliance"],
		},
	],
	markets: {
		eyebrow: "Más allá del currículum",
		title: "Inversiones y",
		highlight: "mercados",
		intro: "Siete años aplicando lo que estudio a decisiones con dinero real.",
		featured: {
			...liquidityBot,
			des: "Bot de provisión de liquidez en mercados descentralizados que genera comisiones y gestiona el riesgo de precio. Python, APIs, servidor propio e IAs autónomas integradas.",
		},
		items: [
			{
				title: "Inversión propia y carteras familiares",
				des: "Siete años de inversión propia, con gestión de carteras familiares, siguiendo múltiples enfoques de riesgo y plazo.",
				icon: TbChartPie,
			},
			{
				title: "Análisis macro y de mercados",
				des: "Seguimiento de macroeconomía, política monetaria, liquidez y valoración de activos.",
				icon: TbWorld,
			},
			{
				title: "Tokenización e infraestructura de mercado",
				des: "TFG sobre blockchain y su relación con las finanzas tradicionales.",
				icon: TbBuildingBank,
			},
		],
	},
	projects: {
		eyebrow: "Perfil técnico",
		title: "También",
		highlight: "construyo",
		intro: "Webs que he desarrollado de principio a fin.",
		items: webProjects,
	},
	stack: {
		eyebrow: "Herramientas",
		title: "Mis",
		highlight: "competencias",
		groups: [
			{
				title: "Finanzas",
				description: "Análisis de empresas, inversiones y contexto macro.",
				items: [
					{ name: "Estados financieros", icon: TbReportMoney, color: brand },
					{ name: "Ratios" },
					{ name: "Valoración", icon: TbScale, color: brand },
					{ name: "Análisis de inversiones", icon: TbChartCandle, color: brand },
					{ name: "Macroeconomía", icon: TbWorld, color: brand },
					{ name: "Viabilidad económica" },
				],
			},
			{
				title: "Datos y tecnología",
				description: "Herramientas para analizar con rigor y automatizar.",
				items: [
					{ name: "Excel avanzado", icon: TbFileSpreadsheet, color: "#21A366" },
					{ name: "PowerPoint", icon: TbPresentation, color: "#D35230" },
					sqlItem,
					pythonItem,
					{ name: "Modelado de datos", icon: TbDatabase, color: brand },
					{ name: "APIs", icon: TbApi, color: brand },
				],
			},
			{
				title: "Plataformas",
				description: "Experiencia en entornos corporativos de datos y CRM.",
				items: [salesforceItem, { name: "Adobe Experience Platform", icon: SiAdobe, color: "#FA0F00" }],
			},
		],
		marquee: [
			{ name: "Valoración", icon: TbScale, color: brand },
			pythonItem,
			{ name: "Excel", icon: TbFileSpreadsheet, color: "#21A366" },
			{ name: "Macroeconomía", icon: TbWorld, color: brand },
			sqlItem,
			{ name: "Análisis de inversiones", icon: TbChartCandle, color: brand },
			{ name: "Estados financieros", icon: TbReportMoney, color: brand },
			{ name: "Carteras", icon: TbChartPie, color: brand },
			salesforceItem,
			{ name: "Mercados", icon: TbChartLine, color: brand },
		],
	},
	approach: {
		eyebrow: "Cómo analizo",
		title: "Mi",
		highlight: "enfoque",
		phases: [
			{
				title: "Entender el contexto",
				des: "Sigo la macroeconomía, la política monetaria y la liquidez para situar cada decisión en su contexto de mercado.",
			},
			{
				title: "Analizar con rigor",
				des: "Estados financieros, ratios y valoración, apoyados en estadística y econometría; con Python y SQL cuando los datos lo piden.",
			},
			{
				title: "Medir y gestionar el riesgo",
				des: "Antes que el retorno, entender cómo se mide y se gestiona el riesgo, combinando distintos enfoques de riesgo y plazo.",
			},
		],
	},
	contact: {
		eyebrow: "Contacto",
		title: "¿Hablamos de",
		highlight: "inversión?",
		text: "Busco incorporarme a un equipo de análisis, riesgos o inversión donde aplicar el análisis cuantitativo y la visión macro a decisiones reales.",
		cta: "Cuéntame sobre el puesto o el equipo…",
	},
	cv: {
		file: "/Manuel_Gonzalez_Garcia_CV_Finanzas.pdf",
		preview: "/cv-preview-finanzas.jpg",
		label: "CV Finanzas",
	},
	meta: {
		title: "Manuel González · Economista · Inversión y Mercados",
		description:
			"Portfolio de Manuel González, economista con siete años invirtiendo y gestionando carteras. Análisis de inversiones, riesgo y mercados financieros, con perfil técnico en Python, SQL y datos.",
		keywords: ["Economista", "Inversión", "Riesgos", "Mercados financieros", "Análisis de inversiones", "Python", "SQL"],
	},
};

export const profiles: Record<ProfileId, Profile> = { tech, finanzas };

export const getProfile = (id: ProfileId) => profiles[id];

export const otherProfile = (id: ProfileId) => (id === "tech" ? finanzas : tech);
