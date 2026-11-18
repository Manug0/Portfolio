// Contenido en español. data/en.ts es su traducción: misma estructura, mismos datos.
// Los textos salen de los CVs; para cambiar algo de un perfil basta con editar este archivo (y su par en inglés).
import type { Content, Experience, Profile, Project } from "./types";
import { icons, named, projectImages, projectLinks, tech } from "./shared";

const liquidityBot: Project = {
	id: 1,
	title: "Bot de liquidez en Solana",
	des: "Proyecto personal: automatiza posiciones de provisión de liquidez en mercados descentralizados. Python, APIs, servidor propio e IAs autónomas integradas.",
	stack: [tech.python, tech.solana, tech.api, named("Agentes de IA", icons.ai)],
	badge: "Proyecto personal",
};

const webProjects: Project[] = [
	{
		id: 2,
		title: "Aurean Talent",
		des: "Web corporativa para una consultora de captación y desarrollo de talento.",
		img: projectImages.aurean,
		stack: [tech.react, tech.js, tech.tailwind, tech.framer, tech.figma],
		link: projectLinks.aurean,
		badge: "Cliente",
	},
	{
		id: 3,
		title: "GdC Fiscal",
		des: "Web para una asesoría fiscal y legal, construida con Angular y TypeScript.",
		img: projectImages.gdc,
		stack: [tech.angular, tech.ts, tech.tailwind, tech.framer, tech.figma],
		link: projectLinks.gdc,
		badge: "Cliente",
	},
	{
		id: 4,
		title: "Phone Fusion",
		des: "E-commerce ficticio en el que apliqué todo el stack, de frontend a backend.",
		img: projectImages.phoneFusion,
		stack: [tech.react, tech.js, tech.framer, tech.figma],
		link: projectLinks.phoneFusion,
		badge: "Fullstack",
	},
];

// Puestos comunes a los dos perfiles; cada perfil aporta su resumen, sus logros y sus etiquetas
const jobs = {
	accenture: { id: 1, role: "Data Architecture Analyst", company: "Accenture", period: "04/2026 – 10/2026" },
	telefonica: { id: 2, role: "Salesforce Developer", company: "Telefónica", period: "03/2025 – 01/2026" },
	edp: {
		id: 3,
		role: "Departamento de Producto",
		company: "EDP Solar",
		period: "11/2022 – 05/2023",
		summary: "Apoyo a decisiones de producto en soluciones de energía solar.",
		bullets: [
			"Evalué la viabilidad técnica y económica de soluciones solares para apoyar decisiones de producto.",
			"Analicé mercado y competencia para identificar oportunidades de negocio.",
			"Colaboré en la valoración económica de propuestas comerciales.",
		],
	},
	etoro: {
		id: 4,
		role: "Popular Investor",
		company: "eToro",
		period: "01/2020 – 01/2022",
		summary: "Gestión de una cartera de inversión pública copiada por otros inversores.",
		bullets: [
			"Gestioné una cartera copiada por 50 inversores (≈50k € copiados).",
			"Comuniqué a los inversores mi estrategia y las decisiones de la cartera, adaptando el mensaje a cada perfil.",
			"Operé siguiendo los requisitos de cumplimiento de la plataforma.",
		],
	},
} satisfies Record<string, Partial<Experience>>;

const tech_: Profile = {
	id: "tech",
	label: "Tech",
	sublabel: "Datos · Desarrollo",
	role: "Desarrollador Salesforce",
	tagline: "Fullstack, Integraciones y Datos | Finanzas",
	headline: "Del negocio al código: soluciones técnicas que escalan",
	highlightFrom: 4,
	intro:
		"desarrollador con experiencia en proyectos de datos para banca, en Salesforce (Apex, LWC, Flows e integraciones) y en desarrollo web. Mi base en economía me ayuda a convertir necesidades de negocio en soluciones técnicas claras.",
	primaryCta: { title: "Ver mi experiencia", href: "#experience" },
	stats: [
		{ value: "Fullstack", label: "Máster en Desarrollo" },
		{ value: "Agentforce", label: "AI Agent Specialist" },
		{ value: "7 años", label: "invirtiendo en mercados" },
	],
	nav: [
		{ name: "Sobre mí", link: "#about", hideOnMobile: true },
		{ name: "Experiencia", link: "#experience" },
		{ name: "Proyectos", link: "#projects" },
		{ name: "Stack", link: "#tech-stack" },
		{ name: "Contacto", link: "#contact" },
	],
	about: {
		statement: {
			title: "Traduzco necesidades de negocio en soluciones técnicas claras.",
			description: "De la economía al código",
		},
		roles: [
			{
				title: "Salesforce Developer",
				description: "Apex · LWC · Flows · Agentforce",
				icon: icons.salesforce,
				color: "#00A1E0",
			},
			{
				title: "Adobe Experience Platform Developer",
				description: "Modelos de datos · Segmentación · Integraciones",
				icon: icons.adobe,
				color: "#FA0F00",
			},
		],
		tools: {
			title: "Mi stack tecnológico",
			description: "Siempre ampliando",
			rows: [
				["Apex", "LWC", "Flows"],
				["React", "TypeScript", "Node.js"],
				["SQL", "Python", "MongoDB"],
			],
		},
		crossover: {
			title: "Economista de formación: datos, estadística y visión de negocio",
			description: "Grado en Economía · URJC",
		},
		markets: {
			title: "Mercados, inversión y blockchain",
			description: "7 años invirtiendo · bot de liquidez en Solana",
		},
		cta: { title: "¿Hablamos de tu próximo proyecto?" },
	},
	experienceIntro: "De la economía y los mercados al desarrollo en Salesforce y la arquitectura de datos.",
	experience: [
		{
			...jobs.accenture,
			summary: "Proyecto de experiencia de cliente para una entidad bancaria.",
			bullets: [
				"Definí modelos de datos, esquemas e integraciones del proyecto.",
				"Diseñé segmentaciones de clientes y flujos de comunicación sobre Adobe Experience Platform.",
				"Recogí requisitos funcionales y técnicos y documenté las soluciones junto a equipos de negocio y tecnología.",
			],
			tags: ["Modelado de datos", "Integraciones", "Adobe Experience Platform", "Banca"],
		},
		{
			...jobs.telefonica,
			summary: "Desarrollo y mantenimiento de soluciones Salesforce en un entorno corporativo.",
			bullets: [
				"Desarrollé y mantuve soluciones con Apex, SOQL, Triggers, Flows y componentes LWC/Aura.",
				"Participé en integraciones entre sistemas mediante APIs REST y SOAP.",
				"Automaticé procesos y colaboré en pruebas, despliegues (CI/CD con Salesforce CLI y Jenkins) y documentación técnica.",
				"Trabajé con control de cambios y procedimientos de calidad.",
			],
			tags: ["Apex", "LWC", "Flows", "REST / SOAP", "Jenkins"],
		},
		{ ...jobs.edp, tags: ["Análisis de negocio", "Producto", "Finanzas"] },
		{ ...jobs.etoro, tags: ["Inversión", "Comunicación", "Compliance"] },
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
				title: "Desarrollo",
				description: "Backend, frontend y APIs para construir de punta a punta.",
				items: [
					tech.js,
					tech.ts,
					tech.react,
					tech.next,
					tech.angular,
					tech.node,
					tech.html,
					tech.css,
					named("APIs REST / SOAP", icons.api),
					tech.sql,
					tech.mongodb,
					tech.python,
				],
			},
			{
				title: "Datos",
				description: "Modelado, integraciones y plataformas de datos de cliente.",
				items: [named("Modelado de datos", icons.database), named("Integraciones"), named("Adobe Experience Platform")],
			},
			{
				title: "Salesforce",
				description: "Desarrollo en plataforma, automatización y agentes de IA.",
				items: [
					named("Apex", icons.salesforce, "#00A1E0"),
					named("SOQL", icons.salesforce, "#00A1E0"),
					named("Triggers"),
					named("Flows"),
					named("LWC"),
					named("Aura"),
					named("Agentforce"),
					named("Salesforce CLI"),
					tech.jenkins,
				],
			},
		],
		marquee: [
			tech.react,
			tech.ts,
			tech.python,
			tech.sql,
			tech.salesforce,
			tech.next,
			tech.angular,
			tech.node,
			tech.mongodb,
			tech.js,
			tech.jenkins,
			tech.tailwind,
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
				des: "Desarrollo en Salesforce (Apex, LWC, Flows y Agentforce) o en web (React, TypeScript), automatizo procesos y cuido la calidad con pruebas, control de cambios y CI/CD (Salesforce CLI y Jenkins).",
			},
		],
	},
	contact: {
		eyebrow: "Contacto",
		title: "¿Construimos algo",
		highlight: "juntos?",
		text: "Estoy abierto a nuevas oportunidades en datos y desarrollo: bases de datos, integraciones, Salesforce o web. Escríbeme y hablamos.",
		cta: "Cuéntame sobre el puesto o el proyecto…",
	},
	cv: { file: "/Manuel_Gonzalez_Garcia_CV.pdf", preview: "/cv-preview.jpg", label: "CV Tech" },
	meta: {
		title: "Manuel González · Desarrollador Salesforce · Fullstack, Integraciones y Datos",
		description:
			"Portfolio de Manuel González, desarrollador especializado en backend, integraciones y datos: proyectos de datos para banca, Salesforce (Apex, LWC, Flows, Agentforce) y desarrollo web con React, TypeScript y Angular.",
		keywords: ["Desarrollador", "Datos", "Integraciones", "Backend", "Salesforce", "Apex", "React", "TypeScript", "SQL"],
	},
};

const finanzas: Profile = {
	id: "finanzas",
	label: "Finanzas",
	sublabel: "Inversión · Riesgo",
	role: "Economista con perfil técnico",
	tagline: "Banca corporativa y mercados financieros",
	headline: "Del dato a la decisión: análisis con rigor cuantitativo",
	highlightFrom: 4,
	intro:
		"economista con siete años invirtiendo por cuenta propia, incluida la gestión de carteras familiares, y actualmente preparando el Nivel I del CFA. Combino economía, estadística y econometría con un perfil técnico (Python, SQL, datos) para analizar con rigor y construir mis propias herramientas.",
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
	about: {
		statement: {
			title: "Analizo con rigor y construyo mis propias herramientas.",
			description: "Economía + datos + código",
		},
		roles: [{ title: "Economista e inversor", description: "Macro · Riesgo · Valoración" }],
		tools: {
			title: "Mis herramientas",
			description: "Análisis cuantitativo",
			rows: [
				["Python", "SQL", "Excel"],
				["Valoración", "Macro", "Riesgo"],
			],
		},
		crossover: {
			title: "Perfil técnico: Python, SQL, datos y desarrollo",
			description: "Accenture · Telefónica · Fullstack",
		},
		markets: {
			title: "Mercados, inversión y blockchain",
			description: "Carteras familiares · bot de liquidez en Solana",
		},
		cta: { title: "¿Buscas un perfil analítico para tu equipo?" },
	},
	experienceIntro: "Datos, negocio y mercados: de gestionar una cartera pública a proyectos de datos para banca.",
	experience: [
		{
			...jobs.accenture,
			summary: "Proyecto de datos para una entidad bancaria.",
			bullets: [
				"Definí modelos de datos, esquemas e integraciones del proyecto.",
				"Diseñé segmentaciones de clientes a partir de datos, trabajando con equipos de negocio y tecnología.",
				"Traduje necesidades de negocio en requisitos técnicos y documenté las soluciones.",
			],
			tags: ["Datos", "Segmentación de clientes", "Banca", "Requisitos de negocio"],
		},
		{
			...jobs.telefonica,
			summary: "Soluciones Salesforce para procesos de negocio y gestión de información.",
			bullets: [
				"Desarrollé y mantuve soluciones en Salesforce para procesos de negocio y gestión de información.",
				"Participé en integraciones entre sistemas mediante APIs REST y SOAP, y en pruebas, despliegues y documentación técnica.",
			],
			tags: ["Procesos de negocio", "Salesforce", "APIs REST / SOAP"],
		},
		{ ...jobs.edp, tags: ["Viabilidad económica", "Análisis de mercado", "Valoración"] },
		{ ...jobs.etoro, tags: ["Gestión de carteras", "Relación con inversores", "Compliance"] },
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
				icon: icons.portfolios,
			},
			{
				title: "Análisis macro y de mercados",
				des: "Seguimiento de macroeconomía, política monetaria, liquidez y valoración de activos.",
				icon: icons.macro,
			},
			{
				title: "Tokenización e infraestructura de mercado",
				des: "TFG sobre blockchain y su relación con las finanzas tradicionales.",
				icon: icons.bank,
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
					named("Estados financieros", icons.statements),
					named("Ratios"),
					named("Valoración", icons.valuation),
					named("Análisis de inversiones", icons.investments),
					named("Macroeconomía", icons.macro),
					named("Viabilidad económica"),
				],
			},
			{
				title: "Datos y tecnología",
				description: "Herramientas para analizar con rigor y automatizar.",
				items: [
					named("Excel avanzado", icons.excel, "#21A366"),
					tech.powerpoint,
					tech.sql,
					tech.python,
					named("Modelado de datos", icons.database),
					tech.api,
				],
			},
			{
				title: "Plataformas",
				description: "Experiencia en entornos corporativos de datos y CRM.",
				items: [tech.salesforce, tech.adobe],
			},
		],
		marquee: [
			named("Valoración", icons.valuation),
			tech.python,
			named("Excel", icons.excel, "#21A366"),
			named("Macroeconomía", icons.macro),
			tech.sql,
			named("Análisis de inversiones", icons.investments),
			named("Estados financieros", icons.statements),
			named("Carteras", icons.portfolios),
			tech.salesforce,
			named("Mercados", icons.markets),
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
		title: "Manuel González · Economista con perfil técnico · Banca corporativa y mercados financieros",
		description:
			"Portfolio de Manuel González, economista orientado a finanzas: análisis de inversiones, riesgo y mercados financieros. Siete años invirtiendo y gestionando carteras, con perfil técnico en Python, SQL y datos para banca.",
		keywords: ["Economista", "Inversión", "Riesgos", "Mercados financieros", "Análisis de inversiones", "Python", "SQL"],
	},
};

export const es: Content = {
	locale: "es",
	location: "Madrid, España",
	profiles: { finanzas, tech: tech_ },
	education: [
		{
			id: 1,
			title: "Tecnología Aplicada al Desarrollo de Empresas",
			school: "Universidad Internacional de La Rioja",
			period: "2025 – 2026",
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
	],
	certifications: [{ id: 1, title: "AI Agent Specialist", issuer: "Salesforce · Agentforce" }],
	languages: [
		{ name: "Español", level: "Nativo" },
		{ name: "Inglés", level: "Avanzado" },
	],
	ui: {
		skip: "Saltar al contenido",
		navLabel: "Navegación principal",
		footerNavLabel: "Pie de página",
		chooseProfile: "Elegir perfil",
		viewProfile: (label) => `Ver perfil ${label.toLowerCase()}`,
		viewProfileAria: (label) => `Ver el perfil ${label}`,
		language: "Idioma",
		backToTop: "Volver arriba",
		theme: "Cambiar entre tema claro y oscuro",
		hero: {
			photoAlt: "Foto de Manuel González",
			greeting: "¡Hola! Soy",
			download: (cv) => `Descargar ${cv}`,
		},
		about: { eyebrow: "Sobre mí", mainTech: "Tecnologías principales" },
		copyEmail: { idle: "Copia mi email", done: "¡Email copiado!", announce: "Email copiado al portapapeles" },
		experience: {
			eyebrow: "Trayectoria",
			title: "Mi",
			highlight: "experiencia",
			current: "Actualidad",
			tagsLabel: "Tecnologías y áreas",
		},
		projects: {
			screenshotAlt: (title) => `Captura de ${title}`,
			visit: "Visitar web",
			visitAria: (title) => `Visitar ${title} (se abre en una pestaña nueva)`,
			stackLabel: "Tecnologías utilizadas",
		},
		approach: { phase: (n) => `Fase ${n}` },
		education: {
			eyebrow: "Formación",
			title: "Formación y",
			highlight: "certificaciones",
			certification: "Certificación",
			languages: "Idiomas",
			cvNote: "Todo lo anterior, en dos páginas.",
			download: "Descargar",
			viewOnline: "Ver online",
			viewCvAria: "Ver el CV en PDF (se abre en una pestaña nueva)",
			otherCv: (profile, cv) => `¿Buscas el perfil ${profile.toLowerCase()}? Descarga el ${cv}`,
		},
		contact: { email: "Email", linkedin: "LinkedIn", github: "GitHub", location: "Ubicación" },
		form: {
			title: "Escríbeme",
			subtitle: "Te responderé lo antes posible.",
			name: "Nombre",
			namePlaceholder: "Tu nombre",
			email: "Email",
			emailPlaceholder: "correo@ejemplo.com",
			message: "Mensaje",
			company: "Empresa",
			sending: "Enviando…",
			send: "Enviar mensaje",
			success: "¡Mensaje enviado! Gracias por escribirme.",
			error: "No se pudo enviar el mensaje. Escríbeme directamente a",
			errors: {
				name: "El nombre es obligatorio",
				email: "El email es obligatorio",
				emailInvalid: "El email no es válido",
				message: "El mensaje es obligatorio",
				messageShort: "Cuéntame un poco más (mínimo 10 caracteres)",
			},
		},
		footer: { madeWith: "Hecho con Next.js y Tailwind CSS" },
		bot: [
			"» analizando pools de liquidez…",
			"» agente IA: rango óptimo recalculado",
			"✓ posición reajustada automáticamente",
		],
	},
};
