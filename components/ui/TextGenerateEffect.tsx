"use client";

import { motion, stagger, useAnimate } from "framer-motion";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

export const TextGenerateEffect = ({
	words,
	className,
	highlightFrom = 4,
}: {
	words: string;
	className?: string;
	/** Índice de la palabra a partir de la cual se resalta en morado */
	highlightFrom?: number;
}) => {
	const [scope, animate] = useAnimate();
	const wordsArray = words.split(" ");

	useEffect(() => {
		animate("span", { opacity: 1, filter: "blur(0px)" }, { duration: 1.2, delay: stagger(0.12) });
	}, [animate]);

	return (
		<div className={cn("font-bold", className)}>
			<div className="my-4 text-white leading-snug tracking-wide">
				<motion.div ref={scope}>
					{wordsArray.map((word, idx) => (
						<motion.span
							key={word + idx}
							style={{ filter: "blur(8px)" }}
							className={cn("opacity-0", idx >= highlightFrom ? "text-purple" : "text-white")}>
							{word}{" "}
						</motion.span>
					))}
				</motion.div>
			</div>
		</div>
	);
};
