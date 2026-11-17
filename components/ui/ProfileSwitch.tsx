"use client";

import { type Profile, type ProfileId, profiles } from "@/data/profiles";
import { peekProfile, switchProfile } from "@/lib/profile-switch";

import { HiArrowsRightLeft } from "react-icons/hi2";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const options = Object.values(profiles);

// Interruptor entre los dos perfiles. Cada mitad lleva siempre su color (dorado / violeta),
// de modo que se lee como "dos vistas de lo mismo" aunque solo una esté activa.
export const ProfileSwitch = ({
	current,
	variant = "hero",
	className,
}: {
	current: ProfileId;
	/** hero: grande, en la portada · compact: dentro del menú · dock: flotante en móvil */
	variant?: "hero" | "compact" | "dock";
	className?: string;
}) => {
	const router = useRouter();
	const isHero = variant === "hero";

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, profile: Profile) => {
		if (profile.id === current) {
			event.preventDefault();
			return;
		}
		// Clic con modificador o botón central: se respeta abrir en pestaña nueva
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
		event.preventDefault();
		peekProfile(false);
		switchProfile(router, profile);
	};

	return (
		<div
			role="group"
			aria-label="Elegir perfil"
			data-active={current}
			className={cn("pswitch", `pswitch--${variant}`, className)}>
			{isHero && <span aria-hidden className="pswitch-intro" />}
			<span aria-hidden className="pswitch-thumb" style={{ viewTransitionName: `pswitch-${variant}` }} />
			{options.map((profile) => {
				const active = profile.id === current;
				return (
					<Link
						key={profile.id}
						href={profile.path}
						data-id={profile.id}
						aria-current={active ? "page" : undefined}
						onClick={(event) => handleClick(event, profile)}
						onPointerEnter={active ? undefined : () => peekProfile(true)}
						onPointerLeave={active ? undefined : () => peekProfile(false)}
						onFocus={active ? undefined : () => peekProfile(true)}
						onBlur={active ? undefined : () => peekProfile(false)}
						className="pswitch-opt">
						<span aria-hidden className="pswitch-dot" />
						{isHero ? (
							<span className="pswitch-text">
								<span className="pswitch-label">{profile.label}</span>
								<span className="pswitch-sub">{profile.sublabel}</span>
							</span>
						) : (
							<span className="pswitch-label">{profile.label}</span>
						)}
					</Link>
				);
			})}
			{isHero && (
				<span aria-hidden className="pswitch-swap">
					<HiArrowsRightLeft className="size-3.5" />
				</span>
			)}
		</div>
	);
};
