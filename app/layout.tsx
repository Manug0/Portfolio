import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { siteConfig } from "@/data";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Valores por defecto; cada perfil (app/page.tsx y app/finanzas/page.tsx) define su título y descripción
export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: siteConfig.name,
	description: `Portfolio de ${siteConfig.name}`,
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	icons: { icon: "/Logo.svg" },
};

export const viewport: Viewport = {
	themeColor: "#000319",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" className="dark scroll-smooth">
			<body className={`${inter.className} bg-black-100 text-white antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
