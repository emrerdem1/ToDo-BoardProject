import React from 'react';
import { Navbar, Button, Form, Nav, FormControl } from 'react-bootstrap';
import { defaultStyle } from './DefaultStyle';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
	return (
		<Navbar bg="dark" variant="dark" fixed="top" style={defaultStyle}>
			<Navbar.Brand>
				<NavLink exact to="/" className="nav-inactive">
					Burak & Emre
				</NavLink>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link>
						<NavLink exact to="/" className="nav-inactive">
							Home
						</NavLink>
					</Nav.Link>
					<Nav.Link>
						<NavLink to="/about" className="nav-inactive">
							About
						</NavLink>
					</Nav.Link>
					<Nav.Link>
						<NavLink to="/progress" className="nav-inactive">
							Progress
						</NavLink>
					</Nav.Link>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
