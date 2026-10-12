import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { siteConfig } from "@/data";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const description =
	"Portfolio de Manuel González, desarrollador Salesforce especializado en backend, integraciones y datos. Apex, LWC, Flows, Agentforce y proyectos de datos para banca.";

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: `${siteConfig.name} · ${siteConfig.role}`,
		template: `%s · ${siteConfig.name}`,
	},
	description,
	keywords: [
		"Salesforce",
		"Desarrollador Salesforce",
		"Apex",
		"LWC",
		"Agentforce",
		"Integraciones",
		"Datos",
		"Madrid",
		"Manuel González",
	],
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	icons: { icon: "/Logo.svg" },
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: siteConfig.url,
		siteName: siteConfig.name,
		title: `${siteConfig.name} · ${siteConfig.role}`,
		description,
		images: [{ url: "/b1.png", alt: siteConfig.name }],
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteConfig.name} · ${siteConfig.role}`,
		description,
		images: ["/b1.png"],
	},
};

export const viewport: Viewport = {
	themeColor: "#000319",
	colorScheme: "dark",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Manuel González García",
	jobTitle: siteConfig.role,
	url: siteConfig.url,
	email: `mailto:${siteConfig.email}`,
	address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
	sameAs: [siteConfig.github, siteConfig.linkedin],
	knowsAbout: ["Salesforce", "Apex", "Lightning Web Components", "Agentforce", "Integraciones", "Modelado de datos"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" className="dark scroll-smooth">
			<body className={`${inter.className} bg-black-100 text-white antialiased`}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
