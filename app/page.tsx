import Portfolio from "@/components/Portfolio";
import { buildMetadata } from "@/lib/metadata";
import { tech } from "@/data/profiles";

export const metadata = buildMetadata(tech);

export default function Home() {
	return <Portfolio profileId="tech" />;
}
