import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

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
`;

const Logo = styled.img`
	position: relative;
	left: 50px;
	width: 70px;
	height: 70px;
	border-radius: 20px;
`;

const NavList = styled.ul`
	list-style: none;
	display: flex;
	gap: 40px;
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
`;

const Header = () => {
	const [blur, setBlur] = useState(false);

	const toggleHeaderBlur = () => {
		if (window.scrollY > 0) {
			setBlur(true);
		} else {
			setBlur(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleHeaderBlur);
		return () => {
			window.removeEventListener("scroll", toggleHeaderBlur);
		};
	}, []);

	return (
		<HeaderContainer blur={blur}>
			<NavContent>
				<Logo src="./assets/Manu-logo.jpeg" alt="logo" className="menu" />
				<NavList>
					<NavItem to="/">
						<NavlinkContainer>
							<GoHome />
							&nbsp; Inicio
						</NavlinkContainer>
					</NavItem>

					<NavItem to="/about">
						<NavlinkContainer>
							<FaRegUser size={"0.8em"} />
							&nbsp; Sobre mí
						</NavlinkContainer>
					</NavItem>
					<NavItem to="/projects">
						<NavlinkContainer>
							<FaProjectDiagram size={"0.8em"} />
							&nbsp; Proyectos
						</NavlinkContainer>
					</NavItem>
					<NavItem to="/CV">
						<NavlinkContainer>
							<FaFileAlt size={"0.8em"} />
							&nbsp;Currículum
						</NavlinkContainer>
					</NavItem>
				</NavList>
				<HeaderButtons>
					<NavbarToggle>
						<RxHamburgerMenu />
					</NavbarToggle>
				</HeaderButtons>
			</NavContent>
		</HeaderContainer>
	);
};

export default Header;
