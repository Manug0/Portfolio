import "../globals.css";

import { type Locale, locales } from "@/data/site";
import { baseMetadata, baseViewport, jsFlagScript } from "../site-metadata";

import { fontVariables } from "../fonts";
import { notFound } from "next/navigation";

export const metadata = baseMetadata;
export const viewport = baseViewport;

// Solo existen las rutas de los idiomas definidos; el resto es un 404
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

// Un único layout raíz para los dos idiomas: <html lang> sale correcto desde el servidor y cambiar de
// idioma es una navegación normal, sin recargar la página. El español se sirve en "/" (ver next.config.js).
export default async function RootLayout({
	children,
	params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
	const { lang } = await params;
	if (!locales.includes(lang as Locale)) notFound();

	return (
		// data-theme: el tema claro es el de por defecto (el script lo quita si el visitante eligió el oscuro).
		// data-scroll-behavior: Next desactiva el scroll suave durante los cambios de ruta
		<html lang={lang} className={fontVariables} data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body>
				<script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
				{children}
			</body>
		</html>
	);
}
