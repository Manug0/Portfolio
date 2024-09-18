import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
	justify-content: space-between;
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
	gap: 20px;
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

	&:hover {
		background-size: 40% 0.1em;
		background-position: 10% 100%, 90% 100%;
		transform: scale(1.1);
		color: var(--accent-color);
	}
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
					<NavItem to="/">Inicio</NavItem>
					<NavItem to="/about">Sobre mí</NavItem>
					<NavItem to="/projects">Proyectos</NavItem>
					<NavItem to="/CV">Currículum</NavItem>
				</NavList>
				<HeaderButtons>
					<NavbarToggle htmlFor="chkToggle">
						<i className="ri-menu-3-line"></i>
					</NavbarToggle>
				</HeaderButtons>
			</NavContent>
		</HeaderContainer>
	);
};

export default Header;
