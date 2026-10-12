"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { PinContainer } from "./ui/3d-pin";
import type { Project } from "@/data";
import { type ProfileId, getProfile } from "@/data/profiles";
import { SectionHeading } from "./ui/SectionHeading";
import { SolanaCover } from "./ui/SolanaCover";

const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
	<div className="absolute inset-x-[5%] top-[8%] bottom-0 z-10 flex flex-col overflow-hidden rounded-t-xl border border-b-0 border-white/[0.12] bg-[#0B0D24] shadow-[0_-10px_40px_rgb(var(--brand-deep-rgb)/0.35)]">
		<div aria-hidden className="flex items-center gap-1.5 border-b border-white/[0.08] px-3 py-2">
			<span className="size-2 rounded-full bg-red-400/80" />
			<span className="size-2 rounded-full bg-yellow-400/80" />
			<span className="size-2 rounded-full bg-emerald-400/80" />
			<span className="ml-2 flex-1 truncate rounded-md bg-white/[0.06] px-2 py-0.5 text-center text-[10px] text-white-200">
				{url}
			</span>
		</div>
		<div className="relative flex-1">{children}</div>
	</div>
);

export const ProjectCard = ({ item }: { item: Project }) => {
	const host = item.link ? new URL(item.link).host : item.badge;

	return (
		<PinContainer
			title={host}
			href={item.link}
			target="_blank"
			ariaLabel={item.link ? `Visitar ${item.title} (se abre en una pestaña nueva)` : undefined}>
			<div className="relative flex items-center justify-center sm:w-[480px] w-[78vw] overflow-hidden aspect-[3/2] mb-8 rounded-2xl lg:rounded-3xl bg-[#13162D]">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/bg.png" alt="" aria-hidden className="brand-tint absolute inset-0 h-full w-full object-cover" />
				{item.img ? (
					<BrowserFrame url={host ?? ""}>
						<Image
							src={item.img}
							alt={`Captura de ${item.title}`}
							fill
							sizes="(min-width: 640px) 440px, 72vw"
							className="object-cover object-top transition-transform duration-700 group-hover/pin:scale-[1.03]"
						/>
					</BrowserFrame>
				) : (
					<SolanaCover />
				)}
			</div>

			<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
				<h3 className="font-bold lg:text-2xl md:text-xl text-base">{item.title}</h3>
				{item.badge && (
					<span className="shrink-0 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[11px] text-brand">
						{item.badge}
					</span>
				)}
			</div>

			<p className="mt-2 lg:text-lg font-light text-sm line-clamp-4 sm:line-clamp-3 text-white-100 sm:w-[480px] w-[78vw]">
				{item.des}
			</p>

			<div className="flex items-center justify-between mt-6 mb-1">
				<ul className="flex items-center" aria-label="Tecnologías utilizadas">
					{item.stack.map((tech, index) => {
						const Icon = tech.icon;
						return (
							<li
								key={tech.name}
								title={tech.name}
								className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
								style={{ transform: `translateX(-${5 * index + 2}px)` }}>
								{Icon && <Icon aria-hidden className="size-4 lg:size-5" style={{ color: tech.color }} />}
								<span className="sr-only">{tech.name}</span>
							</li>
						);
					})}
				</ul>

				{item.link && (
					<span className="flex items-center text-sm lg:text-lg text-brand">
						Visitar web
						<FaLocationArrow aria-hidden className="ms-2 transition-transform group-hover/pin:translate-x-1" />
					</span>
				)}
			</div>
		</PinContainer>
	);
};

const RecentProjects = ({ profileId }: { profileId: ProfileId }) => {
	const { projects } = getProfile(profileId);

	return (
		<section className="py-20" id="projects" aria-labelledby="projects-title">
			<SectionHeading id="projects-title" {...projects} />
			<div className="flex flex-wrap items-center justify-center p-4 gap-x-16 gap-y-12 mt-10">
				{projects.items.map((item) => (
					<div
						className="h-[27rem] sm:h-[34rem] flex items-center justify-center sm:w-[520px] w-[82vw]"
						key={item.id}>
						<ProjectCard item={item} />
					</div>
				))}
			</div>
		</section>
	);
};

export default RecentProjects;
