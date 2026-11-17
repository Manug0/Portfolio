/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Las capturas de los proyectos se sirven a calidad 90 para que se vean nítidas
		qualities: [75, 90],
	},
	// El perfil de finanzas pasó a ser la portada; los enlaces antiguos a /finanzas siguen funcionando
	async redirects() {
		return [
			{ source: "/finanzas", destination: "/", permanent: true },
			{ source: "/en/finance", destination: "/en", permanent: true },
		];
	},
};

module.exports = nextConfig;
