import { SiSolana } from "react-icons/si";

// Portada del bot de liquidez: una terminal que se "escribe" al entrar en pantalla
export const BotCover = ({ lines }: { lines: [string, string, string] }) => (
	<div aria-hidden className="bot-cover">
		<div className="term w-[86%] p-4">
			<div className="mb-2 flex items-center gap-1.5">
				<span className="size-2.5 rounded-full bg-red-400/80" />
				<span className="size-2.5 rounded-full bg-yellow-400/80" />
				<span className="size-2.5 rounded-full bg-emerald-400/80" />
				<span className="ml-2 text-faint">liquidity-bot</span>
			</div>
			<p className="flex whitespace-nowrap text-fg/90">
				<span className="mr-[1ch] text-brand">$</span>
				<span className="term-type">python bot.py --network solana</span>
			</p>
			<p className="term-line text-muted" style={{ "--n": 2 } as React.CSSProperties}>
				{lines[0]}
			</p>
			<p className="term-line text-muted" style={{ "--n": 3 } as React.CSSProperties}>
				{lines[1]}
			</p>
			<p className="term-line text-[#14F195]" style={{ "--n": 4 } as React.CSSProperties}>
				{lines[2]} <span className="term-caret" />
			</p>
		</div>
		<div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195]">
			<SiSolana className="size-5 text-ink" />
		</div>
	</div>
);
