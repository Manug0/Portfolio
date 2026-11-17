import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

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

export const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable}`;
