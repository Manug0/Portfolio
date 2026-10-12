import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { SiGithub, SiLinkedin } from "react-icons/si";

import { ContactForm } from "./ui/ContactForm";
import { siteConfig } from "@/data";

const contactLinks = [
	{
		label: "Email",
		value: siteConfig.email,
		href: `mailto:${siteConfig.email}`,
		icon: HiOutlineEnvelope,
	},
	{
		label: "LinkedIn",
		value: "Manuel González García",
		href: siteConfig.linkedin,
		icon: SiLinkedin,
		external: true,
	},
	{
		label: "GitHub",
		value: "@Manug0",
		href: siteConfig.github,
		icon: SiGithub,
		external: true,
	},
	{
		label: "Ubicación",
		value: siteConfig.location,
		icon: HiOutlineMapPin,
	},
];

const Contact = () => {
	return (
		<section id="contact" className="relative py-20" aria-labelledby="contact-title">
			<div className="flex flex-col items-center">
				<p className="eyebrow mb-3">Contacto</p>
				<h2 id="contact-title" className="heading lg:max-w-[45vw]">
					¿Construimos algo <span className="text-purple">juntos?</span>
				</h2>
				<p className="text-white-200 mt-6 mb-12 text-center max-w-xl text-balance">
					Estoy abierto a nuevas oportunidades en el ecosistema Salesforce, especialmente en
					integraciones y agentes de IA con Agentforce. Escríbeme y hablamos.
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
				<ul className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
					{contactLinks.map((item) => {
						const Icon = item.icon;
						const inner = (
							<>
								<span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-purple/30 bg-purple/10 text-purple transition group-hover/link:bg-purple group-hover/link:text-black-100">
									<Icon aria-hidden className="size-5" />
								</span>
								<span className="min-w-0">
									<span className="block text-xs uppercase tracking-widest text-white-200">
										{item.label}
									</span>
									<span className="block truncate text-white">{item.value}</span>
								</span>
							</>
						);
						return (
							<li key={item.label}>
								{item.href ? (
									<a
										href={item.href}
										target={item.external ? "_blank" : undefined}
										rel={item.external ? "noopener noreferrer" : undefined}
										className="glass-card group/link flex items-center gap-4 p-4 transition-colors hover:border-purple/40">
										{inner}
									</a>
								) : (
									<div className="glass-card flex items-center gap-4 p-4">{inner}</div>
								)}
							</li>
						);
					})}
				</ul>

				<div className="lg:col-span-3">
					<ContactForm />
				</div>
			</div>
		</section>
	);
};

export default Contact;
