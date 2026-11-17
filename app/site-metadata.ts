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

// Se ejecuta antes de pintar: marca que hay JS (sin él, las animaciones de entrada no ocultan el contenido)
// y aplica el tema claro si el visitante lo eligió. El oscuro es el tema por defecto.
export const jsFlagScript =
	"document.documentElement.classList.add('js');try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}";
