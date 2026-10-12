# Portfolio · Manuel González

Portfolio web de Manuel González, desarrollador Salesforce especializado en backend, integraciones y datos.
Recoge experiencia, proyectos, stack, formación y CV descargable, con un formulario de contacto integrado.

La web tiene dos perfiles, cada uno con su contenido, su CV y su color de marca:

- **Tech** (morado): https://manu-gonzalez.vercel.app
- **Finanzas** (dorado): https://manu-gonzalez.vercel.app/finanzas

Se cambia de uno a otro con el selector de la portada y del menú.

## Tecnologías

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Estilos**: Tailwind CSS con componentes inspirados en Aceternity UI
- **Animaciones**: Framer Motion (timeline con scroll, bento grid, marquee, nav con sección activa) y canvas-confetti
- **Contacto**: EmailJS (`@emailjs/browser`) + React Hook Form

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
- `app/page.tsx` y `app/finanzas/page.tsx`: las dos rutas; ambas renderizan `components/Portfolio.tsx` con su perfil.
- `components/`: secciones de la página (`Hero`, `Grid`, `Experience`, `RecentProjects`, `Markets`, `TechStack`, `Approach`, `Education`, `Contact`, `Footer`).
- `components/ui/`: componentes visuales reutilizables.
- `public/Manuel_Gonzalez_Garcia_CV.pdf` y `public/Manuel_Gonzalez_Garcia_CV_Finanzas.pdf`: los CVs descargables (con sus miniaturas `cv-preview*.jpg`).
- El color de marca se define con variables CSS por perfil en `app/globals.css` (`--brand-rgb`…) y se usa en Tailwind como `brand`.
