"use client";

import { HiOutlineAcademicCap, HiOutlineDocumentArrowDown, HiOutlineEye } from "react-icons/hi2";
import { certifications, education, languages, siteConfig } from "@/data";

import { Button as MovingBorderCard } from "./ui/MovingBorders";
import Image from "next/image";
import { SiSalesforce } from "react-icons/si";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.3 },
	transition: { duration: 0.5, delay },
});

const Education = () => {
	return (
		<section id="education" className="py-20" aria-labelledby="education-title">
			<p className="eyebrow mb-3">Formación</p>
			<h2 id="education-title" className="heading">
				Formación y <span className="text-purple">certificaciones</span>
			</h2>

			<div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-6">
				<ol className="lg:col-span-3 flex flex-col gap-4">
					{education.map((item, index) => (
						<motion.li
							key={item.id}
							{...fadeUp(index * 0.08)}
							className="glass-card flex gap-4 md:gap-6 p-6 transition-colors hover:border-purple/40">
							<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-purple/30 bg-purple/10 text-purple">
								<HiOutlineAcademicCap aria-hidden className="size-6" />
							</div>
							<div>
								<p className="text-xs text-white-200 tabular-nums">{item.period}</p>
								<h3 className="mt-1 text-lg md:text-xl font-bold text-white">{item.title}</h3>
								<p className="text-sm text-purple">{item.school}</p>
								<p className="mt-2 text-sm text-white-100 leading-relaxed">{item.des}</p>
							</div>
						</motion.li>
					))}
				</ol>

				<div className="lg:col-span-2 flex flex-col gap-4">
					{certifications.map((cert) => (
						<motion.div key={cert.id} {...fadeUp(0.1)}>
							<MovingBorderCard
								as="div"
								duration={9000}
								borderRadius="1.5rem"
								containerClassName="w-full"
								className="justify-start gap-4 p-6 bg-[linear-gradient(90deg,rgba(4,7,29,1)_0%,rgba(12,14,35,1)_100%)]">
								<div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#00A1E0]/15">
									<SiSalesforce aria-hidden className="size-9 text-[#00A1E0]" />
								</div>
								<div className="text-left">
									<p className="text-xs uppercase tracking-widest text-white-200">Certificación</p>
									<h3 className="text-lg md:text-xl font-bold text-white">{cert.title}</h3>
									<p className="text-sm text-purple">{cert.issuer}</p>
								</div>
							</MovingBorderCard>
						</motion.div>
					))}

					<motion.div {...fadeUp(0.15)} className="glass-card p-6">
						<h3 className="text-xs uppercase tracking-widest text-white-200">Idiomas</h3>
						<ul className="mt-3 flex flex-wrap gap-3">
							{languages.map((lang) => (
								<li
									key={lang.name}
									className="flex-1 min-w-32 rounded-2xl border border-white/[0.08] bg-[#10132E] px-4 py-3">
									<p className="font-semibold text-white">{lang.name}</p>
									<p className="text-sm text-white-200">{lang.level}</p>
								</li>
							))}
						</ul>
					</motion.div>

					<motion.div
						{...fadeUp(0.2)}
						id="cv"
						className="glass-card group/cv relative overflow-hidden p-6 flex gap-5 items-center">
						<a
							href={siteConfig.cv}
							target="_blank"
							rel="noopener noreferrer"
							className="relative block w-24 md:w-28 shrink-0 -rotate-6 transition-transform duration-300 group-hover/cv:rotate-0 group-hover/cv:scale-105"
							aria-label="Ver el CV en PDF (se abre en una pestaña nueva)">
							<Image
								src="/cv-preview.jpg"
								alt=""
								width={224}
								height={317}
								className="rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
							/>
						</a>
						<div>
							<h3 className="text-lg md:text-xl font-bold text-white">Mi CV</h3>
							<p className="mt-1 text-sm text-white-200">Todo lo anterior, en dos páginas.</p>
							<div className="mt-4 flex flex-wrap gap-2">
								<a
									href={siteConfig.cv}
									download
									className="inline-flex items-center gap-1.5 rounded-lg bg-purple px-3 py-2 text-sm font-semibold text-black-100 transition hover:bg-[#E2CBFF]">
									<HiOutlineDocumentArrowDown aria-hidden className="size-4" />
									Descargar
								</a>
								<a
									href={siteConfig.cv}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.15] px-3 py-2 text-sm text-white transition hover:border-purple/60">
									<HiOutlineEye aria-hidden className="size-4" />
									Ver online
								</a>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Education;
