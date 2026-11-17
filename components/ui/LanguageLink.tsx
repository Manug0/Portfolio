"use client";

import type { Locale } from "@/data/site";
import { currentSectionHash } from "@/lib/profile-switch";

export type LanguageTarget = { href: string; locale: Locale; code: string; label: string };

// Enlace a la misma página en el otro idioma. Cada idioma tiene su layout raíz (para que <html lang> sea
// correcto), así que es una navegación completa; si el lector ya ha bajado, aterriza en la misma sección.
export const LanguageLink = ({
	target,
	className,
	children,
}: {
	target: LanguageTarget;
	className?: string;
	children: React.ReactNode;
}) => (
	// Enlace normal (no <Link>): al cambiar de layout raíz la navegación tiene que recargar la página
	<a
		href={target.href}
		hrefLang={target.locale}
		lang={target.locale}
		aria-label={target.label}
		title={target.label}
		className={className}
		onClick={(event) => {
			const hash = currentSectionHash();
			if (!hash || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			event.preventDefault();
			window.location.assign(target.href + hash);
		}}>
		{children}
	</a>
);
