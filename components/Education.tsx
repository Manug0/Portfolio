import { HiOutlineAcademicCap, HiOutlineDocumentArrowDown, HiOutlineEye } from "react-icons/hi2";

import Image from "next/image";
import { SectionHeading } from "./ui/SectionHeading";
import type { SectionProps } from "./types";
import { SiSalesforce } from "react-icons/si";
import { otherProfileId } from "@/data/site";

const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const Education = ({ content, profileId, index }: SectionProps) => {
	const { ui, education, certifications, languages } = content;
	const { cv } = content.profiles[profileId];
	const other = content.profiles[otherProfileId(profileId)];
	const copy = ui.education;

	return (
		<section id="education" className="section" aria-labelledby="education-title">
			<div className="wrap">
				<SectionHeading
					id="education-title"
					index={index}
					eyebrow={copy.eyebrow}
					title={copy.title}
					highlight={copy.highlight}
				/>

				<div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-5">
					<ol className="flex flex-col gap-5 lg:col-span-3">
						{education.map((item, itemIndex) => (
							<li
								key={item.id}
								className="card flex flex-1 gap-4 p-6 md:gap-6"
								data-spot
								data-reveal
								style={delay(itemIndex * 80)}>
								<div className="icon-tile">
									<HiOutlineAcademicCap aria-hidden className="size-6" />
								</div>
								<div>
									<p className="font-mono text-xs tabular-nums text-muted">{item.period}</p>
									<h3 className="mt-1 text-lg font-semibold tracking-tight md:text-xl">{item.title}</h3>
									<p className="text-sm text-brand">{item.school}</p>
									<p className="mt-2 text-sm leading-relaxed text-muted">{item.des}</p>
								</div>
							</li>
						))}
					</ol>

					<div className="flex flex-col gap-5 lg:col-span-2">
						{certifications.map((cert) => (
							<div key={cert.id} className="orbit" data-reveal style={delay(80)}>
								<div className="flex items-center gap-4 bg-ink-2 p-6">
									<div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#00A1E0]/15">
										<SiSalesforce aria-hidden className="size-9 text-[#00A1E0]" />
									</div>
									<div>
										<p className="eyebrow !text-[0.66rem]">{copy.certification}</p>
										<h3 className="mt-1 text-lg font-semibold tracking-tight md:text-xl">{cert.title}</h3>
										<p className="text-sm text-brand">{cert.issuer}</p>
									</div>
								</div>
							</div>
						))}

						<div className="card p-6" data-reveal style={delay(140)}>
							<h3 className="eyebrow !text-[0.66rem]">{copy.languages}</h3>
							<ul className="mt-3 flex flex-wrap gap-3">
								{languages.map((language) => (
									<li
										key={language.name}
										className="min-w-32 flex-1 rounded-2xl border border-line/[0.08] bg-ink/60 px-4 py-3">
										<p className="font-semibold">{language.name}</p>
										<p className="text-sm text-muted">{language.level}</p>
									</li>
								))}
							</ul>
						</div>

						<div id="cv" className="card group flex flex-1 items-center gap-5 overflow-hidden p-6" data-spot data-reveal style={delay(200)}>
							<a
								href={cv.file}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={copy.viewCvAria}
								className="relative block w-24 shrink-0 -rotate-6 transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-105 md:w-28">
								<Image
									src={cv.preview}
									alt=""
									width={224}
									height={317}
									className="cv-thumb"
								/>
							</a>
							<div>
								<h3 className="text-lg font-semibold tracking-tight md:text-xl">{cv.label}</h3>
								<p className="mt-1 text-sm text-muted">{copy.cvNote}</p>
								<div className="mt-4 flex flex-wrap gap-2">
									<a href={cv.file} download className="btn btn-primary h-10 px-4 text-sm">
										<HiOutlineDocumentArrowDown aria-hidden className="size-4" />
										{copy.download}
									</a>
									<a
										href={cv.file}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-ghost h-10 px-4 text-sm">
										<HiOutlineEye aria-hidden className="size-4" />
										{copy.viewOnline}
									</a>
								</div>
								<a
									href={other.cv.file}
									download
									className="mt-3 inline-flex items-center gap-1 text-xs text-muted underline-offset-4 transition hover:text-fg hover:underline">
									<HiOutlineDocumentArrowDown aria-hidden className="size-3.5 shrink-0" />
									{copy.otherCv(other.label, other.cv.label)}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Education;
