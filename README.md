# Portfolio · Manuel González

Portfolio web de Manuel González: economista y desarrollador (backend, integraciones y datos).
Recoge experiencia, proyectos, stack, formación y CV descargable, con un formulario de contacto integrado.

La web tiene dos perfiles, cada uno con su contenido, su CV y su color de marca, y está en español e inglés:

| | Español | English |
| :-- | :-- | :-- |
| **Finanzas** (dorado, por defecto) | https://manu-gonzalez.vercel.app | https://manu-gonzalez.vercel.app/en |
| **Tech** (violeta) | https://manu-gonzalez.vercel.app/tech | https://manu-gonzalez.vercel.app/en/tech |

- **Perfil**: se cambia con el interruptor de la portada (y el del menú, que aparece al bajar), arrastrando la
  "costura" de la ilustración de la portada o desde la tarjeta del otro perfil en "Sobre mí". El cambio se hace
  con un barrido en diagonal (View Transitions API) y aterriza en la sección equivalente del otro perfil.
- **Idioma**: enlace `EN` / `ES` del menú (y del pie). Lleva a la misma página y sección en el otro idioma,
  y cada idioma ofrece sus propios CVs.

## Tecnologías

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Estilos**: Tailwind CSS + CSS propio (`app/globals.css`)
- **Animaciones**: CSS y APIs del navegador, sin librerías: `IntersectionObserver` para las apariciones,
  View Transitions para el cambio de perfil y un `<canvas>` 2D para la ilustración de la portada
- **Contacto**: EmailJS (`@emailjs/browser`) + React Hook Form
- **Tipografías**: Geist, Geist Mono e Instrument Serif (`next/font`)

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Estructura

- `data/`: todo el contenido.
  - `es.ts` y `en.ts`: los textos de cada idioma (los dos perfiles, formación, certificaciones, idiomas y textos de interfaz). Tienen la misma forma (`Content`, en `types.ts`), así que TypeScript avisa si a un idioma le falta algo. **Para cambiar un dato hay que tocar los dos.**
  - `shared.ts`: lo que no se traduce (iconos y colores de cada tecnología, enlaces y capturas de los proyectos).
  - `site.ts`: datos de contacto, idiomas, perfiles y rutas. Es lo único de `data/` que importan los componentes de cliente.
- `app/(es)/` y `app/(en)/`: un layout raíz por idioma (para que `<html lang>` sea correcto) con sus dos rutas; todas renderizan `components/Portfolio.tsx` con su idioma y su perfil.
- `components/`: secciones de la página (`Hero`, `Grid`, `Experience`, `RecentProjects`, `Markets`, `TechStack`, `Approach`, `Education`, `Contact`, `Footer`). Son componentes de servidor: reciben el contenido del idioma activo y solo llevan JavaScript las piezas interactivas.
- `components/ui/`: piezas reutilizables. Las que tienen lógica:
  - `HeroArt.tsx`: el lienzo de la portada y su costura arrastrable. Dibuja una sola serie con dos lecturas: gráfico de línea (finanzas) y bloques de datos (tech).
  - `ProfileSwitch.tsx`, `ProfileLink.tsx` y `lib/profile-switch.ts`: el interruptor de perfil y el barrido entre perfiles.
  - `LanguageLink.tsx`: el enlace de cambio de idioma.
  - `Effects.tsx`: comportamientos globales con un solo observador por tipo (apariciones al hacer scroll, foco de luz e inclinación de las tarjetas, progreso de lectura y de la línea de tiempo).
  - `Nav.tsx`: menú flotante con la sección activa.
- `public/`:
  - CVs: `Manuel_Gonzalez_Garcia_CV.pdf` (tech) y `Manuel_Gonzalez_Garcia_CV_Finanzas.pdf` en español; `Manuel_Gonzalez_Garcia_CV_EN.pdf` (tech) y `Manuel_Gonzalez_Garcia_CV_Finance_EN.pdf` en inglés. Cada uno tiene su miniatura `cv-preview*.jpg` (la primera página a 800×1132).
  - `projects/*.webp`: capturas de los proyectos web (a ~1900 px de ancho; `next/image` sirve el tamaño adecuado).
  - `og-<perfil>[-en].jpg`: la imagen que se muestra al compartir cada perfil en cada idioma (una captura de su portada, 1200×630).

## Diseño y rendimiento

- El color de marca se define con variables CSS por perfil en `app/globals.css` (`--brand-rgb`…) y se usa en Tailwind como `brand`. Cada perfil conserva además su color fijo (`fin` / `tech`), porque la portada y el interruptor enseñan los dos a la vez.
- La palabra resaltada de los títulos cambia de carácter con el perfil: serif en cursiva en finanzas, monoespaciada en tech.
- Todo lo que se anima es `transform` u `opacity`; el lienzo de la portada se detiene cuando sale de pantalla y baja de ritmo durante el scroll o en equipos lentos.
- Sin JavaScript el contenido se ve completo, y con "reducir movimiento" activado en el sistema no hay animaciones ni barrido.
