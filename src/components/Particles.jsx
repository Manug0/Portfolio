import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const Particle = () => {
	const particlesInit = useCallback(async (engine) => {
		console.log(engine);

		await loadSlim(engine);
	}, []);

	// const particlesLoaded = useCallback(async (container) => {
	// 	await console.log(container);
	// }, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			// loaded={particlesLoaded}
			options={{
				fpsLimit: 120,
				particles: {
					color: {
						value: "#ffffff",
					},
					number: {
						density: {
							enable: true,
							area: 100,
						},
						value: 10,
					},
					opacity: {
						anim: {
							enable: true,
							speed: 1,
							opacity_min: 0.05,
						},
					},
					shape: {
						type: "circle",
					},
					size: {
						value: 1,
					},
				},
				detectRetina: true,
			}}
		/>
	);
};

export default Particle;
