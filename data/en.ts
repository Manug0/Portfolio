// English content: a faithful translation of data/es.ts. Same structure, same facts, nothing added.
// Wording follows the English CVs where they cover the same sentence (British spelling, as in the CVs).
import type { Content, Experience, Profile, Project } from "./types";
import { icons, named, projectImages, projectLinks, tech } from "./shared";

const liquidityBot: Project = {
	id: 1,
	title: "Liquidity bot on Solana",
	des: "Personal project: automates liquidity-provision positions on decentralised markets. Python, APIs, own server and integrated autonomous AIs.",
	stack: [tech.python, tech.solana, tech.api, named("AI agents", icons.ai)],
	badge: "Personal project",
};

const webProjects: Project[] = [
	{
		id: 2,
		title: "Aurean Talent",
		des: "Corporate website for a talent acquisition and development consultancy.",
		img: projectImages.aurean,
		stack: [tech.react, tech.js, tech.tailwind, tech.framer, tech.figma],
		link: projectLinks.aurean,
		badge: "Client",
	},
	{
		id: 3,
		title: "GdC Fiscal",
		des: "Website for a tax and legal advisory firm, built with Angular and TypeScript.",
		img: projectImages.gdc,
		stack: [tech.angular, tech.ts, tech.tailwind, tech.framer, tech.figma],
		link: projectLinks.gdc,
		badge: "Client",
	},
	{
		id: 4,
		title: "Phone Fusion",
		des: "Fictional e-commerce where I applied the whole stack, from frontend to backend.",
		img: projectImages.phoneFusion,
		stack: [tech.react, tech.js, tech.framer, tech.figma],
		link: projectLinks.phoneFusion,
		badge: "Full-stack",
	},
];

// Jobs shared by both profiles; each profile adds its own summary, achievements and tags
const jobs = {
	accenture: { id: 1, role: "Data Architecture Analyst", company: "Accenture", period: "04/2026 – 10/2026" },
	telefonica: { id: 2, role: "Salesforce Developer", company: "Telefónica", period: "03/2025 – 01/2026" },
	edp: {
		id: 3,
		role: "Product Department",
		company: "EDP Solar",
		period: "11/2022 – 05/2023",
		summary: "Support for product decisions on solar energy solutions.",
		bullets: [
			"Assessed the technical and economic feasibility of solar solutions to support product decisions.",
			"Analysed the market and competitors to identify business opportunities.",
			"Contributed to the economic valuation of commercial proposals.",
		],
	},
	etoro: {
		id: 4,
		role: "Popular Investor",
		company: "eToro",
		period: "01/2020 – 01/2022",
		summary: "Management of a public investment portfolio copied by other investors.",
		bullets: [
			"Managed a portfolio copied by 50 investors (≈€50k copied).",
			"Communicated my strategy and portfolio decisions to investors, adapting the message to each profile.",
			"Operated in line with the platform's compliance requirements.",
		],
	},
} satisfies Record<string, Partial<Experience>>;

const tech_: Profile = {
	id: "tech",
	label: "Tech",
	sublabel: "Data · Development",
	role: "Salesforce Developer",
	tagline: "Fullstack, Integrations and Data | Finance",
	headline: "From business to code: technical solutions that scale",
	highlightFrom: 4,
	intro:
		"a developer with experience in data projects for banking, in Salesforce (Apex, LWC, Flows and integrations) and in web development. My background in economics helps me turn business needs into clear technical solutions.",
	primaryCta: { title: "See my experience", href: "#experience" },
	stats: [
		{ value: "Accenture", label: "Data Architecture Analyst" },
		{ value: "Agentforce", label: "AI Agent Specialist" },
		{ value: "7 years", label: "investing in markets" },
	],
	nav: [
		{ name: "About", link: "#about", hideOnMobile: true },
		{ name: "Experience", link: "#experience" },
		{ name: "Projects", link: "#projects" },
		{ name: "Stack", link: "#tech-stack" },
		{ name: "Contact", link: "#contact" },
	],
	about: {
		statement: {
			title: "I translate business needs into clear technical solutions.",
			description: "From economics to code",
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
				description: "Data models · Segmentation · Integrations",
				icon: icons.adobe,
				color: "#FA0F00",
			},
		],
		tools: {
			title: "My tech stack",
			description: "Always expanding",
			rows: [
				["Apex", "LWC", "Flows"],
				["React", "TypeScript", "Node.js"],
				["SQL", "Python", "MongoDB"],
			],
		},
		crossover: {
			title: "An economist by training: data, statistics and business vision",
			description: "Bachelor's in Economics · URJC",
		},
		markets: {
			title: "Markets, investing and blockchain",
			description: "7 years investing · liquidity bot on Solana",
		},
		cta: { title: "Shall we talk about your next project?" },
	},
	experienceIntro: "From economics and markets to Salesforce development and data architecture.",
	experience: [
		{
			...jobs.accenture,
			summary: "Customer-experience project for a banking institution.",
			bullets: [
				"Defined the project's data models, schemas and integrations.",
				"Designed customer segments and communication flows on Adobe Experience Platform.",
				"Gathered functional and technical requirements and documented the solutions together with business and technology teams.",
			],
			tags: ["Data modelling", "Integrations", "Adobe Experience Platform", "Banking"],
		},
		{
			...jobs.telefonica,
			summary: "Development and maintenance of Salesforce solutions in a corporate environment.",
			bullets: [
				"Developed and maintained solutions with Apex, SOQL, Triggers, Flows and LWC/Aura components.",
				"Took part in system integrations through REST and SOAP APIs.",
				"Automated processes and contributed to testing, deployments (CI/CD with Salesforce CLI and Jenkins) and technical documentation.",
				"Worked with change control and quality procedures.",
			],
			tags: ["Apex", "LWC", "Flows", "REST / SOAP", "Jenkins"],
		},
		{ ...jobs.edp, tags: ["Business analysis", "Product", "Finance"] },
		{ ...jobs.etoro, tags: ["Investing", "Communication", "Compliance"] },
	],
	projects: {
		eyebrow: "Portfolio",
		title: "Some of my",
		highlight: "projects",
		items: [liquidityBot, ...webProjects],
	},
	stack: {
		eyebrow: "Tools",
		title: "My",
		highlight: "tech stack",
		groups: [
			{
				title: "Development",
				description: "Backend, frontend and APIs to build end to end.",
				items: [
					tech.js,
					tech.ts,
					tech.react,
					tech.next,
					tech.angular,
					tech.node,
					tech.html,
					tech.css,
					named("REST / SOAP APIs", icons.api),
					tech.sql,
					tech.mongodb,
					tech.python,
				],
			},
			{
				title: "Data",
				description: "Modelling, integrations and customer data platforms.",
				items: [named("Data modelling", icons.database), named("Integrations"), named("Adobe Experience Platform")],
			},
			{
				title: "Salesforce",
				description: "Platform development, automation and AI agents.",
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
		eyebrow: "How I work",
		title: "My",
		highlight: "approach",
		phases: [
			{
				title: "Understand the business",
				des: "I gather functional and technical requirements together with business and technology teams, and translate them into a clear, well-documented solution.",
			},
			{
				title: "Design data and integrations",
				des: "I define data models, schemas and integrations between systems (REST and SOAP APIs) with scalability and long-term maintenance in mind.",
			},
			{
				title: "Build, automate and deploy",
				des: "I develop on Salesforce (Apex, LWC, Flows and Agentforce) or on the web (React, TypeScript), automate processes and look after quality with testing, change control and CI/CD (Salesforce CLI and Jenkins).",
			},
		],
	},
	contact: {
		eyebrow: "Contact",
		title: "Shall we build something",
		highlight: "together?",
		text: "I am open to new opportunities in data and development: databases, integrations, Salesforce or web. Drop me a line and let's talk.",
		cta: "Tell me about the role or the project…",
	},
	cv: { file: "/Manuel_Gonzalez_Garcia_CV_EN.pdf", preview: "/cv-preview-en.jpg", label: "Tech CV" },
	meta: {
		title: "Manuel González · Salesforce Developer · Fullstack, Integrations and Data",
		description:
			"Portfolio of Manuel González, a developer specialised in backend, integrations and data: data projects for banking, Salesforce (Apex, LWC, Flows, Agentforce) and web development with React, TypeScript and Angular.",
		keywords: ["Developer", "Data", "Integrations", "Backend", "Salesforce", "Apex", "React", "TypeScript", "SQL"],
	},
};

const finanzas: Profile = {
	id: "finanzas",
	label: "Finance",
	sublabel: "Investment · Risk",
	role: "Economist with a Technical Profile",
	tagline: "Corporate Banking & Financial Markets",
	headline: "From data to decision: analysis with quantitative rigour",
	highlightFrom: 3,
	intro:
		"an economist with seven years of personal investing, including managing family portfolios, currently preparing for the CFA Level I exam. I combine economics, statistics and econometrics with a technical profile (Python, SQL, data) to analyse rigorously and build my own tools.",
	primaryCta: { title: "See investing and markets", href: "#markets" },
	stats: [
		{ value: "7 years", label: "of personal investing" },
		{ value: "≈€50k", label: "copied by 50 investors" },
		{ value: "Economics", label: "Bachelor's · URJC" },
	],
	nav: [
		{ name: "About", link: "#about", hideOnMobile: true },
		{ name: "Experience", link: "#experience" },
		{ name: "Markets", link: "#markets" },
		{ name: "Skills", link: "#tech-stack" },
		{ name: "Contact", link: "#contact" },
	],
	about: {
		statement: {
			title: "I analyse rigorously and build my own tools.",
			description: "Economics + data + code",
		},
		roles: [{ title: "Economist and investor", description: "Macro · Risk · Valuation" }],
		tools: {
			title: "My tools",
			description: "Quantitative analysis",
			rows: [
				["Python", "SQL", "Excel"],
				["Valuation", "Macro", "Risk"],
			],
		},
		crossover: {
			title: "Technical profile: Python, SQL, data and development",
			description: "Accenture · Telefónica · Full-stack",
		},
		markets: {
			title: "Markets, investing and blockchain",
			description: "Family portfolios · liquidity bot on Solana",
		},
		cta: { title: "Looking for an analytical profile for your team?" },
	},
	experienceIntro: "Data, business and markets: from managing a public portfolio to data projects for banking.",
	experience: [
		{
			...jobs.accenture,
			summary: "Data project for a banking institution.",
			bullets: [
				"Defined the project's data models, schemas and integrations.",
				"Designed customer segments from data, working with business and technology teams.",
				"Translated business needs into technical requirements and documented the solutions.",
			],
			tags: ["Data", "Customer segmentation", "Banking", "Business requirements"],
		},
		{
			...jobs.telefonica,
			summary: "Salesforce solutions for business processes and information management.",
			bullets: [
				"Developed and maintained Salesforce solutions for business processes and information management.",
				"Took part in system integrations through REST and SOAP APIs, and in testing, deployments and technical documentation.",
			],
			tags: ["Business processes", "Salesforce", "REST / SOAP APIs"],
		},
		{ ...jobs.edp, tags: ["Economic feasibility", "Market analysis", "Valuation"] },
		{ ...jobs.etoro, tags: ["Portfolio management", "Investor relations", "Compliance"] },
	],
	markets: {
		eyebrow: "Beyond the CV",
		title: "Investing and",
		highlight: "markets",
		intro: "Seven years applying what I study to decisions with real money.",
		featured: {
			...liquidityBot,
			des: "Liquidity-provision bot on decentralised markets that generates fees and manages price risk. Python, APIs, own server and integrated autonomous AIs.",
		},
		items: [
			{
				title: "Personal investing and family portfolios",
				des: "Seven years of personal investing, including managing family portfolios, with varied risk and time-horizon approaches.",
				icon: icons.portfolios,
			},
			{
				title: "Macro and market analysis",
				des: "Monitoring of macroeconomics, monetary policy, liquidity and asset valuation.",
				icon: icons.macro,
			},
			{
				title: "Tokenisation and market infrastructure",
				des: "Bachelor's thesis on blockchain and its relationship with traditional finance.",
				icon: icons.bank,
			},
		],
	},
	projects: {
		eyebrow: "Technical profile",
		title: "I also",
		highlight: "build",
		intro: "Websites I have developed from start to finish.",
		items: webProjects,
	},
	stack: {
		eyebrow: "Tools",
		title: "My",
		highlight: "skills",
		groups: [
			{
				title: "Finance",
				description: "Analysis of companies, investments and macro context.",
				items: [
					named("Financial statements", icons.statements),
					named("Ratios"),
					named("Valuation", icons.valuation),
					named("Investment analysis", icons.investments),
					named("Macroeconomics", icons.macro),
					named("Economic feasibility"),
				],
			},
			{
				title: "Data and technology",
				description: "Tools to analyse rigorously and automate.",
				items: [
					named("Advanced Excel", icons.excel, "#21A366"),
					tech.powerpoint,
					tech.sql,
					tech.python,
					named("Data modelling", icons.database),
					tech.api,
				],
			},
			{
				title: "Platforms",
				description: "Experience in corporate data and CRM environments.",
				items: [tech.salesforce, tech.adobe],
			},
		],
		marquee: [
			named("Valuation", icons.valuation),
			tech.python,
			named("Excel", icons.excel, "#21A366"),
			named("Macroeconomics", icons.macro),
			tech.sql,
			named("Investment analysis", icons.investments),
			named("Financial statements", icons.statements),
			named("Portfolios", icons.portfolios),
			tech.salesforce,
			named("Markets", icons.markets),
		],
	},
	approach: {
		eyebrow: "How I analyse",
		title: "My",
		highlight: "approach",
		phases: [
			{
				title: "Understand the context",
				des: "I follow macroeconomics, monetary policy and liquidity to place each decision in its market context.",
			},
			{
				title: "Analyse rigorously",
				des: "Financial statements, ratios and valuation, supported by statistics and econometrics; with Python and SQL when the data calls for it.",
			},
			{
				title: "Measure and manage risk",
				des: "Before return, understand how risk is measured and managed, combining different risk and time-horizon approaches.",
			},
		],
	},
	contact: {
		eyebrow: "Contact",
		title: "Shall we talk about",
		highlight: "investing?",
		text: "I am looking to join an analysis, risk or investment team where I can apply quantitative analysis and a macro view to real decisions.",
		cta: "Tell me about the role or the team…",
	},
	cv: {
		file: "/Manuel_Gonzalez_Garcia_CV_Finance_EN.pdf",
		preview: "/cv-preview-finance-en.jpg",
		label: "Finance CV",
	},
	meta: {
		title: "Manuel González · Economist with a Technical Profile · Corporate Banking & Financial Markets",
		description:
			"Portfolio of Manuel González, an economist focused on finance: investment analysis, risk and financial markets. Seven years investing and managing portfolios, with a technical profile in Python, SQL and data for banking.",
		keywords: ["Economist", "Investment", "Risk", "Financial markets", "Investment analysis", "Python", "SQL"],
	},
};

export const en: Content = {
	locale: "en",
	location: "Madrid, Spain",
	profiles: { finanzas, tech: tech_ },
	education: [
		{
			id: 1,
			title: "Technology Applied to Business Development",
			school: "Universidad Internacional de La Rioja",
			period: "2025 – 2026",
			des: "Backend development oriented to business solutions.",
		},
		{
			id: 2,
			title: "Master's in Full-Stack Development",
			school: "ThePower Business School",
			period: "2023 – 2024",
			des: "Development of web applications and digital solutions.",
		},
		{
			id: 3,
			title: "Bachelor's in Economics",
			school: "Universidad Rey Juan Carlos",
			period: "2019 – 2023",
			des: "Econometrics, statistics and financial analysis. University investment club (2 years). Bachelor's thesis on blockchain and traditional finance.",
		},
	],
	certifications: [{ id: 1, title: "AI Agent Specialist", issuer: "Salesforce · Agentforce" }],
	languages: [
		{ name: "Spanish", level: "Native" },
		{ name: "English", level: "Advanced" },
	],
	ui: {
		skip: "Skip to content",
		navLabel: "Main navigation",
		footerNavLabel: "Footer",
		chooseProfile: "Choose profile",
		viewProfile: (label) => `View ${label.toLowerCase()} profile`,
		viewProfileAria: (label) => `View the ${label} profile`,
		language: { code: "ES", label: "Ver esta página en español" },
		theme: "Switch between light and dark theme",
		hero: {
			photoAlt: "Photo of Manuel González",
			greeting: "Hi! I'm",
			download: (cv) => `Download ${cv}`,
		},
		about: { eyebrow: "About", mainTech: "Main technologies" },
		copyEmail: { idle: "Copy my email", done: "Email copied!", announce: "Email copied to clipboard" },
		experience: {
			eyebrow: "Career",
			title: "My",
			highlight: "experience",
			current: "Present",
			tagsLabel: "Technologies and areas",
		},
		projects: {
			screenshotAlt: (title) => `Screenshot of ${title}`,
			visit: "Visit site",
			visitAria: (title) => `Visit ${title} (opens in a new tab)`,
			stackLabel: "Technologies used",
		},
		approach: { phase: (n) => `Phase ${n}` },
		education: {
			eyebrow: "Education",
			title: "Education and",
			highlight: "certifications",
			certification: "Certification",
			languages: "Languages",
			cvNote: "All of the above, in two pages.",
			download: "Download",
			viewOnline: "View online",
			viewCvAria: "View the CV as a PDF (opens in a new tab)",
			otherCv: (profile, cv) => `Looking for the ${profile.toLowerCase()} profile? Download the ${cv}`,
		},
		contact: { email: "Email", linkedin: "LinkedIn", github: "GitHub", location: "Location" },
		form: {
			title: "Write to me",
			subtitle: "I'll reply as soon as possible.",
			name: "Name",
			namePlaceholder: "Your name",
			email: "Email",
			emailPlaceholder: "name@example.com",
			message: "Message",
			company: "Company",
			sending: "Sending…",
			send: "Send message",
			success: "Message sent! Thanks for writing.",
			error: "The message could not be sent. Write to me directly at",
			errors: {
				name: "Name is required",
				email: "Email is required",
				emailInvalid: "The email is not valid",
				message: "Message is required",
				messageShort: "Tell me a bit more (minimum 10 characters)",
			},
		},
		footer: { madeWith: "Built with Next.js and Tailwind CSS" },
		bot: [
			"» analysing liquidity pools…",
			"» AI agent: optimal range recalculated",
			"✓ position rebalanced automatically",
		],
	},
};
