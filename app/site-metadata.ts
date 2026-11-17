import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/data/site";

// Valores por defecto comunes a los dos idiomas; cada página define su título y descripción
export const baseMetadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: siteConfig.name,
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	icons: { icon: "/Logo.svg" },
};

export const baseViewport: Viewport = {
	themeColor: "#05060d",
	colorScheme: "dark",
};

// Marca que hay JS antes de pintar: sin él, las animaciones de entrada no ocultan el contenido
export const jsFlagScript = "document.documentElement.classList.add('js')";
