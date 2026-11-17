import { type Content, type ProfileId, otherProfileId, profilePath, siteConfig } from "@/data";
import { HiArrowDownRight, HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { ProfileSwitch, type SwitchOption } from "./ui/ProfileSwitch";

import { Fragment } from "react";
import { type LanguageTarget, LanguageLink } from "./ui/LanguageLink";
import { ThemeToggle } from "./ui/ThemeToggle";
import { HeroArt } from "./ui/HeroArt";
import Image from "next/image";

const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const Hero = ({
	content,
	profileId,
	options,
	language,
}: {
	content: Content;
	profileId: ProfileId;
	options: SwitchOption[];
	language: LanguageTarget;
}) => {
	const { ui } = content;
	const profile = content.profiles[profileId];
	const other = content.profiles[otherProfileId(profileId)];
	const words = profile.headline.split(" ");

	return (
		<section id="top" className="hero" aria-labelledby="hero-title">
			<div aria-hidden className="hero-bg" />
			<div aria-hidden className="hero-grid" />

			<div className="wrap hero-inner">
				{/* Quién soy y, al lado, las dos vistas: lo primero que se entiende es que hay dos perfiles */}
				<div className="hero-head">
					<div className="hero-id enter" style={delay(60)}>
						<span className="avatar">
							<Image src="/profile.png" alt={ui.hero.photoAlt} width={112} height={112} priority />
						</span>
						<div>
							<h1 id="hero-title" className="text-lg font-semibold leading-tight tracking-tight sm:text-xl">
								{siteConfig.name}
								<span className="sr-only">, {profile.role}</span>
							</h1>
							<p className="mt-1 flex items-center gap-2 font-mono text-xs text-muted">
								<span aria-hidden className="live-dot" />
								{content.location}
							</p>
						</div>
						{/* En móvil, idioma y tema van aquí arriba; al bajar pasan a la barra flotante */}
						<div className="utils hero-utils sm:hidden">
							<LanguageLink target={language} className="nav-lang">
								{language.code}
							</LanguageLink>
							<ThemeToggle label={ui.theme} />
						</div>
					</div>
					<span aria-hidden className="hero-head-rule enter" style={delay(100)} />
					<div className="enter flex w-full justify-center lg:w-auto" style={delay(140)}>
						<ProfileSwitch current={profileId} options={options} label={ui.chooseProfile} variant="hero" />
					</div>
				</div>

				<p className="eyebrow enter mt-9 max-w-xl text-balance leading-relaxed lg:mt-10" style={delay(220)}>
					{profile.role} • {profile.tagline}
				</p>

				<p className="display mt-4 max-w-[15em]">
					{words.map((word, index) => (
						<Fragment key={word + index}>
							<span className="w">
								<span
									className={index >= profile.highlightFrom ? "hl" : undefined}
									style={{ "--i": index } as React.CSSProperties}>
									{word}
								</span>
							</span>{" "}
						</Fragment>
					))}
				</p>

				<p className="enter mt-6 max-w-[46rem] text-base leading-relaxed text-muted sm:text-lg" style={delay(720)}>
					{ui.hero.greeting} <strong className="font-semibold text-fg">{siteConfig.shortName}</strong>, {profile.intro}
				</p>

				<div className="enter mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row" style={delay(840)}>
					<a href={profile.primaryCta.href} className="btn btn-primary w-full sm:w-auto">
						{profile.primaryCta.title}
						<HiArrowDownRight aria-hidden className="btn-icon size-4" />
					</a>
					<a href={profile.cv.file} download className="btn btn-ghost w-full sm:w-auto">
						<HiOutlineDocumentArrowDown aria-hidden className="size-5" />
						{ui.hero.download(profile.cv.label)}
					</a>
				</div>
			</div>

			<HeroArt
				profileId={profileId}
				other={{ id: other.id, href: profilePath(content.locale, other.id) }}
				label={ui.viewProfileAria(other.label)}
			/>

			<div className="wrap pb-14">
				<dl className="stats enter" style={delay(980)}>
					{profile.stats.map((stat) => (
						<div key={stat.label} className="stat">
							<dt>{stat.label}</dt>
							<dd>{stat.value}</dd>
						</div>
					))}
				</dl>
			</div>
			<div aria-hidden className="hero-fade" />
		</section>
	);
};

export default Hero;
