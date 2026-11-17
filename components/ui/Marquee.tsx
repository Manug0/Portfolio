import type { TechItem } from "@/data";
import { cn } from "@/lib/utils";

export const Marquee = ({ items, className }: { items: TechItem[]; className?: string }) => {
	// La lista se duplica para que el bucle sea continuo (la animación desplaza -50%)
	const loop = [...items, ...items];

	return (
		<div className={cn("marquee", className)}>
			<ul className="marquee-track">
				{loop.map((item, index) => {
					const Icon = item.icon;
					return (
						<li
							key={`${item.name}-${index}`}
							aria-hidden={index >= items.length}
							className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-ink-2 px-5 py-3.5">
							{Icon && <Icon aria-hidden className="size-5" style={{ color: item.color }} />}
							<span className="whitespace-nowrap text-sm font-medium text-fg/90 md:text-base">{item.name}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
