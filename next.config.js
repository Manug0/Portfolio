/** @type {import('next').NextConfig} */
const nextConfig = {
	// El perfil de finanzas pasó a ser la portada; los enlaces antiguos a /finanzas siguen funcionando
	async redirects() {
		return [{ source: "/finanzas", destination: "/", permanent: true }];
	},
};

module.exports = nextConfig;
