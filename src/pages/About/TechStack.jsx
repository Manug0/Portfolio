import styled from "styled-components";
import {
	FaHtml5,
	FaCss3Alt,
	FaJs,
	FaReact,
	FaNodeJs,
	FaAngular,
	FaFigma,
	FaPython,
	FaEthereum,
} from "react-icons/fa";
import { SiTypescript, SiExpress, SiNextdotjs, SiMongodb, SiRust, SiGo } from "react-icons/si";
import { GrGraphQl } from "react-icons/gr";

const TechStackSection = styled.section`
	padding: 4rem 0;
`;

const SectionTitle = styled.h2`
	font-size: 2.5rem;
	margin-bottom: 2rem;
	text-align: center;
`;

const TechStackGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
`;

const TechCategory = styled.div`
	border-radius: 8px;
	padding: 1.5rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(2px);
	background-color: #4646632f;
`;

const CategoryTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 1rem;
	color: var(--primary-color);
`;

const TechList = styled.ul`
	list-style-type: none;
	padding: 0;
`;

const TechItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-bottom: 0.5rem;
	font-size: 1.1rem;
`;

const TechIcon = styled.span`
	margin-right: 0.5rem;
	font-size: 1.5rem;
`;

const TechStack = () => {
	return (
		<TechStackSection>
			<SectionTitle>Tech Stack</SectionTitle>
			<TechStackGrid>
				<TechCategory>
					<CategoryTitle>Lenguajes de Programación</CategoryTitle>
					<TechList>
						<TechItem>
							HTML
							<TechIcon>
								<FaHtml5 />
							</TechIcon>
						</TechItem>
						<TechItem>
							CSS
							<TechIcon>
								<FaCss3Alt />
							</TechIcon>
						</TechItem>
						<TechItem>
							JavaScript
							<TechIcon>
								<FaJs />
							</TechIcon>
						</TechItem>
						<TechItem>
							TypeScript
							<TechIcon>
								<SiTypescript />
							</TechIcon>
						</TechItem>
						<TechItem>
							Python
							<TechIcon>
								<FaPython />
							</TechIcon>
						</TechItem>
					</TechList>
				</TechCategory>
				<TechCategory>
					<CategoryTitle>Frameworks y Librerías</CategoryTitle>
					<TechList>
						<TechItem>
							React
							<TechIcon>
								<FaReact />
							</TechIcon>
						</TechItem>
						<TechItem>
							Node.js
							<TechIcon>
								<FaNodeJs />
							</TechIcon>
						</TechItem>
						<TechItem>
							Express.js
							<TechIcon>
								<SiExpress />
							</TechIcon>
						</TechItem>
						<TechItem>
							Angular
							<TechIcon>
								<FaAngular />
							</TechIcon>
						</TechItem>
						<TechItem>
							Next.js
							<TechIcon>
								<SiNextdotjs />
							</TechIcon>
						</TechItem>
					</TechList>
				</TechCategory>
				<TechCategory>
					<CategoryTitle>Herramientas y Tecnologías</CategoryTitle>
					<TechList>
						<TechItem>
							Figma básico
							<TechIcon>
								<FaFigma />
							</TechIcon>
						</TechItem>
						<TechItem>
							MongoDB
							<TechIcon>
								<SiMongodb />
							</TechIcon>
						</TechItem>
						<TechItem>
							RESTful APIs
							<TechIcon>
								<GrGraphQl />
							</TechIcon>
						</TechItem>
					</TechList>
				</TechCategory>
				<TechCategory>
					<CategoryTitle>Tecnologías a explorar</CategoryTitle>
					<TechList>
						<TechItem>
							Solidity
							<TechIcon>
								<FaEthereum />
							</TechIcon>
						</TechItem>
						<TechItem>
							Rust
							<TechIcon>
								<SiRust />
							</TechIcon>
						</TechItem>
						<TechItem>
							Go
							<TechIcon>
								<SiGo />
							</TechIcon>
						</TechItem>
					</TechList>
				</TechCategory>
			</TechStackGrid>
		</TechStackSection>
	);
};

export default TechStack;
