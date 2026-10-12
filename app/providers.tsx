"use client";

import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
	// Respeta "reducir movimiento" del sistema en todas las animaciones de framer-motion
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
