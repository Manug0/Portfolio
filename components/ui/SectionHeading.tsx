export const SectionHeading = ({
	id,
	eyebrow,
	title,
	highlight,
	intro,
}: {
	id: string;
	eyebrow: string;
	title: string;
	highlight: string;
	intro?: string;
}) => (
	<>
		<p className="eyebrow mb-3">{eyebrow}</p>
		<h2 id={id} className="heading">
			{title} <span className="text-brand">{highlight}</span>
		</h2>
		{intro && (
			<p className="mx-auto mt-4 max-w-xl text-center text-white-200 text-sm md:text-base text-balance">
				{intro}
			</p>
		)}
	</>
);
