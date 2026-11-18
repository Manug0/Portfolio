import { type Locale, locales } from "@/data/site";

import Portfolio from "@/components/Portfolio";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ lang: string }> };

const localeOf = (lang: string): Locale => (locales.includes(lang as Locale) ? (lang as Locale) : "es");

export const generateMetadata = async ({ params }: Props) => buildMetadata(localeOf((await params).lang), "finanzas");

export default async function Home({ params }: Props) {
	return <Portfolio locale={localeOf((await params).lang)} profileId="finanzas" />;
}
