"use client";

import { motion } from "framer-motion";

// Destello del color de marca al entrar en un perfil: refuerza el cambio de tema al usar el selector
export const ProfileFlash = () => (
	<motion.div
		aria-hidden
		initial={{ opacity: 0.55 }}
		animate={{ opacity: 0 }}
		transition={{ duration: 1.4, ease: "easeOut" }}
		className="pointer-events-none fixed inset-0 z-[4000] bg-[radial-gradient(ellipse_at_top,rgb(var(--brand-rgb)/0.45),transparent_65%)]"
	/>
);
