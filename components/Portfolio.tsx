import { type Locale, type ProfileId, getContent, locales, profileIds, profilePath, siteConfig } from "@/data";

import Approach from "./Approach";
import Contact from "./Contact";
import Education from "./Education";
import { Effects } from "./ui/Effects";
import Experience from "./Experience";
import Footer from "./Footer";
import Grid from "./Grid";
import Hero from "./Hero";
import Markets from "./Markets";
import { Nav } from "./ui/Nav";
import RecentProjects from "./RecentProjects";
import TechnologyStack from "./TechStack";

// Orden de las secciones de cada perfil; el número de cada cabecera sale de su posición
const sections = {
	finanzas: [Grid, Experience, Markets, TechnologyStack, Approach, Education, RecentProjects, Contact],
	tech: [Grid, Experience, RecentProjects, TechnologyStack, Approach, Education, Contact],
};

// Página completa para un perfil y un idioma. El atributo data-profile cambia la paleta de marca (ver globals.css)
const Portfolio = ({ locale, profileId }: { locale: Locale; profileId: ProfileId }) => {
	const content = getContent(locale);
	const profile = content.profiles[profileId];
	const { ui } = content;

	// Datos mínimos que necesitan las piezas interactivas (no se les pasa el contenido entero)
	const options = profileIds.map((id) => ({
		id,
		label: content.profiles[id].label,
		sublabel: content.profiles[id].sublabel,
		href: profilePath(locale, id),
	}));
	const languageNames = { es: "Español", en: "English" };
	const languages = locales.map((language) => ({
		locale: language,
		code: language.toUpperCase(),
		name: languageNames[language],
		href: profilePath(language, profileId),
	}));
	const controls = { locale, languages, labels: { language: ui.language, theme: ui.theme } };

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Manuel González García",
		jobTitle: `${profile.role} · ${profile.tagline}`,
		url: siteConfig.url + profilePath(locale, profileId),
		email: `mailto:${siteConfig.email}`,
		address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
		sameAs: [siteConfig.github, siteConfig.linkedin],
		knowsAbout: profile.meta.keywords,
	};

	return (
		<div data-profile={profileId}>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<a
				href="#about"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-ink">
				{ui.skip}
			</a>
			<Effects />
			<Nav
				current={profileId}
				locale={locale}
				items={profile.nav}
				options={options}
				languages={languages}
				labels={{
					nav: ui.navLabel,
					chooseProfile: ui.chooseProfile,
					theme: ui.theme,
					language: ui.language,
					backToTop: ui.backToTop,
				}}
			/>
			<main>
				<Hero content={content} profileId={profileId} options={options} controls={controls} />
				{sections[profileId].map((Section, position) => (
					<Section key={position} content={content} profileId={profileId} index={position + 1} />
				))}
			</main>
			<Footer content={content} profileId={profileId} />
		</div>
	);
};

export default Portfolio;
