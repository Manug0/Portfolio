# Portfolio · Manuel González

Portfolio web de Manuel González, desarrollador Salesforce especializado en backend, integraciones y datos.
Recoge experiencia, proyectos, stack, formación y CV descargable, con un formulario de contacto integrado.

🔗 https://manu-gonzalez.vercel.app

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

- `data/index.ts`: todo el contenido (experiencia, proyectos, stack, formación…). Para actualizar la web basta con editar este archivo.
- `components/`: secciones de la página (`Hero`, `Grid`, `Experience`, `RecentProjects`, `TechStack`, `Approach`, `Education`, `Contact`, `Footer`).
- `components/ui/`: componentes visuales reutilizables.
- `public/Manuel_Gonzalez_Garcia_CV.pdf`: CV descargable (`public/cv-preview.jpg` es su miniatura).
