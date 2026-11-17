import { type ProfileId, getProfile, otherProfile } from "@/data/profiles";
import { TbChartAreaLine, TbCode } from "react-icons/tb";

import { CopyEmail } from "./ui/CopyEmail";
import { HiArrowRight } from "react-icons/hi2";
import { MarketChart } from "./ui/MarketChart";
import { ProfileLink } from "./ui/ProfileLink";
import { SectionHeading } from "./ui/SectionHeading";
import { SiSalesforce, SiSolana } from "react-icons/si";

const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

// "Sobre mí": seis tarjetas. Los textos vienen de data/profiles.ts; aquí viven la disposición y los gráficos
const Grid = ({ profileId, index }: { profileId: ProfileId; index: number }) => {
	const profile = getProfile(profileId);
	const other = otherProfile(profileId);
	const isFinance = profileId === "finanzas";
	const [statement, role, tools, crossover, markets, cta] = profile.grid;
	const CrossoverIcon = isFinance ? TbCode : TbChartAreaLine;

	return (
		<section id="about" className="section" aria-label="Sobre mí">
			<div className="wrap">
				<SectionHeading index={index} eyebrow="Sobre mí" />

				<div className="bento mt-8">
					<article className="card bento-card b1" data-spot data-reveal>
						<div aria-hidden className="iso">
							<div className="iso-stage">
								<span className="iso-layer" />
								<span className="iso-layer" />
								<span className="iso-layer" />
							</div>
						</div>
						<p className="kicker relative">{statement.description}</p>
						<h3 className="relative">{statement.title}</h3>
					</article>

					<article className="card bento-card b2" data-spot data-reveal style={delay(80)}>
						<p className="kicker relative z-10">{role.description}</p>
						<h3 className="relative z-10 max-w-[8em]">{role.title}</h3>
						{isFinance ? (
							<MarketChart />
						) : (
							<div aria-hidden className="sf-mark">
								<span className="sf-ring" style={{ "--n": 0 } as React.CSSProperties} />
								<span className="sf-ring" style={{ "--n": 1 } as React.CSSProperties} />
								<span className="sf-ring" style={{ "--n": 2 } as React.CSSProperties} />
								<SiSalesforce className="relative size-16 text-[#00A1E0]" />
							</div>
						)}
					</article>

					<article className="card bento-card b3" data-spot data-reveal style={delay(160)}>
						<p className="kicker">{tools.description}</p>
						<h3 className="max-w-[6em]">{tools.title}</h3>
						<div aria-label="Tecnologías principales" className="stack-cols">
							<div className="stack-col">
								{profile.bentoStack.left.map((item) => (
									<span key={item}>{item}</span>
								))}
								<span aria-hidden />
							</div>
							<div className="stack-col">
								<span aria-hidden />
								{profile.bentoStack.right.map((item) => (
									<span key={item}>{item}</span>
								))}
							</div>
						</div>
					</article>

					{/* La otra mitad del perfil: lleva el color del otro perfil y conduce a él */}
					<ProfileLink target={other.id} className="card bento-card b4 other group" data-spot data-reveal>
						<CrossoverIcon aria-hidden className="crossover-icon" />
						<p className="kicker relative">{crossover.description}</p>
						<h3 className="relative">{crossover.title}</h3>
						<span className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand">
							Ver perfil {other.label.toLowerCase()}
							<HiArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
						</span>
					</ProfileLink>

					<article className="card bento-card b5" data-spot data-reveal style={delay(80)}>
						<p className="kicker relative z-10">{markets.description}</p>
						<h3 className="relative z-10 max-w-[9em]">{markets.title}</h3>
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
						<h3 className="relative">{cta.title}</h3>
						<div className="relative mt-auto pt-6">
							<CopyEmail />
						</div>
					</article>
				</div>
			</div>
		</section>
	);
};

export default Grid;
