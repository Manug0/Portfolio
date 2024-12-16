import {
	SiAngular,
	SiCss3,
	SiDart,
	SiFlutter,
	SiGo,
	SiHtml5,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiRust,
	SiSolidity,
	SiTypescript,
} from "react-icons/si";

import { FaJsSquare } from "react-icons/fa";
import React from "react";

const TechnologyStack: React.FC = () => {
	return (
		<div className="py-20" id="tech-stack">
			<h1 className="heading">
				Mi <span className="text-purple">stack tecnológico</span>
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20">
				<div className="flex flex-col items-center p-6 rounded-md shadow-lg bg-purple/10 hover:-translate-y-2 transition-transform duration-300">
					<h3 className="text-xl md:text-2xl font-semibold mb-4 text-purple-600">Lenguajes</h3>
					<div className="flex flex-col space-y-3 items-start mt-2">
						<div className="flex items-center space-x-3">
							<SiHtml5 size={24} color="#E34F26" />
							<span className="text-md font-medium">HTML</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiCss3 size={24} color="#1572B6" />
							<span className="text-md font-medium">CSS</span>
						</div>
						<div className="flex items-center space-x-3">
							<FaJsSquare size={24} color="#F7DF1E" />
							<span className="text-md font-medium">JavaScript</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiTypescript size={24} color="#007ACC" />
							<span className="text-md font-medium">TypeScript</span>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center p-6 rounded-md shadow-lg bg-purple/10 hover:-translate-y-2 hover:scale-105 transition-transform duration-300">
					<h3 className="text-xl md:text-2xl font-semibold mb-4 text-purple-600">
						Herramientas y Frameworks
					</h3>
					<div className="flex flex-col space-y-3 items-start mt-2">
						<div className="flex items-center space-x-3">
							<SiReact size={24} color="#61DAFB" />
							<span className="text-md font-medium">React</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiAngular size={24} color="#DD0031" />
							<span className="text-md font-medium">Angular</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiNodedotjs size={24} color="#339933" />
							<span className="text-md font-medium">Node.js</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiNextdotjs size={24} color="#000000" />
							<span className="text-md font-medium">Next.js</span>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center p-6 rounded-md shadow-lg bg-purple/10 hover:rotate-3 hover:scale-105 transition-transform duration-300">
					<h3 className="text-xl md:text-2xl font-semibold mb-4 text-purple-600">
						Tecnologías a explorar
					</h3>
					<div className="flex flex-col space-y-3 items-start mt-2">
						<div className="flex items-center space-x-3">
							<SiSolidity size={24} color="#363636" />
							<span className="text-md font-medium">Solidity</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiGo size={24} color="#00ADD8" />
							<span className="text-md font-medium">Go</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiRust size={24} color="#000000" />
							<span className="text-md font-medium">Rust</span>
						</div>
						<div className="flex items-center space-x-3">
							<SiFlutter size={24} color="#02569B" />
							<span className="text-md font-medium">Flutter</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TechnologyStack;
