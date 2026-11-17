export const SectionHeading = ({
	id,
	index,
	eyebrow,
	title,
	highlight,
	intro,
}: {
	id?: string;
	/** Número de orden de la sección en la página */
	index: number;
	eyebrow: string;
	title?: string;
	highlight?: string;
	intro?: string;
}) => (
	<header className="sec-head" data-reveal data-wide={intro ? undefined : ""}>
		<p className="eyebrow">
			<span className="text-brand">{String(index).padStart(2, "0")}</span>
			<span aria-hidden className="mx-2.5 text-faint">
				/
			</span>
			{eyebrow}
		</p>
		{title && (
			<h2 id={id}>
				<span className="rise">
					{title} <span className="hl">{highlight}</span>
				</span>
			</h2>
		)}
		{intro && <p className="sec-intro">{intro}</p>}
	</header>
);
