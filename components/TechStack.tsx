import { Marquee } from "./ui/Marquee";
import { SectionHeading } from "./ui/SectionHeading";
import type { SectionProps } from "./types";

const TechnologyStack = ({ content, profileId, index }: SectionProps) => {
	const { stack } = content.profiles[profileId];

	return (
		<section id="tech-stack" className="section" aria-labelledby="stack-title">
			<div className="wrap">
				<SectionHeading id="stack-title" index={index} {...stack} />
			</div>

			<Marquee items={stack.marquee} className="mt-12" />

			<div className="wrap mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
				{stack.groups.map((group, groupIndex) => (
					<article
						key={group.title}
						className="card p-6 md:p-8"
						data-spot
						data-reveal
						style={{ "--d": groupIndex * 90 } as React.CSSProperties}>
						<h3 className="text-2xl font-semibold tracking-tight">
							<span className="mr-1 font-mono text-base font-medium text-brand">
								{String(groupIndex + 1).padStart(2, "0")}.
							</span>{" "}
							{group.title}
						</h3>
						<p className="mt-2 text-sm text-muted">{group.description}</p>
						<ul className="mt-6 flex flex-wrap gap-2">
							{group.items.map((item) => {
								const Icon = item.icon;
								return (
									<li key={item.name} className="chip px-3 py-1.5 text-sm">
										{Icon && <Icon aria-hidden className="size-4" style={{ color: item.color }} />}
										{item.name}
									</li>
								);
							})}
						</ul>
					</article>
				))}
			</div>
		</section>
	);
};

export default TechnologyStack;
