import { type Content, type ProfileId, siteConfig, socialMedia } from "@/data";
import { type LanguageTarget, LanguageLink } from "./ui/LanguageLink";

const languageNames = { es: "Español", en: "English" };

const Footer = ({
	content,
	profileId,
	language,
}: {
	content: Content;
	profileId: ProfileId;
	language: LanguageTarget;
}) => {
	const { ui } = content;
	const { nav } = content.profiles[profileId];
	const year = new Date().getFullYear();

	return (
		<footer className="relative overflow-hidden pt-6">
			<div className="wrap">
				<div aria-hidden data-reveal className="wordmark-box">
					<p className="wordmark">{siteConfig.name}</p>
				</div>

				<div className="mt-6 flex flex-col items-center justify-between gap-6 border-t border-white/[0.08] pb-24 pt-8 md:flex-row md:pb-8">
					<p className="text-center text-sm text-muted md:text-left">
						© {year} {siteConfig.name} · {ui.footer.madeWith}
					</p>

					<nav aria-label={ui.footerNavLabel} className="hidden gap-6 text-sm text-muted lg:flex">
						{nav.map((item) => (
							<a key={item.link} href={item.link} className="transition-colors hover:text-fg">
								{item.name}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<LanguageLink
							target={language}
							className="flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-muted transition duration-300 ease-out hover:-translate-y-0.5 hover:border-brand/60 hover:text-brand">
							{languageNames[language.locale]}
						</LanguageLink>
						{socialMedia.map((social) => {
							const Icon = social.icon;
							return (
								<a
									key={social.id}
									href={social.link}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.name}
									className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-muted transition duration-300 ease-out hover:-translate-y-0.5 hover:border-brand/60 hover:text-brand">
									<Icon aria-hidden className="size-[18px]" />
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
