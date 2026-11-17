import type { Content, ProfileId } from "@/data";

/** Props comunes de cada sección: el contenido del idioma activo, el perfil y su número de orden */
export type SectionProps = { content: Content; profileId: ProfileId; index: number };
