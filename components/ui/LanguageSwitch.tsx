"use client";

import Link from "next/link";
import type { Locale } from "@/data/site";
import { cn } from "@/lib/utils";
import { switchLanguage } from "@/lib/profile-switch";
import { useRouter } from "next/navigation";

export type LanguageOption = { locale: Locale; code: string; name: string; href: string };

// Selector de idioma: los dos códigos a la vista, con el activo marcado (sin banderas: una bandera
// representa un país, no un idioma). Cambia sin recargar y mantiene al lector en el mismo punto.
export const LanguageSwitch = ({
	current,
	options,
	label,
	className,
}: {
	current: Locale;
	options: LanguageOption[];
	/** Nombre accesible del grupo ("Idioma") */
	label: string;
	className?: string;
}) => {
	const router = useRouter();

	return (
		<div role="group" aria-label={label} className={cn("lang", className)}>
			{options.map((option) =>
				option.locale === current ? (
					<span key={option.locale} lang={option.locale} aria-current="true" title={option.name} className="lang-opt">
						{option.code}
					</span>
				) : (
					<Link
						key={option.locale}
						href={option.href}
						hrefLang={option.locale}
						lang={option.locale}
						title={option.name}
						aria-label={option.name}
						className="lang-opt"
						onClick={(event) => {
							if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
							event.preventDefault();
							switchLanguage(router, option.href, event.currentTarget.parentElement ?? event.currentTarget);
						}}>
						{option.code}
					</Link>
				)
			)}
		</div>
	);
};
