"use client";

import { type ProfileId, profiles } from "@/data/profiles";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const ProfileToggle = ({
	current,
	variant = "hero",
	className,
}: {
	current: ProfileId;
	variant?: "hero" | "compact";
	className?: string;
}) => {
	const isHero = variant === "hero";

	return (
		<div
			role="group"
			aria-label="Elegir perfil"
			className={cn(
				"inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.03] p-1 backdrop-blur-sm",
				className
			)}>
			{Object.values(profiles).map((profile) => {
				const active = profile.id === current;
				return (
					<Link
						key={profile.id}
						href={profile.path}
						aria-current={active ? "page" : undefined}
						className={cn(
							"relative rounded-full transition-colors whitespace-nowrap",
							isHero ? "px-4 sm:px-5 py-2 text-sm" : "px-3 py-1 text-xs",
							active ? "text-white" : "text-white-200 hover:text-white"
						)}>
						{active && (
							<motion.span
								aria-hidden
								initial={{ opacity: 0, scale: 0.85 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ type: "spring", stiffness: 300, damping: 25 }}
								className="absolute inset-0 -z-10 rounded-full bg-brand/20 ring-1 ring-brand/50 shadow-[0_0_20px_rgb(var(--brand-rgb)/0.25)]"
							/>
						)}
						<span className="font-medium">{profile.label}</span>
						{isHero && (
							<span className="ml-2 hidden sm:inline text-xs text-white-200">{profile.sublabel}</span>
						)}
					</Link>
				);
			})}
		</div>
	);
};
