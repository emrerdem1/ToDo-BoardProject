import React from 'react';
import { Navbar, Image, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<Navbar variant="dark" className="d-flex flex-column position-fixed">
			<Image src="https://i.imgyukle.com/2020/06/20/CHxJ0p.png" alt="logo"></Image>
			<Nav className="mr-auto d-flex flex-column">
				<NavLink exact to="/" className="nav-inactive nav-link">
					<i className="fas fa-home"></i>
				</NavLink>
				<NavLink to="/about" className="nav-inactive nav-link">
					<i className="fas fa-info-circle"></i>
				</NavLink>
				<NavLink to="/progress" className="nav-inactive nav-link">
					<i className="fas fa-tasks"></i>
				</NavLink>
			</Nav>
		</Navbar>
	);
};

export default NavBar;
