import { Timeline, type TimelineEntry } from "./ui/Timeline";

import { workExperience } from "@/data";

const Experience = () => {
	const entries: TimelineEntry[] = workExperience.map((job) => ({
		key: job.id,
		marker: (
			<div>
				<p className="text-xl md:text-3xl font-bold text-white">{job.company}</p>
				<p className="mt-1 text-sm md:text-base text-white-200 tabular-nums">{job.period}</p>
			</div>
		),
		content: (
			<article className="glass-card p-6 md:p-8 transition-colors duration-300 hover:border-purple/40">
				<header className="flex flex-wrap items-center gap-3">
					<h3 className="text-lg md:text-2xl font-bold text-white">{job.role}</h3>
					{job.current && (
						<span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-300">
							<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
							Actualidad
						</span>
					)}
				</header>
				<p className="mt-2 text-sm md:text-base text-white-100">{job.summary}</p>
				<ul className="mt-5 space-y-2.5">
					{job.bullets.map((bullet) => (
						<li key={bullet} className="flex gap-3 text-sm md:text-[15px] text-white-200 leading-relaxed">
							<span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-purple" />
							{bullet}
						</li>
					))}
				</ul>
				<ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías y áreas">
					{job.tags.map((tag) => (
						<li
							key={tag}
							className="rounded-full border border-white/[0.1] bg-[#10132E] px-3 py-1 text-xs text-white-100">
							{tag}
						</li>
					))}
				</ul>
			</article>
		),
	}));

	return (
		<section className="pt-20 lg:pt-32 w-full" id="experience" aria-labelledby="experience-title">
			<p className="eyebrow mb-3">Trayectoria</p>
			<h2 id="experience-title" className="heading">
				Mi <span className="text-purple">experiencia</span>
			</h2>
			<p className="mx-auto mt-4 max-w-xl text-center text-white-200 text-sm md:text-base">
				De la economía y los mercados al desarrollo en Salesforce y la arquitectura de datos.
			</p>
			<Timeline data={entries} />
		</section>
	);
};

export default Experience;
