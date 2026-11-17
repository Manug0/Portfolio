// Punto de entrada del contenido (solo para componentes de servidor: incluye textos e iconos de los dos idiomas).
// Los componentes de cliente importan de "@/data/site", que no arrastra nada de esto.
import type { Locale } from "./site";
import { en } from "./en";
import { es } from "./es";

export * from "./site";
export * from "./types";
export { socialMedia } from "./shared";

const contents = { es, en };

export const getContent = (locale: Locale) => contents[locale];
