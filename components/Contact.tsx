import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { ContactForm } from "./ui/ContactForm";
import { SectionHeading } from "./ui/SectionHeading";
import type { SectionProps } from "./types";
import { siteConfig } from "@/data/site";

const Contact = ({ content, profileId, index }: SectionProps) => {
	const { ui } = content;
	const { contact } = content.profiles[profileId];

	const contactLinks = [
		{
			label: ui.contact.email,
			value: siteConfig.email,
			href: `mailto:${siteConfig.email}`,
			icon: HiOutlineEnvelope,
		},
		{
			label: ui.contact.linkedin,
			value: "Manuel González García",
			href: siteConfig.linkedin,
			icon: FaLinkedin,
			external: true,
		},
		{
			label: ui.contact.github,
			value: "@Manug0",
			href: siteConfig.github,
			icon: SiGithub,
			external: true,
		},
		{
			label: ui.contact.location,
			value: content.location,
			icon: HiOutlineMapPin,
		},
	];

	return (
		<section id="contact" className="section" aria-labelledby="contact-title">
			<div className="wrap">
				<SectionHeading
					id="contact-title"
					index={index}
					eyebrow={contact.eyebrow}
					title={contact.title}
					highlight={contact.highlight}
					intro={contact.text}
				/>

				<div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-5">
					<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
						{contactLinks.map((item, itemIndex) => {
							const Icon = item.icon;
							const inner = (
								<>
									<span className="icon-tile transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
										<Icon aria-hidden className="size-5" />
									</span>
									<span className="min-w-0">
										<span className="eyebrow block !text-[0.66rem]">{item.label}</span>
										<span className="mt-0.5 block truncate">{item.value}</span>
									</span>
								</>
							);
							return (
								<li key={item.label} data-reveal style={{ "--d": itemIndex * 70 } as React.CSSProperties}>
									{item.href ? (
										<a
											href={item.href}
											target={item.external ? "_blank" : undefined}
											rel={item.external ? "noopener noreferrer" : undefined}
											className="card group flex items-center gap-4 p-4"
											data-spot>
											{inner}
										</a>
									) : (
										<div className="card flex items-center gap-4 p-4">{inner}</div>
									)}
								</li>
							);
						})}
					</ul>

					<div className="lg:col-span-3" data-reveal style={{ "--d": 120 } as React.CSSProperties}>
						<ContactForm placeholder={contact.cta} email={siteConfig.email} labels={ui.form} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
