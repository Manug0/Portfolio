import type { Project, Ui } from "@/data";

import { BotCover } from "./ui/BotCover";
import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";
import { SectionHeading } from "./ui/SectionHeading";
import type { SectionProps } from "./types";
import { cn } from "@/lib/utils";

const ProjectCard = ({ item, delay, ui }: { item: Project; delay: number; ui: Ui }) => {
	const host = item.link ? new URL(item.link).host : undefined;
	const className = "card proj tilt group";
	const style = { "--d": delay } as React.CSSProperties;

	const content = (
		<>
			<div className="tilt-inner">
				<div className={cn("shot", !item.img && "shot--cover")}>
					<div aria-hidden className="shot-glow" />
					{item.img ? (
						<div className="browser">
							<div aria-hidden className="flex items-center gap-1.5 border-b border-line/[0.08] px-3 py-2">
								<span className="size-2 rounded-full bg-red-400/80" />
								<span className="size-2 rounded-full bg-yellow-400/80" />
								<span className="size-2 rounded-full bg-emerald-400/80" />
								<span className="ml-2 flex-1 truncate rounded-md bg-line/[0.06] px-2 py-0.5 text-center font-mono text-[10px] text-muted">
									{host}
								</span>
							</div>
							{/* La captura se muestra prácticamente entera (todas con la misma proporción para que las
							    tarjetas queden alineadas) y a calidad alta para que se vea nítida */}
							<div className="shot-img">
								<Image
									src={item.img.src}
									alt={ui.projects.screenshotAlt(item.title)}
									width={item.img.width}
									height={item.img.height}
									quality={90}
									sizes="(min-width: 1024px) 520px, (min-width: 768px) 46vw, 90vw"
								/>
							</div>
						</div>
					) : (
						<BotCover lines={ui.bot} />
					)}
				</div>
			</div>

			<div className="flex flex-1 flex-col px-3 pb-3 pt-5">
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
					<h3 className="text-xl font-semibold tracking-tight md:text-2xl">{item.title}</h3>
					{item.badge && <span className="badge">{item.badge}</span>}
				</div>
				<p className="mt-2 leading-relaxed text-muted">{item.des}</p>

				<div className="mt-auto flex items-center justify-between gap-4 pt-6">
					<ul className="flex items-center -space-x-2" aria-label={ui.projects.stackLabel}>
						{item.stack.map((tech) => {
							const Icon = tech.icon;
							return (
								<li
									key={tech.name}
									title={tech.name}
									className="flex size-9 items-center justify-center rounded-full border border-line/15 bg-ink">
									{Icon && <Icon aria-hidden className="size-4" style={{ color: tech.color }} />}
									<span className="sr-only">{tech.name}</span>
								</li>
							);
						})}
					</ul>
					{item.link && (
						<span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-brand">
							{ui.projects.visit}
							<HiArrowUpRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</span>
					)}
				</div>
			</div>
		</>
	);

	return item.link ? (
		<a
			href={item.link}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={ui.projects.visitAria(item.title)}
			className={className}
			style={style}
			data-spot
			data-tilt
			data-reveal>
			{content}
		</a>
	) : (
		<div className={className} style={style} data-spot data-tilt data-reveal>
			{content}
		</div>
	);
};

const RecentProjects = ({ content, profileId, index }: SectionProps) => {
	const { projects } = content.profiles[profileId];

	return (
		<section id="projects" className="section" aria-labelledby="projects-title">
			<div className="wrap">
				<SectionHeading id="projects-title" index={index} {...projects} />
				<ul
					className={cn(
						"mt-12 grid grid-cols-1 gap-5 md:grid-cols-2",
						projects.items.length % 3 === 0 && "lg:grid-cols-3"
					)}>
					{projects.items.map((item, itemIndex) => (
						<li key={item.id}>
							<ProjectCard item={item} delay={(itemIndex % 3) * 90} ui={content.ui} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default RecentProjects;
