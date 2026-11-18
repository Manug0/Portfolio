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
- **Tema**: botón de sol / luna (en el menú; en móvil, junto al nombre y en la barra flotante). El claro es el tema por defecto; la elección se guarda en `localStorage` y el cambio se revela en círculo desde el botón. Los colores de cada tema son variables CSS en `app/globals.css` (`:root` es el oscuro y `:root[data-theme="light"]` el claro; `<html>` lleva `data-theme="light"` desde el servidor).
- **Idioma**: selector `ES · EN` del menú (en móvil, junto al nombre y en la barra flotante). Cambia sin recargar la página, con el mismo revelado en círculo, y deja al lector en el mismo punto; cada idioma ofrece sus propios CVs.
- **Menú**: se esconde al bajar y vuelve al subir, al llevar el ratón al borde superior o con el teclado. Abajo a la derecha, una flecha con anillo de progreso vuelve al principio.

## Tecnologías

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Estilos**: Tailwind CSS + CSS propio (`app/globals.css`)
- **Animaciones**: CSS y APIs del navegador, sin librerías: `IntersectionObserver` para las apariciones,
  View Transitions para el cambio de perfil y un `<canvas>` 2D para la ilustración de la portada
- **Contacto**: EmailJS (`@emailjs/browser`), con validación propia
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
  - `shared.ts`: lo que no se traduce (iconos y colores de cada tecnología).
  - `projects.json`: enlace y captura de cada proyecto web (lo lee también el script de capturas).
  - `site.ts`: datos de contacto, idiomas, perfiles y rutas. Es lo único de `data/` que importan los componentes de cliente.
- `app/[lang]/`: un único layout raíz y las dos rutas (`page.tsx` y `tech/page.tsx`) para los dos idiomas; todas renderizan `components/Portfolio.tsx` con su idioma y su perfil. El español se sirve sin prefijo mediante las reescrituras de `next.config.js` (`/` → `/es`, `/tech` → `/es/tech`).
- `components/`: secciones de la página (`Hero`, `Grid`, `Experience`, `RecentProjects`, `Markets`, `TechStack`, `Approach`, `Education`, `Contact`, `Footer`). Son componentes de servidor: reciben el contenido del idioma activo y solo llevan JavaScript las piezas interactivas.
- `components/ui/`: piezas reutilizables. Las que tienen lógica:
  - `HeroArt.tsx`: el lienzo de la portada y su costura arrastrable. Dibuja una sola serie con dos lecturas: gráfico de línea (finanzas) y bloques de datos (tech).
  - `ProfileSwitch.tsx`, `ProfileLink.tsx` y `lib/profile-switch.ts`: el interruptor de perfil, el barrido entre perfiles y el cambio de idioma.
  - `LanguageSwitch.tsx`: el selector de idioma.
  - `ThemeToggle.tsx` y `lib/theme.ts`: el botón de tema claro / oscuro.
  - `Effects.tsx`: comportamientos globales con un solo observador por tipo (apariciones al hacer scroll, foco de luz e inclinación de las tarjetas, progreso de lectura y de la línea de tiempo).
  - `Nav.tsx`: menú flotante con la sección activa, barra flotante de móvil y botón de volver arriba.
- `public/`:
  - CVs: `Manuel_Gonzalez_Garcia_CV.pdf` (tech) y `Manuel_Gonzalez_Garcia_CV_Finanzas.pdf` en español; `Manuel_Gonzalez_Garcia_CV_EN.pdf` (tech) y `Manuel_Gonzalez_Garcia_CV_Finance_EN.pdf` en inglés. Cada uno tiene su miniatura `cv-preview*.jpg` (la primera página a 800×1132).
  - `projects/*.webp`: capturas de los proyectos web (1910×915; `next/image` sirve el tamaño adecuado). Se renuevan solas: ver "Capturas automáticas".
  - `og-<perfil>[-en].jpg`: la imagen que se muestra al compartir cada perfil en cada idioma (una captura de su portada, 1200×630).

## Capturas automáticas

`.github/workflows/update-screenshots.yml` ejecuta cada lunes `scripts/update-screenshots.mjs`: abre las webs de
`data/projects.json`, captura su portada y la compara con la del repositorio. Si alguna ha cambiado de forma
apreciable, sube la captura nueva a la rama principal y Vercel vuelve a desplegar.

- Para forzarlo sin esperar al lunes: pestaña **Actions** → *Actualizar capturas de proyectos* → **Run workflow**
  (con la casilla *force* se rehacen todas).
- Para añadir un proyecto con captura basta con darle enlace e imagen en `data/projects.json`.
- Si una web está caída, se conserva la captura que ya había.

## Diseño y rendimiento

- El color de marca se define con variables CSS por perfil en `app/globals.css` (`--brand-rgb`…) y se usa en Tailwind como `brand`. Cada perfil conserva además su color fijo (`fin` / `tech`), porque la portada y el interruptor enseñan los dos a la vez.
- La palabra resaltada de los títulos cambia de carácter con el perfil: serif en cursiva en finanzas, monoespaciada en tech.
- Todo lo que se anima es `transform` u `opacity`; el lienzo de la portada se detiene cuando sale de pantalla y baja de ritmo durante el scroll o en equipos lentos.
- Sin JavaScript el contenido se ve completo, y con "reducir movimiento" activado en el sistema no hay animaciones ni barrido.
