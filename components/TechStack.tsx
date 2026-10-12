"use client";

import { type ProfileId, getProfile } from "@/data/profiles";

import { InfiniteMarquee } from "./ui/InfiniteMarquee";
import { SectionHeading } from "./ui/SectionHeading";
import { motion } from "framer-motion";

const SpotlightCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
	// Foco de luz que sigue al cursor dentro de la tarjeta (vía variables CSS, sin re-renders)
	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
		event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onMouseMove={handleMouseMove}
			className="glass-card group/spot relative overflow-hidden p-6 md:p-8 transition-colors duration-300 hover:border-brand/40">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
				style={{
					background:
						"radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgb(var(--brand-rgb)/0.12), transparent 70%)",
				}}
			/>
			<div className="relative">{children}</div>
		</motion.div>
	);
};

const TechnologyStack = ({ profileId }: { profileId: ProfileId }) => {
	const { stack } = getProfile(profileId);

	return (
		<section className="py-20" id="tech-stack" aria-labelledby="stack-title">
			<SectionHeading id="stack-title" {...stack} />

			<InfiniteMarquee items={stack.marquee} className="mt-12" />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
				{stack.groups.map((group, index) => (
					<SpotlightCard key={group.title} index={index}>
						<h3 className="text-2xl font-bold text-white">
							<span className="text-brand">{String(index + 1).padStart(2, "0")}.</span> {group.title}
						</h3>
						<p className="mt-2 text-sm text-white-200">{group.description}</p>
						<ul className="mt-6 flex flex-wrap gap-2">
							{group.items.map((item) => {
								const Icon = item.icon;
								return (
									<li
										key={item.name}
										className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#10132E] px-3 py-1.5 text-sm text-white-100 transition-colors hover:border-brand/50 hover:text-white">
										{Icon && <Icon aria-hidden className="size-4" style={{ color: item.color }} />}
										{item.name}
									</li>
								);
							})}
						</ul>
					</SpotlightCard>
				))}
			</div>
		</section>
	);
};

export default TechnologyStack;
