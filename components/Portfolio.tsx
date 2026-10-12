import { type ProfileId, getProfile } from "@/data/profiles";

import Approach from "./Approach";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import { FloatingNav } from "./ui/FloatingNav";
import Footer from "./Footer";
import Grid from "./Grid";
import Hero from "./Hero";
import Markets from "./Markets";
import { ProfileFlash } from "./ui/ProfileFlash";
import RecentProjects from "./RecentProjects";
import TechnologyStack from "./TechStack";
import { siteConfig } from "@/data";

// Página completa para un perfil. El atributo data-profile cambia la paleta de marca (ver globals.css)
const Portfolio = ({ profileId }: { profileId: ProfileId }) => {
	const profile = getProfile(profileId);
	const isFinance = profileId === "finanzas";

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
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[6000] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-black-100">
				Saltar al contenido
			</a>
			<ProfileFlash />
			<FloatingNav profileId={profileId} />
			<main className="relative bg-black-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5">
				<div className="max-w-7xl w-full">
					<Hero profileId={profileId} />
					<Grid profileId={profileId} />
					<Experience profileId={profileId} />
					{isFinance && <Markets profileId={profileId} />}
					{!isFinance && <RecentProjects profileId={profileId} />}
					<TechnologyStack profileId={profileId} />
					<Approach profileId={profileId} />
					<Education profileId={profileId} />
					{isFinance && <RecentProjects profileId={profileId} />}
					<Contact profileId={profileId} />
					<Footer profileId={profileId} />
				</div>
			</main>
		</div>
	);
};

export default Portfolio;
