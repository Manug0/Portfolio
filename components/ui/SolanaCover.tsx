import { SiSolana } from "react-icons/si";

export const SolanaCover = () => (
	<div
		aria-hidden
		className="absolute inset-0 overflow-hidden bg-[#0B0D24] bg-grid-white/[0.04] flex items-center justify-center">
		<div className="absolute -left-10 -top-10 size-48 rounded-full bg-[#9945FF]/40 blur-3xl" />
		<div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-[#14F195]/30 blur-3xl" />
		<div className="relative flex w-[85%] flex-col gap-3 rounded-xl border border-white/[0.1] bg-black-100/80 p-4 font-mono text-[10px] sm:text-xs text-white-100 shadow-2xl backdrop-blur">
			<div className="flex items-center gap-1.5">
				<span className="size-2.5 rounded-full bg-red-400/80" />
				<span className="size-2.5 rounded-full bg-yellow-400/80" />
				<span className="size-2.5 rounded-full bg-emerald-400/80" />
				<span className="ml-2 text-white-200">liquidity-bot</span>
			</div>
			<p>
				<span className="text-brand">$</span> python bot.py --network solana
			</p>
			<p className="text-white-200">» analizando pools de liquidez…</p>
			<p className="text-white-200">» agente IA: rango óptimo recalculado</p>
			<p className="text-[#14F195]">✓ posición reajustada automáticamente</p>
		</div>
		<div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]">
			<SiSolana className="size-5 text-black-100" />
		</div>
	</div>
);
