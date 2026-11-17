import { type Locale, type ProfileId, getContent, locales, profilePath, siteConfig } from "@/data";

import type { Metadata } from "next";

const ogLocale: Record<Locale, string> = { es: "es_ES", en: "en_GB" };

// Cada perfil e idioma tiene su imagen para compartir (public/og-<perfil>[-en].jpg, 1200×630): una captura de su portada
export const buildMetadata = (locale: Locale, profileId: ProfileId): Metadata => {
	const profile = getContent(locale).profiles[profileId];
	const path = profilePath(locale, profileId);
	const image = {
		url: `/og-${profileId}${locale === "es" ? "" : `-${locale}`}.jpg`,
		width: 1200,
		height: 630,
		alt: `${siteConfig.name} · ${profile.role}`,
	};

	return {
		title: { absolute: profile.meta.title },
		description: profile.meta.description,
		keywords: [...profile.meta.keywords, "Madrid", siteConfig.name],
		alternates: {
			canonical: path,
			languages: {
				...Object.fromEntries(locales.map((language) => [language, profilePath(language, profileId)])),
				"x-default": profilePath("es", profileId),
			},
		},
		openGraph: {
			type: "website",
			locale: ogLocale[locale],
			url: siteConfig.url + path,
			siteName: siteConfig.name,
			title: profile.meta.title,
			description: profile.meta.description,
			images: [image],
		},
		twitter: {
			card: "summary_large_image",
			title: profile.meta.title,
			description: profile.meta.description,
			images: [image.url],
		},
	};
};
