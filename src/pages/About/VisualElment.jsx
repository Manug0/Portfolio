import { useState } from "react";
import { motion } from "framer-motion";
import { ChartBar, Code, GraduationCap, Briefcase } from "lucide-react";

const careerSteps = [
	{ icon: ChartBar, title: "Economía", description: "Inicié mi carrera en el mundo financiero" },
	{
		icon: GraduationCap,
		title: "Máster",
		description: "Completé un máster en ThePower Business School",
	},
	{
		icon: Code,
		title: "Desarrollo Web",
		description: "Me sumergí en el aprendizaje del desarrollo web",
	},
	{
		icon: Briefcase,
		title: "Desarrollador Full Stack",
		description: "Combino economía y desarrollo en soluciones web",
	},
];

const CareerJourneyTimeline = () => {
	const [hoveredStep, setHoveredStep] = useState(null);

	return (
		<motion.div
			className="w-full h-[400px] bg-gray-100 rounded-lg shadow-lg p-8 relative overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}>
			<h3 className="text-2xl font-bold mb-6 text-center">Mi Trayectoria Profesional</h3>
			<div className="relative">
				{/* Línea de tiempo */}
				<motion.div
					className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500"
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					transition={{ duration: 1 }}
				/>

				{careerSteps.map((step, index) => (
					<motion.div
						key={step.title}
						className={`flex items-center mb-8 ${
							index % 2 === 0 ? "justify-start" : "justify-end"
						}`}
						initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}>
						<motion.div
							className={`w-5/12 bg-white p-4 rounded-lg shadow-md ${
								index % 2 === 0 ? "mr-8" : "ml-8"
							}`}
							whileHover={{ scale: 1.05 }}
							onHoverStart={() => setHoveredStep(index)}
							onHoverEnd={() => setHoveredStep(null)}>
							<div className="flex items-center mb-2">
								<step.icon className="w-6 h-6 mr-2 text-blue-500" />
								<h4 className="text-lg font-semibold">{step.title}</h4>
							</div>
							<p className="text-sm text-gray-600">{step.description}</p>
						</motion.div>

						<motion.div
							className="w-4 h-4 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
						/>
					</motion.div>
				))}
			</div>

			{hoveredStep !== null && (
				<motion.div
					className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}>
					<p className="text-sm font-semibold">{careerSteps[hoveredStep].title}</p>
				</motion.div>
			)}
		</motion.div>
	);
};

export default CareerJourneyTimeline;
