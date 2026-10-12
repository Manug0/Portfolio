"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { PinContainer } from "./ui/3d-pin";
import type { Project } from "@/data";
import { SiSolana } from "react-icons/si";
import { projects } from "@/data";

const SolanaCover = () => (
	<div
		aria-hidden
		className="absolute inset-0 overflow-hidden bg-[#0B0D24] bg-grid-white/[0.04] flex items-center justify-center">
		<div className="absolute -left-10 -top-10 size-48 rounded-full bg-[#9945FF]/40 blur-3xl" />
		<div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-[#14F195]/30 blur-3xl" />
		<div className="relative flex w-[85%] flex-col gap-3 rounded-xl border border-white/[0.1] bg-black-100/80 p-4 font-mono text-[10px] sm:text-xs text-white-100 shadow-2xl backdrop-blur">
			<div className="flex items-center gap-1.5">
				<span className="size-2.5 rounded-full bg-red-400/80" />
				<span className="size-2.5 rounded-full bg-yellow-400/80" />
				<span className="size-2.5 rounded-full bg-emerald-400/80" />
				<span className="ml-2 text-white-200">liquidity-bot</span>
			</div>
			<p>
				<span className="text-purple">$</span> python bot.py --network solana
			</p>
			<p className="text-white-200">» analizando pools de liquidez…</p>
			<p className="text-white-200">» agente IA: rango óptimo recalculado</p>
			<p className="text-[#14F195]">✓ posición reajustada automáticamente</p>
		</div>
		<div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]">
			<SiSolana className="size-5 text-black-100" />
		</div>
	</div>
);

const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
	<div className="absolute inset-x-[5%] top-[8%] bottom-0 z-10 flex flex-col overflow-hidden rounded-t-xl border border-b-0 border-white/[0.12] bg-[#0B0D24] shadow-[0_-10px_40px_rgba(57,59,178,0.35)]">
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

const ProjectCard = ({ item }: { item: Project }) => {
	const host = item.link ? new URL(item.link).host : item.badge;

	return (
		<PinContainer
			title={host}
			href={item.link}
			target="_blank"
			ariaLabel={item.link ? `Visitar ${item.title} (se abre en una pestaña nueva)` : undefined}>
			<div className="relative flex items-center justify-center sm:w-[480px] w-[78vw] overflow-hidden aspect-[3/2] mb-8 rounded-2xl lg:rounded-3xl bg-[#13162D]">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/bg.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
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
					<span className="shrink-0 rounded-full border border-purple/30 bg-purple/10 px-2.5 py-0.5 text-[11px] text-purple">
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
					<span className="flex items-center text-sm lg:text-lg text-purple">
						Visitar web
						<FaLocationArrow aria-hidden className="ms-2 transition-transform group-hover/pin:translate-x-1" />
					</span>
				)}
			</div>
		</PinContainer>
	);
};

const RecentProjects = () => {
	return (
		<section className="py-20" id="projects" aria-labelledby="projects-title">
			<p className="eyebrow mb-3">Portfolio</p>
			<h2 id="projects-title" className="heading">
				Algunos de mis <span className="text-purple">proyectos</span>
			</h2>
			<div className="flex flex-wrap items-center justify-center p-4 gap-x-16 gap-y-12 mt-10">
				{projects.map((item) => (
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
