import type { Metadata } from "next";
import type { Profile } from "@/data/profiles";
import { siteConfig } from "@/data";

export const buildMetadata = (profile: Profile): Metadata => ({
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
		images: [{ url: "/b1.png", alt: siteConfig.name }],
	},
	twitter: {
		card: "summary_large_image",
		title: profile.meta.title,
		description: profile.meta.description,
		images: ["/b1.png"],
	},
});
