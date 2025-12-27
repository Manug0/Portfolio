"use client";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";

import { Button } from "./ui/MovingBorders";
import { workExperience } from "@/data";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

const LoadingMessage = "Cargando CV...";

const Experience = () => {
	const [pdfWidth, setPdfWidth] = useState(770);
	const pdf = "/Manuel_Gonzalez_Garcia_CV.pdf";
	const pageNumber = 1;

	useEffect(() => {
		const updatePdfWidth = () => {
			const containerWidth = Math.min(window.innerWidth - 64, 770);
			setPdfWidth(containerWidth);
		};

		updatePdfWidth();

		window.addEventListener("resize", updatePdfWidth);

		return () => {
			window.removeEventListener("resize", updatePdfWidth);
		};
	}, []);

	return (
		<div className="lg:mt-36 lg:mb-20 w-full" id="experience">
			<h1 className="heading">
				Mi <span className="text-purple">experiencia</span>
			</h1>
			<div className="w-full md:w-9/12 mx-auto mt-12 grid grid-cols-1 gap-10 p-6 lg:p-12">
				{workExperience.map((card) => (
					<Button
						key={card.id}
						duration={Math.floor(Math.random() * 10000) + 10000}
						borderRadius="1.75rem"
						style={{
							background: "rgb(4,7,29)",
							backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
							borderRadius: `calc(1.75rem* 0.96)`,
						}}>
						<div className="flex items-center">
							<img src={card.thumbnail} alt={card.thumbnail} className="lg:w-32 md:w-20 w-10 m-4" />
							<div className="lg:ms-5">
								<h1 className="text-start text-md md:text-2xl mt-3 font-bold">{card.title}</h1>
								<p className="text-start text-white-100 text-xs md:text-sm my-3 font-semibold">
									{card.desc}
								</p>
							</div>
						</div>
					</Button>
				))}
			</div>

			<div id="cv" className="py-20 flex flex-col items-center justify-center px-4">
				<h1 className="heading">
					Mi <span className="text-purple">CV</span>
				</h1>
				<div className="w-full mt-12 max-w-3xl mx-auto">
					<div className="w-full min-h-[500px] overflow-hidden rounded-md border border-gray-300 bg-white">
						<Document file={pdf} loading={LoadingMessage}>
							<Page
								pageNumber={pageNumber}
								width={pdfWidth}
								renderTextLayer={false}
								renderAnnotationLayer={false}
							/>
						</Document>
					</div>
					<a
						href={pdf}
						download
						className="block w-fit mx-auto px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md border border-black mt-4 hover:bg-opacity-80 transition-all">
						Descargar CV
					</a>
				</div>
			</div>
		</div>
	);
};

export default Experience;
