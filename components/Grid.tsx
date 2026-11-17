import { TbChartAreaLine, TbCode } from "react-icons/tb";
import { otherProfileId, profilePath } from "@/data";

import { CopyEmail } from "./ui/CopyEmail";
import { HiArrowRight } from "react-icons/hi2";
import { MarketChart } from "./ui/MarketChart";
import { ProfileLink } from "./ui/ProfileLink";
import { SectionHeading } from "./ui/SectionHeading";
import type { SectionProps } from "./types";
import { SiSolana } from "react-icons/si";
import { siteConfig } from "@/data/site";

const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

// "Sobre mí": seis tarjetas. Los textos vienen de data/; aquí viven la disposición y los gráficos
const Grid = ({ content, profileId, index }: SectionProps) => {
	const { ui } = content;
	const { about } = content.profiles[profileId];
	const other = content.profiles[otherProfileId(profileId)];
	const isFinance = profileId === "finanzas";
	const CrossoverIcon = isFinance ? TbCode : TbChartAreaLine;
	// Con icono, los roles van en lista (tech); sin él, un titular con el gráfico (finanzas)
	const listRoles = about.roles.some((role) => role.icon);

	return (
		<section id="about" className="section" aria-label={ui.about.eyebrow}>
			<div className="wrap">
				<SectionHeading index={index} eyebrow={ui.about.eyebrow} />

				<div className="bento mt-8">
					<article className="card bento-card b1" data-spot data-reveal>
						<div aria-hidden className="iso">
							<div className="iso-stage">
								<span className="iso-layer" />
								<span className="iso-layer" />
								<span className="iso-layer" />
							</div>
						</div>
						<p className="kicker relative">{about.statement.description}</p>
						<h3 className="relative">{about.statement.title}</h3>
					</article>

					<article className="card bento-card b2" data-spot data-reveal style={delay(80)}>
						{listRoles ? (
							<ul className="roles">
								{about.roles.map((role) => {
									const Icon = role.icon;
									return (
										<li key={role.title} className="role">
											{Icon && (
												<span aria-hidden className="role-icon" style={{ color: role.color }}>
													<Icon />
												</span>
											)}
											<div>
												<h3>{role.title}</h3>
												<p className="kicker">{role.description}</p>
											</div>
										</li>
									);
								})}
							</ul>
						) : (
							<>
								<p className="kicker relative z-10">{about.roles[0].description}</p>
								<h3 className="relative z-10 max-w-[8em]">{about.roles[0].title}</h3>
								<MarketChart />
							</>
						)}
					</article>

					<article className="card bento-card b3" data-spot data-reveal style={delay(160)}>
						<div className="tools">
							<div>
								<p className="kicker">{about.tools.description}</p>
								<h3 className="max-w-[7em]">{about.tools.title}</h3>
							</div>
							<ul aria-label={ui.about.mainTech} className="tool-rows">
								{about.tools.rows.map((row) => (
									<li key={row.join()} className="tool-row">
										{row.map((item) => (
											<span key={item}>{item}</span>
										))}
									</li>
								))}
							</ul>
						</div>
					</article>

					{/* La otra mitad del perfil: lleva el color del otro perfil y conduce a él */}
					<ProfileLink
						profile={{ id: other.id, href: profilePath(content.locale, other.id) }}
						className="card bento-card b4 other group"
						data-spot
						data-reveal>
						<CrossoverIcon aria-hidden className="crossover-icon" />
						<p className="kicker relative">{about.crossover.description}</p>
						<h3 className="relative">{about.crossover.title}</h3>
						<span className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand">
							{ui.viewProfile(other.label)}
							<HiArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
						</span>
					</ProfileLink>

					<article className="card bento-card b5" data-spot data-reveal style={delay(80)}>
						<p className="kicker relative z-10">{about.markets.description}</p>
						<h3 className="relative z-10 max-w-[9em]">{about.markets.title}</h3>
						<div aria-hidden className="tokens">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/bitcoin-btc-logo.svg" alt="" loading="lazy" className="token token-btc" />
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/ethereum-eth-logo.svg"
								alt=""
								loading="lazy"
								className="token token-eth"
								style={{ "--n": 1 } as React.CSSProperties}
							/>
							<span className="token token-sol" style={{ "--n": 2 } as React.CSSProperties}>
								<SiSolana className="size-1/2 text-ink" />
							</span>
						</div>
					</article>

					<article className="card bento-card b6" data-reveal style={delay(160)}>
						<div aria-hidden className="cta-glow" />
						<h3 className="relative">{about.cta.title}</h3>
						<div className="relative mt-auto pt-6">
							<CopyEmail email={siteConfig.email} labels={ui.copyEmail} />
						</div>
					</article>
				</div>
			</div>
		</section>
	);
};

export default Grid;
