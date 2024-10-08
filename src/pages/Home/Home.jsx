import styled from "styled-components";
import Type from "./Type";
import Particle from "../../components/Particles";
import Tilt from "react-parallax-tilt";
import Intro from "./Intro";
import Arrow from "./Arrow";
import ContactForm from "./ContactForm";
import Contact from "./Contact";

const HomeSection = styled.section`
	position: relative;
	margin-top: 96px;
`;

const HomeContainer = styled.div`
	padding: 2rem 1rem;
	display: flex;
	justify-content: space-evenly;
	gap: 16px;
	width: 80%;
	margin: auto;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
	}

	@media (max-width: 400px) {
		width: 100%;
	}
`;

const HomeCol = styled.div`
	flex: 0 0 45%;
	max-width: 45%;

	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

const Heading = styled.h1`
	padding-bottom: 15px;
	font-size: 2.5rem;
	font-weight: 700;

	@media (max-width: 1300px) {
		font-size: 2rem;
	}

	@media (max-width: 400px) {
		font-size: 1.4rem;
	}
`;

const HeadingName = styled.h2`
	font-size: 2.5rem;
	font-weight: 700;

	@media (max-width: 1300px) {
		font-size: 2rem;
	}

	@media (max-width: 400px) {
		font-size: 1.4rem;
	}
`;

const MainName = styled.strong`
	color: var(--primary-color);

	@media (max-width: 1300px) {
		font-size: 2rem;
	}

	@media (max-width: 400px) {
		font-size: 1.4rem;
	}
`;

const TypeWrapper = styled.div`
	font-size: 2rem;
	color: var(--primary-color);
	padding: 50px 0;
	text-align: left;

	@media (max-width: 1300px) {
		font-size: 1.5rem;
	}

	@media (max-width: 1000px) {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		text-align: center;
	}

	@media (max-width: 400px) {
		font-size: 1.1rem;
	}
`;

const CVImage = styled.img`
	object-fit: cover;
	width: 210px;
	height: 200px;
	border-radius: 50%;

	@media (max-width: 1300px) {
		width: 175px;
		height: 170px;
	}

	@media (max-width: 500px) {
		width: 130px;
		height: 125px;
	}
`;

const Home = () => {
	return (
		<>
			<HomeSection>
				<Particle />
				<HomeContainer>
					<HomeCol>
						<Heading>Hola!</Heading>
						<HeadingName>
							Soy
							<MainName> Manuel González</MainName>
						</HeadingName>
						<TypeWrapper>
							<Type />
						</TypeWrapper>
					</HomeCol>
					<Arrow />
					<Tilt>
						<CVImage src="/Foto CV.jpeg" alt="CV image" />
					</Tilt>
				</HomeContainer>
			</HomeSection>
			<Intro />
			<ContactForm />
			<Contact />
		</>
	);
};

export default Home;
