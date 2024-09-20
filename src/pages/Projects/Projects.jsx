import styled from "styled-components";
import Particle from "../../components/Particles";
import { FaGithub } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

const ProjectsSection = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 2rem;
	margin-top: 5rem;
`;

const ProjectsIntro = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
`;

const IntroH2 = styled.h2`
	font-size: 30px;
	font-weight: 500;
	color: var(--primary-color);

	@media (max-width: 768px) {
		font-size: 1.3rem;
	}
`;

const IntroH3 = styled.h3`
	font-size: 20px;
	font-weight: 500;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const ProjectsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: minmax(100px, auto);
	gap: 10px;
	min-height: 80vh;
	margin: auto;
	margin-top: 3rem;
	width: 80%;

	@media (max-width: 500px) {
		display: flex;
		width: 90%;
	}
`;

const ProjectCard = styled.div`
	background-color: var(--background-color);
	padding: 1.5rem;
	height: fit-content;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(2px);
	background-color: #4646632f;
	transition: all 0.3s ease;
	position: relative;

	&:hover {
		box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 400px) {
		padding: 1rem;
	}
`;

const ProjectImg = styled.img`
	width: 70%;
	margin: auto;
`;

const ProjectTitle = styled.h4`
	font-size: 1.5rem;
	font-weight: 500;
	color: var(--primary-color);
	margin-top: 2rem;

	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

const Description = styled.p`
	padding: 1rem;
	text-align: left;

	@media (max-width: 1300px) {
		font-size: 0.8rem;
	}

	@media (max-width: 768px) {
		font-size: 0.6rem;
	}
`;

const ProjectButtons = styled.div`
	display: flex;
	gap: 2rem;
	width: 80%;
	margin: auto;
	padding: 0.7rem 0;

	@media (max-width: 1300px) {
		width: 100%;
	}

	@media (max-width: 768px) {
		gap: 1rem;
	}
`;

const VisitButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin: auto;

	&:hover {
		background-color: var(--secondary-color);
	}

	@media (max-width: 768px) {
		font-size: 0.8rem;
		padding: 0.3rem 0.6rem;
	}
`;

const VisitIcon = styled(AiOutlineLink)`
	height: fit-content;
	font-size: 20px;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const GithubButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin: auto;

	&:hover {
		background-color: var(--secondary-color);
	}

	@media (max-width: 768px) {
		font-size: 0.8rem;
		padding: 0.3rem 0.6rem;
	}
`;

const GithubIcon = styled(FaGithub)`
	height: fit-content;
	font-size: 20px;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const Projects = () => {
	return (
		<ProjectsSection>
			<Particle />
			<ProjectsIntro>
				<IntroH2>Proyectos recientes</IntroH2>
				<IntroH3>Estos son algunos de mis proyectos destacados</IntroH3>
			</ProjectsIntro>
			<ProjectsContainer>
				<ProjectCard>
					<ProjectImg src="/phone-fusion.png" alt="laptop" />
					<ProjectTitle>Phone Fusion</ProjectTitle>
					<Description>
						Phone Fusion es una tienda en línea de dispositivos móviles desarrollada con la
						arquitectura MERN. Ofrece una experiencia de compra intuitiva con funciones como
						búsqueda avanzada entre 100 móviles, lista de favoritos y carrito de compras. El
						proyecto destaca por su diseño responsive, autenticación de usuarios y gestión de
						pedidos, demostrando habilidades en desarrollo full-stack y diseño de interfaces
						atractivas.
					</Description>
					<ProjectButtons>
						<VisitButton
							href="https://phone-fusion.vercel.app"
							target="_blank"
							rel="noopener noreferrer">
							<VisitIcon />
							&nbsp;Visitar
						</VisitButton>
						<GithubButton
							href="https://github.com/Manug0/Phone-Fusion"
							target="_blank"
							rel="noopener noreferrer">
							<GithubIcon />
							&nbsp;GitHub
						</GithubButton>
					</ProjectButtons>
				</ProjectCard>
			</ProjectsContainer>
		</ProjectsSection>
	);
};

export default Projects;
