import React from 'react';
import { Navbar, Button, Form, Nav, FormControl, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<Navbar variant="dark" className="d-flex flex-column position-fixed">
			<Image src="https://i.imgyukle.com/2020/06/20/CHxJ0p.png" alt="logo"></Image>
			<Nav className="mr-auto d-flex flex-column">
				<Nav.Link>
					<NavLink exact to="/" className="nav-inactive">
						<i class="fas fa-home"></i>
					</NavLink>
				</Nav.Link>
				<Nav.Link>
					<NavLink to="/about" className="nav-inactive">
						<i class="fas fa-info-circle"></i>
					</NavLink>
				</Nav.Link>
				<Nav.Link>
					<NavLink to="/progress" className="nav-inactive">
						<i class="fas fa-tasks"></i>
					</NavLink>
				</Nav.Link>
			</Nav>
		</Navbar>
	);
};

export default NavBar;
