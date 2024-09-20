import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineDownload } from "react-icons/ai";
import Particle from "../../components/Particles";
import pdf from "../../assets/ManuelGonzalezGarciaResume (1).pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	padding: 2rem;
	position: relative;
	margin-top: 5rem;

	/* @media (max-width: 1000px) {
		min-height: 0vh;
	} */
`;

const StyledButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background-color: var(--tertiary-color);
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	text-decoration: none;
	font-weight: bold;
	margin: 1rem 0;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #0056b3;
	}

	@media (max-width: 500px) {
		font-size: 0.6rem;
	}
`;

const StyledDocumentContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 2rem 0;
	height: ${({ height }) => height}px;
	overflow: hidden;
`;

const LoadingMessage = styled.div`
	font-size: 1.2rem;
	margin: 2rem 0;

	@media (max-width: 500px) {
		font-size: 0.6rem;
	}
`;

const GlobalStyle = createGlobalStyle`
  .markedContent {
    display: none !important;
  }
`;

const Cv = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [scale, setScale] = useState(1);
	const [height, setHeight] = useState(1300);

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
				setScale(0.5);
				setHeight(400);
			} else {
				setScale(0.4);
				setHeight(300);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<StyledContainer>
			<GlobalStyle />
			<Particle />
			<StyledButton href={pdf} target="_blank" download>
				<AiOutlineDownload />
				&nbsp;Descargar CV
			</StyledButton>

			<StyledDocumentContainer height={height}>
				<Document file={pdf} loading={<LoadingMessage>Cargando PDF...</LoadingMessage>}>
					<Page pageNumber={1} scale={scale} />
				</Document>
			</StyledDocumentContainer>

			<StyledButton href={pdf} target="_blank" download>
				<AiOutlineDownload />
				&nbsp;Descargar CV
			</StyledButton>
		</StyledContainer>
	);
};

export default Cv;
