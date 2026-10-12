import type { TechItem } from "@/data";
import { cn } from "@/lib/utils";

export const InfiniteMarquee = ({
	items,
	speed = "40s",
	direction = "forwards",
	className,
}: {
	items: TechItem[];
	speed?: string;
	direction?: "forwards" | "reverse";
	className?: string;
}) => {
	// La lista se duplica para que el bucle sea continuo (la animación desplaza -50%)
	const loop = [...items, ...items];

	return (
		<div
			className={cn(
				"relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
				className
			)}
			style={
				{
					"--animation-duration": speed,
					"--animation-direction": direction,
				} as React.CSSProperties
			}>
			<ul className="flex w-max min-w-full shrink-0 gap-4 py-4 animate-scroll hover:[animation-play-state:paused]">
				{loop.map((item, idx) => {
					const Icon = item.icon;
					return (
						<li
							key={`${item.name}-${idx}`}
							aria-hidden={idx >= items.length}
							className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-[linear-gradient(180deg,#10132E,#04071D)] px-6 py-4">
							{Icon && <Icon aria-hidden className="size-6" style={{ color: item.color }} />}
							<span className="whitespace-nowrap text-sm md:text-base font-medium text-white-100">
								{item.name}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
