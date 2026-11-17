import "./globals.css";

import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/data";

const sans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });
// Solo se usa en la palabra resaltada de los títulos del perfil de finanzas
const serif = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
	style: "italic",
	display: "swap",
	variable: "--font-serif",
});

// Valores por defecto; cada perfil (app/page.tsx y app/tech/page.tsx) define su título y descripción
export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: siteConfig.name,
	description: `Portfolio de ${siteConfig.name}`,
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	icons: { icon: "/Logo.svg" },
};

export const viewport: Viewport = {
	themeColor: "#05060d",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// data-scroll-behavior: Next desactiva el scroll suave durante los cambios de ruta
		<html
			lang="es"
			className={`${sans.variable} ${mono.variable} ${serif.variable}`}
			data-scroll-behavior="smooth"
			suppressHydrationWarning>
			<body>
				{/* Marca que hay JS antes de pintar: sin él, las animaciones de entrada no ocultan el contenido */}
				<script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
				{children}
			</body>
		</html>
	);
}
