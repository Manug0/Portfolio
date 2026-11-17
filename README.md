# Portfolio · Manuel González

Portfolio web de Manuel González, desarrollador Salesforce especializado en backend, integraciones y datos.
Recoge experiencia, proyectos, stack, formación y CV descargable, con un formulario de contacto integrado.

La web tiene dos perfiles, cada uno con su contenido, su CV y su color de marca:

- **Finanzas** (dorado, por defecto): https://manu-gonzalez.vercel.app
- **Tech** (violeta): https://manu-gonzalez.vercel.app/tech

Se cambia de uno a otro con el interruptor de la portada (y el del menú, que aparece al bajar), arrastrando
la "costura" del gráfico de la portada o desde la tarjeta del otro perfil en "Sobre mí". El cambio se hace
con un barrido en diagonal (View Transitions API) y aterriza en la sección equivalente del otro perfil.

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

- `data/profiles.ts`: el contenido de cada perfil (titular, experiencia, competencias, enfoque, contacto, CV y metadatos).
- `data/index.ts`: el contenido común (datos de contacto, proyectos web, formación, certificaciones, idiomas).
- `app/page.tsx` (finanzas) y `app/tech/page.tsx` (tech): las dos rutas; ambas renderizan `components/Portfolio.tsx` con su perfil.
- `components/`: secciones de la página (`Hero`, `Grid`, `Experience`, `RecentProjects`, `Markets`, `TechStack`, `Approach`, `Education`, `Contact`, `Footer`). Son componentes de servidor: solo llevan JavaScript las piezas interactivas.
- `components/ui/`: piezas reutilizables. Las que tienen lógica:
  - `HeroArt.tsx`: el lienzo de la portada (gráfico de mercado que desemboca en una red de sistemas) y su costura arrastrable.
  - `ProfileSwitch.tsx` y `lib/profile-switch.ts`: el interruptor de perfil y el barrido entre perfiles.
  - `Effects.tsx`: comportamientos globales con un solo observador por tipo (apariciones al hacer scroll, foco de luz e inclinación de las tarjetas, progreso de lectura y de la línea de tiempo).
  - `Nav.tsx`: menú flotante con la sección activa.
- `public/Manuel_Gonzalez_Garcia_CV.pdf` y `public/Manuel_Gonzalez_Garcia_CV_Finanzas.pdf`: los CVs descargables (con sus miniaturas `cv-preview*.jpg`).
- `public/og-finanzas.jpg` y `public/og-tech.jpg`: la imagen que se muestra al compartir cada perfil (una captura de su portada).

## Diseño y rendimiento

- El color de marca se define con variables CSS por perfil en `app/globals.css` (`--brand-rgb`…) y se usa en Tailwind como `brand`. Cada perfil conserva además su color fijo (`fin` / `tech`), porque la portada y el interruptor enseñan los dos a la vez.
- La palabra resaltada de los títulos cambia de carácter con el perfil: serif en cursiva en finanzas, monoespaciada en tech.
- Todo lo que se anima es `transform` u `opacity`; el lienzo de la portada se detiene cuando sale de pantalla y baja de ritmo en equipos lentos.
- Sin JavaScript el contenido se ve completo, y con "reducir movimiento" activado en el sistema no hay animaciones ni barrido.
