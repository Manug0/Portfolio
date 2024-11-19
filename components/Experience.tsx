import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./ui/AnimatedModal";

import { Button } from "./ui/MovingBorders";
import MagicButton from "./ui/MagicButton";
import React from "react";
import { workExperience } from "@/data";

const Experience = () => {
	const pdf = "/ManuelGonzálezGarcíaCV.pdf";

	return (
		<div className="py-20 w-full" id="experience">
			<h1 className="heading">
				Mi <span className="text-purple">experiencia</span>
			</h1>

			<div className="w-full md:w-9/12 mx-auto mt-12 grid grid-cols-1 gap-10 p-12">
				{workExperience.map((card) => (
					<Button
						key={card.id}
						duration={Math.floor(Math.random() * 10000) + 10000}
						borderRadius="1.75rem"
						style={{
							background: "rgb(4,7,29)",
							backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
							borderRadius: `calc(1.75rem* 0.96)`,
						}}
						className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800">
						<div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
							<img src={card.thumbnail} alt={card.thumbnail} className="lg:w-32 md:w-20 w-16" />
							<div className="lg:ms-5">
								<h1 className="text-start text-xl md:text-2xl font-bold">{card.title}</h1>
								<p className="text-start text-white-100 mt-3 font-semibold">{card.desc}</p>
							</div>
						</div>
					</Button>
				))}
			</div>
			<CvModal pdfUrl={pdf} />
		</div>
	);

	function CvModal({ pdfUrl }: { pdfUrl: string }) {
		return (
			<div className="pb-20 flex items-center justify-center">
				<Modal>
					<ModalTrigger>
						<MagicButton otherClasses="!text-xl" title="Ver CV" />
					</ModalTrigger>

					<ModalBody className="w-1/2">
						<ModalContent>
							<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
								Mi CV
							</h4>
							<div className="w-full h-[500px] overflow-hidden rounded-md border border-gray-300">
								<iframe
									src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
									className="w-full h-full"
									title="CV"
									frameBorder="0"></iframe>
							</div>
						</ModalContent>
						<ModalFooter className="gap-4">
							<a
								href={pdfUrl}
								download
								className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md border border-black">
								Descargar CV
							</a>
						</ModalFooter>
					</ModalBody>
				</Modal>
			</div>
		);
	}
};

export default Experience;
