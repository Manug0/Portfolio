import "../globals.css";

import { baseMetadata, baseViewport, jsFlagScript } from "../site-metadata";

import { fontVariables } from "../fonts";

export const metadata = baseMetadata;
export const viewport = baseViewport;

// Cada idioma tiene su propio layout raíz para que <html lang> salga correcto desde el servidor
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		// data-scroll-behavior: Next desactiva el scroll suave durante los cambios de ruta
		<html lang="es" className={fontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
			<body>
				<script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
				{children}
			</body>
		</html>
	);
}
