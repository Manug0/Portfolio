"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { type ProfileId, getProfile, otherProfile } from "@/data/profiles";

import { HiArrowsRightLeft } from "react-icons/hi2";
import Link from "next/link";
import { ProfileToggle } from "./ProfileToggle";
import { cn } from "@/lib/utils";

export const FloatingNav = ({ profileId, className }: { profileId: ProfileId; className?: string }) => {
	const navItems = getProfile(profileId).nav;
	const other = otherProfile(profileId);
	const { scrollY } = useScroll();
	const [visible, setVisible] = useState(true);
	const [pastHero, setPastHero] = useState(false);
	const [active, setActive] = useState<string>("");

	// Visible arriba del todo y al hacer scroll hacia arriba; se oculta al bajar
	useMotionValueEvent(scrollY, "change", (current) => {
		const previous = scrollY.getPrevious() ?? 0;
		setPastHero(current > 600);
		if (current < 120) {
			setVisible(true);
			setActive("");
		} else {
			setVisible(current < previous);
		}
	});

	// Resalta la sección que está en pantalla
	useEffect(() => {
		const ids = navItems.map((item) => item.link.replace("#", ""));
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActive(entry.target.id);
				});
			},
			{ rootMargin: "-45% 0px -50% 0px" }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, [navItems]);

	return (
		<>
			<motion.nav
				aria-label="Navegación principal"
				initial={{ opacity: 0, y: -100 }}
				animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
				transition={{ duration: 0.25 }}
				className={cn(
					"fixed top-4 sm:top-8 inset-x-0 mx-auto z-[5000] w-fit max-w-[calc(100vw-1rem)]",
					"flex items-center sm:gap-2 rounded-full border border-white/[0.15] bg-black-100/80 backdrop-blur-md",
					"px-1.5 py-1.5 sm:px-3 sm:py-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-x-auto",
					className
				)}>
				{navItems.map((navItem) => {
					const isActive = active === navItem.link.replace("#", "");
					return (
						<a
							key={navItem.link}
							href={navItem.link}
							aria-current={isActive ? "true" : undefined}
							className={cn(
								"relative whitespace-nowrap rounded-full px-2 sm:px-4 py-1.5 text-xs sm:text-sm transition-colors",
							navItem.hideOnMobile && "hidden sm:block",
								isActive ? "text-white" : "text-white-200 hover:text-white"
							)}>
							{isActive && (
								<motion.span
									layoutId="nav-active"
									className="absolute inset-0 -z-10 rounded-full bg-brand/20 ring-1 ring-brand/40"
									transition={{ type: "spring", stiffness: 380, damping: 30 }}
								/>
							)}
							{navItem.name}
						</a>
					);
				})}
				<span aria-hidden className="mx-1 hidden md:block h-5 w-px bg-white/[0.15]" />
				<ProfileToggle
					current={profileId}
					variant="compact"
					className="hidden md:inline-flex border-0 bg-transparent p-0"
				/>
			</motion.nav>

			{/* En móvil el selector no cabe en el menú: botón flotante para cambiar de perfil */}
			<motion.div
				initial={false}
				animate={{ y: pastHero ? 0 : 100, opacity: pastHero ? 1 : 0 }}
				transition={{ duration: 0.3 }}
				className="md:hidden fixed bottom-5 right-4 z-[5000]">
				<Link
					href={other.path}
					tabIndex={pastHero ? undefined : -1}
					className="flex items-center gap-2 rounded-full border border-white/[0.15] bg-black-100/85 px-4 py-2.5 text-xs text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
					<HiArrowsRightLeft aria-hidden className="size-4 text-brand" />
					Ver perfil {other.label.toLowerCase()}
				</Link>
			</motion.div>
		</>
	);
};
