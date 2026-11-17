import { SectionHeading } from "./ui/SectionHeading";
import type { SectionProps } from "./types";

// Línea de tiempo: la barra se rellena con el scroll (ver components/ui/Effects.tsx)
const Experience = ({ content, profileId, index }: SectionProps) => {
	const { ui } = content;
	const profile = content.profiles[profileId];

	return (
		<section id="experience" className="section" aria-labelledby="experience-title">
			<div className="wrap">
				<SectionHeading
					id="experience-title"
					index={index}
					eyebrow={ui.experience.eyebrow}
					title={ui.experience.title}
					highlight={ui.experience.highlight}
					intro={profile.experienceIntro}
				/>

				<div className="tl" data-timeline>
					<div aria-hidden className="tl-rail">
						<div className="tl-fill" />
						<div className="tl-head" />
					</div>
					<ol>
						{profile.experience.map((job) => (
							<li key={job.id} className="tl-item">
								<span aria-hidden className="tl-dot" />
								<div className="tl-marker">
									<p className="tl-company">{job.company}</p>
									<p className="mt-1.5 font-mono text-xs tabular-nums text-muted">{job.period}</p>
								</div>

								<article className="card p-6 md:p-8" data-spot data-reveal>
									<header className="flex flex-wrap items-center gap-3">
										<h3 className="text-xl font-semibold tracking-tight md:text-2xl">{job.role}</h3>
										{job.current && (
											<span className="badge badge-live">
												<span aria-hidden className="live-dot" />
												{ui.experience.current}
											</span>
										)}
									</header>
									<p className="mt-2 text-muted">{job.summary}</p>
									<ul className="mt-5 space-y-2.5">
										{job.bullets.map((bullet) => (
											<li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-fg/80">
												<span aria-hidden className="mt-[0.72em] h-px w-3 shrink-0 bg-brand" />
												{bullet}
											</li>
										))}
									</ul>
									<ul className="mt-6 flex flex-wrap gap-2" aria-label={ui.experience.tagsLabel}>
										{job.tags.map((tag) => (
											<li key={tag} className="chip">
												{tag}
											</li>
										))}
									</ul>
								</article>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
};

export default Experience;
