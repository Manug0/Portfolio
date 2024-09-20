import styled, { keyframes } from "styled-components";
import BitcoinIcon from "./BitcoinIcon";
import PCIcon from "./PCIcon";

const IntroSection = styled.section`
	padding: 4rem 0;
`;

const IntroContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	text-align: left;

	@media (max-width: 500px) {
		width: 80%;
		text-align: center;
		margin: auto;
	}
`;

const IntroWrapper = styled.div`
	display: flex;
	width: 90%;
	margin: auto;
	justify-content: space-around;

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const IntroTitle = styled.h2`
	font-size: 2.5rem;
	color: var(--primary-color);
	margin-bottom: 2rem;

	@media (max-width: 1300px) {
		font-size: 2rem;
	}

	@media (max-width: 400px) {
		font-size: 1.5rem;
	}
`;

const IntroText = styled.p`
	font-size: 1.2rem;
	line-height: 1.6;
	color: var(--text-color);
	margin-bottom: 1.5rem;

	@media (max-width: 1300px) {
		font-size: 1rem;
	}

	@media (max-width: 500px) {
		font-size: 0.8rem;
	}
`;

const BlockchainSpan = styled.span`
	font-weight: 700;
`;

const IntroSpans = styled.span`
	font-weight: 500;
	color: var(--primary-color);
`;

const IconsContainer = styled.div`
	display: flex;
	gap: 5rem;

	@media (max-width: 1100px) {
		gap: 2rem;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: space-around;
	}

	@media (max-width: 500px) {
		flex-direction: row;
	}
`;

const rotate = keyframes`
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
`;

const BitcoinIconWrapper = styled.div`
	margin-top: 8rem;
	animation: ${rotate} 5s linear infinite;
	height: fit-content;

	@media (max-width: 768px) {
		margin-top: 0rem;
	}

	@media (max-width: 500px) {
		padding: 10px;
	}
`;

const Intro = () => {
	return (
		<IntroSection>
			<IntroTitle>¿Quién soy?</IntroTitle>
			<IntroWrapper>
				<IntroContainer>
					<IntroText>Soy desarrollador web junior.</IntroText>
					<IntroText>
						El lenguaje que más domino es <IntroSpans>JavaScript</IntroSpans> junto con librerías
						como <IntroSpans>React</IntroSpans> y frameworks como
						<IntroSpans> Node.js</IntroSpans>
					</IntroText>
					<IntroText>
						Estoy explorando constantemente nuevos lenguajes y frameworks: actualmente estoy
						aprendiendo <IntroSpans>TypeScript</IntroSpans> y <IntroSpans>Angular</IntroSpans> y en
						más tarde les seguirán <IntroSpans>Python</IntroSpans> y{" "}
						<IntroSpans>Next.js</IntroSpans>
					</IntroText>
					<IntroText>
						A parte del desarrollo web, tengo un gran interés en la tecnología{" "}
						<BlockchainSpan>Blockchain</BlockchainSpan> y no descarto profundizar en ella en un
						futuro.
					</IntroText>
				</IntroContainer>
				<IconsContainer>
					<PCIcon />
					<BitcoinIconWrapper>
						<BitcoinIcon />
					</BitcoinIconWrapper>
				</IconsContainer>
			</IntroWrapper>
		</IntroSection>
	);
};

export default Intro;
