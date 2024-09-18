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
`;

const FooterText = styled.p`
	/* margin-bottom: 0.5rem; */
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
`;

const Footer = () => {
	return (
		<FooterContainer>
			<FooterText>Diseñado con ❤️ por Manu</FooterText>
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
