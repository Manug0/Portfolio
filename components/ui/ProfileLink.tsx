"use client";

import { type ProfileId, getProfile } from "@/data/profiles";

import Link from "next/link";
import { switchProfile } from "@/lib/profile-switch";
import { useRouter } from "next/navigation";

// Enlace al otro perfil que usa el mismo barrido que el interruptor
export const ProfileLink = ({
	target,
	children,
	...props
}: { target: ProfileId; children: React.ReactNode } & Omit<React.ComponentProps<typeof Link>, "href">) => {
	const router = useRouter();
	const profile = getProfile(target);

	return (
		<Link
			{...props}
			href={profile.path}
			onClick={(event) => {
				if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
				event.preventDefault();
				switchProfile(router, profile);
			}}>
			{children}
		</Link>
	);
};
