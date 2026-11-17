"use client";

import { peekProfile, switchProfile } from "@/lib/profile-switch";

import { HiArrowsRightLeft } from "react-icons/hi2";
import Link from "next/link";
import type { ProfileId } from "@/data/site";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type SwitchOption = { id: ProfileId; label: string; sublabel: string; href: string };

// Interruptor entre los dos perfiles. Cada mitad lleva siempre su color (dorado / violeta),
// de modo que se lee como "dos vistas de lo mismo" aunque solo una esté activa.
export const ProfileSwitch = ({
	current,
	options,
	label,
	variant = "hero",
	className,
}: {
	current: ProfileId;
	options: SwitchOption[];
	/** Nombre accesible del grupo ("Elegir perfil") */
	label: string;
	/** hero: grande, en la portada · compact: dentro del menú · dock: flotante en móvil */
	variant?: "hero" | "compact" | "dock";
	className?: string;
}) => {
	const router = useRouter();
	const isHero = variant === "hero";

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, option: SwitchOption) => {
		if (option.id === current) {
			event.preventDefault();
			return;
		}
		// Clic con modificador o botón central: se respeta abrir en pestaña nueva
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
		event.preventDefault();
		peekProfile(false);
		switchProfile(router, option);
	};

	return (
		<div
			role="group"
			aria-label={label}
			data-active={current}
			className={cn("pswitch", `pswitch--${variant}`, className)}>
			{isHero && <span aria-hidden className="pswitch-intro" />}
			<span aria-hidden className="pswitch-thumb" style={{ viewTransitionName: `pswitch-${variant}` }} />
			{options.map((option) => {
				const active = option.id === current;
				return (
					<Link
						key={option.id}
						href={option.href}
						data-id={option.id}
						aria-current={active ? "page" : undefined}
						onClick={(event) => handleClick(event, option)}
						onPointerEnter={active ? undefined : () => peekProfile(true)}
						onPointerLeave={active ? undefined : () => peekProfile(false)}
						onFocus={active ? undefined : () => peekProfile(true)}
						onBlur={active ? undefined : () => peekProfile(false)}
						className="pswitch-opt">
						<span aria-hidden className="pswitch-dot" />
						{isHero ? (
							<span className="pswitch-text">
								<span className="pswitch-label">{option.label}</span>
								<span className="pswitch-sub">{option.sublabel}</span>
							</span>
						) : (
							<span className="pswitch-label">{option.label}</span>
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
