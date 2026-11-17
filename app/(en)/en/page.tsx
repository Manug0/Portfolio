import Portfolio from "@/components/Portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "finanzas");

export default function HomeEn() {
	return <Portfolio locale="en" profileId="finanzas" />;
}
