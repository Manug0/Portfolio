import { type ProfileId, getProfile } from "@/data/profiles";
import { siteConfig, socialMedia } from "@/data";

const Footer = ({ profileId }: { profileId: ProfileId }) => {
	const { nav } = getProfile(profileId);
	const year = new Date().getFullYear();

	return (
		<footer className="w-full relative pt-10 pb-10 overflow-hidden">
			<div aria-hidden className="w-full left-0 -bottom-72 absolute min-h-96 pointer-events-none">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/footer-grid.svg" alt="" className="w-full h-[800px] opacity-50" />
			</div>

			<div className="relative border-t border-white/[0.08] pt-10 flex md:flex-row flex-col justify-between items-center gap-6">
				<p className="md:text-base text-sm text-white-200">
					© {year} {siteConfig.name} · Hecho con Next.js, Tailwind y Framer Motion
				</p>

				<nav aria-label="Pie de página" className="hidden lg:flex gap-6 text-sm text-white-200">
					{nav.map((item) => (
						<a key={item.link} href={item.link} className="hover:text-white transition-colors">
							{item.name}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					{socialMedia.map((info) => (
						<a
							href={info.link}
							target="_blank"
							rel="noopener noreferrer"
							key={info.id}
							aria-label={info.name}
							className="w-10 h-10 flex justify-center items-center backdrop-blur-lg saturate-150 bg-black-200 rounded-lg border border-black-300 transition hover:border-brand/60 hover:-translate-y-0.5">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={info.img} alt="" width={20} height={20} />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
