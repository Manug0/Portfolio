import { type ProfileId, getProfile } from "@/data/profiles";

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
import { siteConfig } from "@/data";

// Orden de las secciones de cada perfil; el número de cada cabecera sale de su posición
const sections = {
	finanzas: [Grid, Experience, Markets, TechnologyStack, Approach, Education, RecentProjects, Contact],
	tech: [Grid, Experience, RecentProjects, TechnologyStack, Approach, Education, Contact],
};

// Página completa para un perfil. El atributo data-profile cambia la paleta de marca (ver globals.css)
const Portfolio = ({ profileId }: { profileId: ProfileId }) => {
	const profile = getProfile(profileId);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Manuel González García",
		jobTitle: `${profile.role} · ${profile.tagline}`,
		url: siteConfig.url + profile.path,
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
				Saltar al contenido
			</a>
			<Effects />
			<Nav profileId={profileId} />
			<main>
				<Hero profileId={profileId} />
				{sections[profileId].map((Section, position) => (
					<Section key={position} profileId={profileId} index={position + 1} />
				))}
			</main>
			<Footer profileId={profileId} />
		</div>
	);
};

export default Portfolio;
