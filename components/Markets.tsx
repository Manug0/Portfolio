"use client";

import { type ProfileId, getProfile } from "@/data/profiles";

import { SectionHeading } from "./ui/SectionHeading";
import { SolanaCover } from "./ui/SolanaCover";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.25 },
	transition: { duration: 0.5, delay },
});

// Sección exclusiva del perfil de finanzas: inversión propia, análisis macro y el bot de liquidez
const Markets = ({ profileId }: { profileId: ProfileId }) => {
	const { markets } = getProfile(profileId);
	if (!markets) return null;
	const { featured } = markets;

	return (
		<section id="markets" className="py-20" aria-labelledby="markets-title">
			<SectionHeading id="markets-title" {...markets} />

			<div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-6">
				<motion.article
					{...fadeUp()}
					className="glass-card group/feat lg:col-span-3 overflow-hidden flex flex-col transition-colors hover:border-brand/40">
					<div className="relative aspect-[16/9] w-full">
						<SolanaCover />
					</div>
					<div className="p-6 md:p-8">
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
							<h3 className="text-xl md:text-2xl font-bold text-white">{featured.title}</h3>
							{featured.badge && (
								<span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[11px] text-brand">
									{featured.badge}
								</span>
							)}
						</div>
						<p className="mt-3 text-sm md:text-base text-white-100 leading-relaxed">{featured.des}</p>
						<ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
							{featured.stack.map((tech) => {
								const Icon = tech.icon;
								return (
									<li
										key={tech.name}
										className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#10132E] px-3 py-1 text-xs text-white-100">
										{Icon && <Icon aria-hidden className="size-4" style={{ color: tech.color }} />}
										{tech.name}
									</li>
								);
							})}
						</ul>
					</div>
				</motion.article>

				<ul className="lg:col-span-2 flex flex-col gap-4">
					{markets.items.map((item, index) => {
						const Icon = item.icon;
						return (
							<motion.li
								key={item.title}
								{...fadeUp(0.1 + index * 0.08)}
								className="glass-card flex-1 flex gap-4 p-6 transition-colors hover:border-brand/40">
								<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand">
									<Icon aria-hidden className="size-6" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white">{item.title}</h3>
									<p className="mt-1.5 text-sm text-white-100 leading-relaxed">{item.des}</p>
								</div>
							</motion.li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default Markets;
