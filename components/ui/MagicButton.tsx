import React from "react";
import { cn } from "@/lib/utils";

interface MagicButtonProps {
	title: string;
	icon?: React.ReactNode;
	position?: "left" | "right";
	href?: string;
	target?: string;
	download?: boolean | string;
	handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	otherClasses?: string;
	className?: string;
	ariaLabel?: string;
}

const MagicButton: React.FC<MagicButtonProps> = ({
	title,
	icon,
	position = "right",
	href,
	target,
	download,
	handleClick,
	otherClasses,
	className,
	ariaLabel,
}) => {
	const commonClasses = cn(
		"relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]",
		className
	);
	const innerClasses = cn(
		"inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2",
		otherClasses
	);

	const content = (
		<>
			<span
				aria-hidden
				className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgb(var(--brand-soft-rgb))_0%,rgb(var(--brand-deep-rgb))_50%,rgb(var(--brand-soft-rgb))_100%)]"
			/>
			<span className={innerClasses}>
				{position === "left" && icon}
				{title}
				{position === "right" && icon}
			</span>
		</>
	);

	if (href) {
		return (
			<a
				href={href}
				target={target}
				rel={target === "_blank" ? "noopener noreferrer" : undefined}
				download={download}
				aria-label={ariaLabel}
				className={commonClasses}>
				{content}
			</a>
		);
	}

	return (
		<button type="button" className={commonClasses} onClick={handleClick} aria-label={ariaLabel}>
			{content}
		</button>
	);
};

export default MagicButton;
