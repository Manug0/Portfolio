// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";

import * as React from "react";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const fieldClasses = `flex w-full border-none bg-[#10132E] text-white shadow-input rounded-md px-3 py-2 text-sm
	placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60
	disabled:cursor-not-allowed disabled:opacity-50 shadow-[0px_0px_1px_1px_var(--neutral-700)]
	group-hover/input:shadow-none transition duration-300 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500/60`;

// Envoltorio con un halo que sigue al cursor (efecto de Aceternity UI)
const GlowWrapper = ({ children }: { children: React.ReactNode }) => {
	const radius = 100;
	const [visible, setVisible] = React.useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<motion.div
			style={{
				background: useMotionTemplate`
					radial-gradient(
						${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
						rgb(var(--brand-rgb)),
						transparent 80%
					)
				`,
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			className="p-[2px] rounded-lg transition duration-300 group/input">
			{children}
		</motion.div>
	);
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
	<GlowWrapper>
		<input type={type} className={cn("h-10", fieldClasses, className)} ref={ref} {...props} />
	</GlowWrapper>
));
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
	<GlowWrapper>
		<textarea className={cn("min-h-32 resize-y", fieldClasses, className)} ref={ref} {...props} />
	</GlowWrapper>
));
Textarea.displayName = "Textarea";

export { Input, Textarea };
