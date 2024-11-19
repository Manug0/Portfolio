// import { Button } from "./ui/MovingBorders";
// import React from "react";
// import { workExperience } from "@/data";

// const Experience = () => {
// 	return (
// 		<div className="py-20 w-full" id="experience">
// 			<h1 className="heading">
// 				Mi <span className="text-purple">experiencia</span>
// 			</h1>

// 			<div className="w-9/12 mx-auto mt-12 grid grid-cols-1 gap-10 p-12">
// 				{workExperience.map((card) => (
// 					<Button
// 						key={card.id}
// 						duration={Math.floor(Math.random() * 10000) + 10000}
// 						borderRadius="1.75rem"
// 						style={{
// 							background: "rgb(4,7,29)",
// 							backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
// 							borderRadius: `calc(1.75rem* 0.96)`,
// 						}}
// 						className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800">
// 						<div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
// 							<img src={card.thumbnail} alt={card.thumbnail} className="lg:w-32 md:w-20 w-16" />
// 							<div className="lg:ms-5">
// 								<h1 className="text-start text-xl md:text-2xl font-bold">{card.title}</h1>
// 								<p className="text-start text-white-100 mt-3 font-semibold">{card.desc}</p>
// 							</div>
// 						</div>
// 					</Button>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default Experience;

"use client";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import React, { useEffect, useState } from "react";

import { AiOutlineDownload } from "react-icons/ai";
import MagicButton from "./ui/MagicButton";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

const Experience: React.FC = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [scale, setScale] = useState<number>(1);
	const [height, setHeight] = useState<number>(1300);

	const pdf = "/ManuelGonzálezGarcíaCV.pdf";

	useEffect(() => {
		const handleResize = () => {
			const newWidth = window.innerWidth;
			setWidth(newWidth);

			if (newWidth > 1500) {
				setScale(1.8);
				setHeight(1300);
			} else if (newWidth > 1000) {
				setScale(1.3);
				setHeight(1000);
			} else if (newWidth > 800) {
				setScale(1);
				setHeight(700);
			} else if (newWidth > 700) {
				setScale(0.8);
				setHeight(600);
			} else if (newWidth > 400) {
				setScale(0.6);
				setHeight(400);
			} else {
				setScale(0.5);
				setHeight(300);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="flex flex-col items-center min-h-screen relative mt-20 py-20 w-full" id="cv">
			<h1 className="heading">
				Mi <span className="text-purple">CV</span>
			</h1>
			<div className="flex justify-center w-full overflow-hidden my-8" style={{ height }}>
				<Document file={pdf} loading={<div className="text-lg my-8">Cargando PDF...</div>}>
					<Page pageNumber={1} scale={scale} />
				</Document>
			</div>

			<MagicButton
				href={pdf}
				target="_blank"
				download
				title="Descargar CV"
				icon={<AiOutlineDownload />}
				position="left"
			/>
		</div>
	);
};

export default Experience;
