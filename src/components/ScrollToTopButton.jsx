import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import styled from "styled-components";

const StyledButton = styled.button`
	background-color: var(--primary-color);
	color: white;
	position: fixed;
	bottom: 80px;
	right: 50px;
	z-index: 1000;
	padding: 0.8rem;
	border-radius: 50%;
	opacity: ${(props) => (props.isVisible ? "0.8" : "0")};
	transition: opacity 0.3s;

	@media (max-width: 768px) {
		right: 30px;
		bottom: 30px;
		padding: 0.6rem;
	}
`;

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 0) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<StyledButton
			isVisible={isVisible}
			onClick={scrollToTop}
			pointerEvents={isVisible ? "auto" : "none"}>
			<FaAngleUp />
		</StyledButton>
	);
};

export default ScrollToTopButton;
