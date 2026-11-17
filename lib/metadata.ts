import type { Metadata } from "next";
import type { Profile } from "@/data/profiles";
import { siteConfig } from "@/data";

// Cada perfil tiene su imagen para compartir (public/og-<perfil>.jpg, 1200×630): una captura de su portada
export const buildMetadata = (profile: Profile): Metadata => {
	const image = {
		url: `/og-${profile.id}.jpg`,
		width: 1200,
		height: 630,
		alt: `${siteConfig.name} · ${profile.role}`,
	};

	return {
		title: { absolute: profile.meta.title },
		description: profile.meta.description,
		keywords: [...profile.meta.keywords, "Madrid", siteConfig.name],
		alternates: { canonical: profile.path },
		openGraph: {
			type: "website",
			locale: "es_ES",
			url: siteConfig.url + profile.path,
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
