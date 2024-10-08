import styled from "styled-components";
import TechStack from "./TechStack";
import Particle from "../../components/Particles";
import CareerJourneyTimeline from "./VisualElment";

const AboutSection = styled.section`
	margin-top: 5rem;
	padding: 4rem 0;
	position: relative;
`;

const AboutContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
`;

const IntroSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 4rem;
	width: 80%;
	margin: auto;
`;

const IntroText = styled.div`
	flex: 1;
	padding-right: 2rem;
`;

const IntroTitle = styled.h2`
	font-size: 2.5rem;
	color: var(--primary-color);
	margin-bottom: 1rem;

	@media (max-width: 1000px) {
		font-size: 2rem;
	}

	@media (max-width: 768px) {
		font-size: 1.5rem;
	}
`;

const IntroParagraph = styled.p`
	font-size: 1.1rem;
	line-height: 1.6;
	margin-bottom: 1rem;
	text-align: left;

	@media (max-width: 1000px) {
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		font-size: 0.8rem;
	}

	@media (max-width: 500px) {
		font-size: 0.6rem;
	}
`;

const IntroSpan = styled.span`
	font-weight: 500;
	color: var(--primary-color);
`;

const About = () => {
	return (
		<AboutSection>
			<Particle />
			<AboutContainer>
				<IntroSection>
					<IntroText>
						<IntroTitle>Sobre Mí</IntroTitle>
						<IntroParagraph>
							Soy un desarrollador web junior con una sólida base en economía. Mi trayectoria
							comenzó en el mundo financiero, pero mi pasión por la tecnología me llevó a dar un
							giro en mi carrera.
						</IntroParagraph>
						<IntroParagraph>
							Recientemente completé un máster en <IntroSpan>ThePower Business School</IntroSpan> ,
							donde adquirí habilidades técnicas y de negocio que me permiten aportar una
							perspectiva única al desarrollo web.
						</IntroParagraph>
						<IntroParagraph>
							Mi background económico, combinado con mis habilidades en desarrollo fullstack, me
							permite crear soluciones web que no solo son técnicamente sólidas, sino que también
							están alineadas con objetivos de negocio.
						</IntroParagraph>
					</IntroText>
					{/* <CareerJourneyTimeline></CareerJourneyTimeline> */}
				</IntroSection>
				<TechStack />
			</AboutContainer>
		</AboutSection>
	);
};

export default About;
