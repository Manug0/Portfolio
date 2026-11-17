import Portfolio from "@/components/Portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("es", "tech");

export default function Tech() {
	return <Portfolio locale="es" profileId="tech" />;
}
