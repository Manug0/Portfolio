import Portfolio from "@/components/Portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("es", "finanzas");

export default function Home() {
	return <Portfolio locale="es" profileId="finanzas" />;
}
