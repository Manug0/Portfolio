"use client";

import { SiSolana } from "react-icons/si";
import { motion } from "framer-motion";

const tokens = [
	{
		key: "btc",
		src: "/bitcoin-btc-logo.svg",
		className: "left-[8%] bottom-[10%] size-16 lg:left-auto lg:right-[34%] lg:bottom-[14%] lg:size-20",
		delay: 0,
	},
	{
		key: "eth",
		src: "/ethereum-eth-logo.svg",
		className: "right-[8%] bottom-[14%] size-16 lg:bottom-auto lg:top-[12%] lg:size-24",
		delay: 0.8,
	},
];

const float = (delay: number) => ({
	animate: { y: [0, -14, 0], x: [0, 6, 0], rotate: [0, 4, 0] },
	transition: { duration: 5, delay, repeat: Infinity, ease: "easeInOut" as const },
});

export const FloatingTokens = () => {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
			{tokens.map((token) => (
				<motion.img
					key={token.key}
					src={token.src}
					alt=""
					className={`absolute drop-shadow-[0_10px_30px_rgba(203,172,249,0.25)] ${token.className}`}
					{...float(token.delay)}
				/>
			))}
			<motion.div
				className="absolute left-[calc(50%-1.75rem)] bottom-[26%] lg:left-auto lg:right-[10%] lg:bottom-[12%] flex size-14 lg:size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] shadow-[0_10px_30px_rgba(20,241,149,0.25)]"
				{...float(1.6)}>
				<SiSolana className="size-7 lg:size-10 text-black-100" />
			</motion.div>
		</div>
	);
};
