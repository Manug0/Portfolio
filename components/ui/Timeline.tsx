"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type TimelineEntry = {
	key: string | number;
	marker: React.ReactNode;
	content: React.ReactNode;
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (!ref.current) return;
		const element = ref.current;
		const observer = new ResizeObserver(() => setHeight(element.getBoundingClientRect().height));
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 30%", "end 60%"],
	});

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

	return (
		<div className="w-full" ref={containerRef}>
			<div ref={ref} className="relative max-w-5xl mx-auto pb-10">
				<ol>
					{data.map((item) => (
						<li key={item.key} className="flex justify-start pt-10 md:pt-24 md:gap-10">
							<div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
								<div className="h-10 absolute left-0 md:left-3 w-10 rounded-full bg-black-100 flex items-center justify-center">
									<div className="h-4 w-4 rounded-full bg-[#10132E] border border-brand/60 p-2 shadow-[0_0_12px_rgb(var(--brand-rgb)/0.6)]" />
								</div>
								<div className="hidden md:block md:pl-20">{item.marker}</div>
							</div>
	
							<div className="relative pl-12 md:pl-4 w-full">
								<div className="md:hidden block mb-4">{item.marker}</div>
								{item.content}
							</div>
						</li>
					))}
				</ol>
				<div
					aria-hidden
					style={{ height: height + "px" }}
					className="absolute md:left-8 left-5 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/[0.12] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
					<motion.div
						style={{ height: heightTransform, opacity: opacityTransform }}
						className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-brand via-brand-deep to-transparent from-[0%] via-[10%] rounded-full"
					/>
				</div>
			</div>
		</div>
	);
};
