import { FaLocationArrow } from "react-icons/fa6";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import Image from "next/image";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { heroStats, siteConfig } from "@/data";

const Hero = () => {
	return (
		<section className="pb-16 pt-32 sm:pt-36" aria-labelledby="hero-title">
			<div aria-hidden>
				<Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
				<Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
				<Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
			</div>

			<div
				aria-hidden
				className="h-screen w-full bg-black-100 bg-grid-white/[0.03] absolute top-0 left-0 flex items-center justify-center">
				<div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
			</div>

			<div className="flex justify-center relative my-10 sm:my-16 z-10">
				<div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
					<div className="relative mb-6">
						<div
							aria-hidden
							className="absolute -inset-1 rounded-full bg-[conic-gradient(from_90deg,#E2CBFF,#393BB2,#CBACF9,#E2CBFF)] animate-[spin_6s_linear_infinite] blur-[2px]"
						/>
						<Image
							src="/profile.png"
							alt="Foto de Manuel González"
							width={112}
							height={112}
							priority
							className="relative size-24 sm:size-28 rounded-full border-4 border-black-100 object-cover"
						/>
						<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-black-100 px-3 py-0.5 text-[11px] text-emerald-300">
							<span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-400 align-middle animate-pulse" />
							{siteConfig.location}
						</span>
					</div>

					<p className="eyebrow max-w-xl">
						{siteConfig.role} • {siteConfig.tagline}
					</p>

					<h1 id="hero-title" className="sr-only">
						{siteConfig.name}, {siteConfig.role}
					</h1>
					<TextGenerateEffect
						words="Del negocio al código: soluciones Salesforce que escalan"
						className="text-center text-[38px] md:text-5xl lg:text-6xl"
					/>

					<p className="text-center text-white-100 md:tracking-wide mb-8 text-sm md:text-lg lg:text-xl max-w-2xl text-balance">
						¡Hola! Soy <span className="text-white font-semibold">Manu</span>, desarrollador Salesforce
						con experiencia en Apex, LWC, Flows e integraciones, y en proyectos de datos para banca. Mi
						base en economía me ayuda a convertir necesidades de negocio en soluciones técnicas claras.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-4">
						<MagicButton
							title="Ver mi experiencia"
							icon={<FaLocationArrow />}
							position="right"
							href="#experience"
						/>
						<a
							href={siteConfig.cv}
							download
							className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.03] px-7 text-sm font-medium text-white transition hover:border-purple/60 hover:bg-purple/10">
							<HiOutlineDocumentArrowDown className="size-5" />
							Descargar CV
						</a>
					</div>

					<dl className="mt-12 grid w-full grid-cols-3 gap-2 sm:gap-6 max-w-2xl">
						{heroStats.map((stat) => (
							<div
								key={stat.label}
								className="flex flex-col-reverse rounded-2xl border border-white/[0.08] bg-white/[0.02] px-2 py-4 text-center backdrop-blur-sm">
								<dt className="mt-1 text-[11px] sm:text-xs text-white-200 leading-tight">{stat.label}</dt>
								<dd className="text-base sm:text-2xl font-bold text-purple">{stat.value}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
};

export default Hero;
