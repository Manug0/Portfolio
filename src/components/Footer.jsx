import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled.footer`
	background-color: var(--background-color);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4rem;
	color: var(--text-color);
	padding: 1.5rem;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 1rem;
	}
`;

const FooterText = styled.p`
	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const Copy = styled.p`
	font-size: 1rem;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const IconsContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 1rem;
`;

const IconLink = styled.a`
	color: var(--text-color);
	font-size: 1.5rem;
	transition: color 0.3s ease;

	&:hover {
		color: var(--primary-color);
	}

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const Footer = () => {
	return (
		<FooterContainer>
			<FooterText>Diseñado por Manu 🖌️</FooterText>
			<Copy>&copy; {new Date().getFullYear()} Mg. Todos los derechos reservados.</Copy>
			<IconsContainer>
				<IconLink href="https://github.com/Manug0" target="_blank" rel="noopener noreferrer">
					<FaGithub />
				</IconLink>
				<IconLink
					href="https://www.linkedin.com/in/manuel-gonz%C3%A1lez-garc%C3%ADa/"
					target="_blank"
					rel="noopener noreferrer">
					<FaLinkedin />
				</IconLink>
			</IconsContainer>
		</FooterContainer>
	);
};

export default Footer;
