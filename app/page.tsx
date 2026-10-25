import Portfolio from "@/components/Portfolio";
import { buildMetadata } from "@/lib/metadata";
import { finanzas } from "@/data/profiles";

export const metadata = buildMetadata(finanzas);

export default function Home() {
	return <Portfolio profileId="finanzas" />;
}
