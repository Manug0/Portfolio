import { BotCover } from "./ui/BotCover";
import { SectionHeading } from "./ui/SectionHeading";
import type { SectionProps } from "./types";

const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

// Sección exclusiva del perfil de finanzas: inversión propia, análisis macro y el bot de liquidez
const Markets = ({ content, profileId, index }: SectionProps) => {
	const { ui } = content;
	const { markets } = content.profiles[profileId];
	if (!markets) return null;
	const { featured } = markets;

	return (
		<section id="markets" className="section" aria-labelledby="markets-title">
			<div className="wrap">
				<SectionHeading id="markets-title" index={index} {...markets} />

				<div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-5">
					<article className="card flex flex-col overflow-hidden lg:col-span-3" data-spot data-reveal>
						<div className="relative aspect-[16/9] w-full">
							<BotCover lines={ui.bot} />
						</div>
						<div className="p-6 md:p-8">
							<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
								<h3 className="text-xl font-semibold tracking-tight md:text-2xl">{featured.title}</h3>
								{featured.badge && <span className="badge">{featured.badge}</span>}
							</div>
							<p className="mt-3 leading-relaxed text-muted">{featured.des}</p>
							<ul className="mt-5 flex flex-wrap gap-2" aria-label={ui.projects.stackLabel}>
								{featured.stack.map((tech) => {
									const Icon = tech.icon;
									return (
										<li key={tech.name} className="chip">
											{Icon && <Icon aria-hidden className="size-4" style={{ color: tech.color }} />}
											{tech.name}
										</li>
									);
								})}
							</ul>
						</div>
					</article>

					<ul className="flex flex-col gap-5 lg:col-span-2">
						{markets.items.map((item, itemIndex) => {
							const Icon = item.icon;
							return (
								<li
									key={item.title}
									className="card flex flex-1 gap-4 p-6"
									data-spot
									data-reveal
									style={delay(80 + itemIndex * 80)}>
									<div className="icon-tile">
										<Icon aria-hidden className="size-6" />
									</div>
									<div>
										<h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
										<p className="mt-1.5 text-sm leading-relaxed text-muted">{item.des}</p>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Markets;
