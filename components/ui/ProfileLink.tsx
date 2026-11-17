"use client";

import { type ProfileTarget, switchProfile } from "@/lib/profile-switch";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Enlace al otro perfil que usa el mismo barrido que el interruptor
export const ProfileLink = ({
	profile,
	children,
	...props
}: { profile: ProfileTarget; children: React.ReactNode } & Omit<React.ComponentProps<typeof Link>, "href">) => {
	const router = useRouter();

	return (
		<Link
			{...props}
			href={profile.href}
			onClick={(event) => {
				if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
				event.preventDefault();
				switchProfile(router, profile);
			}}>
			{children}
		</Link>
	);
};
