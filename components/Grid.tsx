import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { type ProfileId, getProfile } from "@/data/profiles";

const Grid = ({ profileId }: { profileId: ProfileId }) => {
	const { grid } = getProfile(profileId);

	return (
		<section id="about" aria-label="Sobre mí">
			<BentoGrid className="w-full py-20">
				{grid.map((item, i) => (
					<BentoGridItem
						id={item.id}
						key={item.id}
						index={i}
						profileId={profileId}
						title={item.title}
						description={item.description}
						className={item.className}
						img={item.img}
						imgClassName={item.imgClassName}
						titleClassName={item.titleClassName}
						spareImg={item.spareImg}
					/>
				))}
			</BentoGrid>
		</section>
	);
};

export default Grid;
