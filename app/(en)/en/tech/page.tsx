import Portfolio from "@/components/Portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "tech");

export default function TechEn() {
	return <Portfolio locale="en" profileId="tech" />;
}
