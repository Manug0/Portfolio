import { type ProfileId, getProfile } from "@/data/profiles";

import { SectionHeading } from "./ui/SectionHeading";

const Approach = ({ profileId, index }: { profileId: ProfileId; index: number }) => {
	const { approach } = getProfile(profileId);

	return (
		<section id="approach" className="section" aria-labelledby="approach-title">
			<div className="wrap">
				<SectionHeading id="approach-title" index={index} {...approach} />

				<ol className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
					{approach.phases.map((phase, phaseIndex) => (
						<li
							key={phase.title}
							className="relative"
							data-reveal
							style={{ "--d": phaseIndex * 110 } as React.CSSProperties}>
							<article className="card phase h-full" data-spot>
								<div aria-hidden className="phase-dots" />
								<span aria-hidden className="phase-num">
									{phaseIndex + 1}
								</span>
								<p className="badge relative">Fase {phaseIndex + 1}</p>
								<h3 className="relative mt-14 text-2xl font-semibold tracking-tight">{phase.title}</h3>
								<p className="relative mt-3 leading-relaxed text-muted">{phase.des}</p>
							</article>
							{phaseIndex < approach.phases.length - 1 && <span aria-hidden className="phase-link" />}
						</li>
					))}
				</ol>
			</div>
		</section>
	);
};

export default Approach;
