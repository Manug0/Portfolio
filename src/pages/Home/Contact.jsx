import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ContactSection = styled.section`
	padding: 2rem 1rem;
	background-color: var(--bg-color);
	text-align: center;
`;

const ContactTitle = styled.h4`
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

const IconsContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
	margin-top: 1rem;
`;

const IconLink = styled.a`
	color: var(--text-color);
	font-size: 2rem;
	transition: color 0.3s ease;

	&:hover {
		color: var(--primary-color);
	}
`;

const Contact = () => {
	return (
		<ContactSection>
			<ContactTitle>Mis redes:</ContactTitle>
			<IconsContainer>
				<IconLink href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer">
					<FaGithub />
				</IconLink>
				<IconLink
					href="https://linkedin.com/in/tuusuario"
					target="_blank"
					rel="noopener noreferrer">
					<FaLinkedin />
				</IconLink>
			</IconsContainer>
		</ContactSection>
	);
};

export default Contact;
