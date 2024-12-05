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
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
				<div className="flex flex-col items-center p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
					<h3 className="text-xl font-medium mb-4">Lenguajes</h3>
					<div className="flex flex-col space-y-2 items-start">
						<div className="flex items-center space-x-2">
							<SiHtml5 size={20} color="#E34F26" />
							<span className="text-sm">HTML</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiCss3 size={20} color="#1572B6" />
							<span className="text-sm">CSS</span>
						</div>
						<div className="flex items-center space-x-2">
							<FaJsSquare size={20} color="#F7DF1E" />
							<span className="text-sm">JavaScript</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiTypescript size={20} color="#007ACC" />
							<span className="text-sm">TypeScript</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
					<h3 className="text-xl font-medium mb-4">Herramientas y Frameworks</h3>
					<div className="flex flex-col space-y-2 items-start">
						<div className="flex items-center space-x-2">
							<SiReact size={20} color="#61DAFB" />
							<span className="text-sm">React</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiAngular size={20} color="#DD0031" />
							<span className="text-sm">Angular</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiNodedotjs size={20} color="#339933" />
							<span className="text-sm">Node.js</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiNextdotjs size={20} color="#000000" />
							<span className="text-sm">Next.js</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
					<h3 className="text-xl font-medium mb-4">Aprendiendo</h3>
					<div className="flex flex-col space-y-2 items-start">
						<div className="flex items-center space-x-2">
							<SiSolidity size={20} color="#363636" />
							<span className="text-sm">Solidity</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiGo size={20} color="#00ADD8" />
							<span className="text-sm">Go</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiRust size={20} color="#000000" />
							<span className="text-sm">Rust</span>
						</div>
						<div className="flex items-center space-x-2">
							<SiFlutter size={20} color="#02569B" />
							<span className="text-sm">Flutter</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TechnologyStack;
