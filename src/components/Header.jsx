import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const HeaderContainer = styled.nav`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background-color: transparent;
	transition: box-shadow 0.4s;
	z-index: 99;
	backdrop-filter: ${(props) => (props.blur ? "blur(10px)" : "none")};
	transition: backdrop-filter 0.5s;
`;

const NavContent = styled.div`
	position: relative;
	height: 6rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	@media (max-width: 768px) {
		justify-content: normal;
	}
`;

const Logo = styled.img`
	position: relative;
	left: 50px;
	width: 70px;
	height: 70px;
	cursor: pointer;

	@media (max-width: 1000px) {
		left: 0px;
		width: 50px;
		height: 50px;
	}

	@media (max-width: 768px) {
		position: absolute;
		left: 30px;
	}
`;

const NavList = styled.ul`
	list-style: none;
	display: flex;
	gap: 40px;

	@media (max-width: 768px) {
		flex-direction: column;
		position: fixed;
		top: 0;
		right: ${(props) => (props.open ? "0" : "-100%")};
		width: 70%;
		height: 100vh;
		background-color: var(--background-color);
		transition: right 0.3s ease-in-out;
		padding: 6rem 20px 20px;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
	}
`;

const NavItem = styled(NavLink)`
	--c: linear-gradient(var(--accent-color) 0 0);
	padding-bottom: 0.15em;
	background: var(--c), var(--c);
	background-size: 0.3em 0.1em;
	background-position: 50% 100%;
	background-repeat: no-repeat;
	transition: 0.3s linear, background-size 0.3s 0.2s linear;
	text-decoration: none;
	color: var(--text-color);
	font-size: 1.2rem;
	font-weight: 500;

	&::after {
		content: "";
		position: relative;
		display: block;
		height: 5px;
		width: 0;
		border-radius: 16px;
		background: var(--primary-color);
		bottom: 1px;
		left: 0;
		z-index: -1;
		transition: all 0.3s ease-out 0s;
	}

	&:hover::after {
		width: 100%;
	}

	@media (max-width: 1000px) {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		&:hover::after {
			width: 0%;
		}
	}
`;

const NavlinkContainer = styled.div`
	display: inline-flex;
	align-items: center;
`;

const HeaderButtons = styled.div`
	padding-right: 30px;
`;

const NavbarToggle = styled.label`
	display: none;
	font-size: 1.3rem;

	@media (max-width: 768px) {
		display: block;
		cursor: pointer;
		position: absolute;
		right: 30px;
		top: 40px;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(5px);
	z-index: 98;
	opacity: ${(props) => (props.open ? "1" : "0")};
	visibility: ${(props) => (props.open ? "visible" : "hidden")};
	transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const Header = () => {
	const [blur, setBlur] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	const navigate = useNavigate();

	const toggleHeaderBlur = () => {
		if (window.scrollY > 0) {
			setBlur(true);
		} else {
			setBlur(false);
		}
	};

	const handleOverlayClick = () => {
		setNavOpen(false);
	};

	const handleNavItemClick = () => {
		setNavOpen(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleHeaderBlur);
		return () => {
			window.removeEventListener("scroll", toggleHeaderBlur);
		};
	}, []);

	const goToHome = () => navigate("/");

	return (
		<>
			<HeaderContainer blur={blur}>
				<NavContent>
					<Logo src="/Logo.svg" alt="logo" onClick={goToHome} />
					<NavList open={navOpen}>
						<NavItem to="/" onClick={handleNavItemClick}>
							<NavlinkContainer>
								<GoHome />
								&nbsp; Inicio
							</NavlinkContainer>
						</NavItem>

						<NavItem to="/about" onClick={handleNavItemClick}>
							<NavlinkContainer>
								<FaRegUser size={"0.8em"} />
								&nbsp; Sobre mí
							</NavlinkContainer>
						</NavItem>
						<NavItem to="/projects" onClick={handleNavItemClick}>
							<NavlinkContainer>
								<FaProjectDiagram size={"0.8em"} />
								&nbsp; Proyectos
							</NavlinkContainer>
						</NavItem>
						<NavItem to="/CV" onClick={handleNavItemClick}>
							<NavlinkContainer>
								<FaFileAlt size={"0.8em"} />
								&nbsp; Currículum
							</NavlinkContainer>
						</NavItem>
					</NavList>
					<HeaderButtons>
						<NavbarToggle onClick={() => setNavOpen(!navOpen)}>
							{navOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}
						</NavbarToggle>
					</HeaderButtons>
				</NavContent>
			</HeaderContainer>
			<Overlay open={navOpen} onClick={handleOverlayClick} />
		</>
	);
};

export default Header;
