/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Las capturas de los proyectos se sirven a calidad 90 para que se vean nítidas
		qualities: [75, 90],
	},
	// Las páginas viven en app/[lang]; el español se sirve sin prefijo ("/" y "/tech")
	async rewrites() {
		return {
			beforeFiles: [
				{ source: "/", destination: "/es" },
				{ source: "/tech", destination: "/es/tech" },
			],
		};
	},
	async redirects() {
		return [
			{ source: "/es", destination: "/", permanent: true },
			{ source: "/es/tech", destination: "/tech", permanent: true },
			// El perfil de finanzas pasó a ser la portada; los enlaces antiguos siguen funcionando
			{ source: "/finanzas", destination: "/", permanent: true },
			{ source: "/en/finance", destination: "/en", permanent: true },
		];
	},
};

module.exports = nextConfig;
