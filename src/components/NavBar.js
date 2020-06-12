import React from 'react';
import { Navbar, Button, Form, Nav, FormControl } from 'react-bootstrap';
import { defaultStyle } from './DefaultStyle';

const NavBar = () => {
	return (
		<Navbar bg="dark" variant="dark" fixed="top" style={defaultStyle}>
			<Navbar.Brand href="#home">Burak & Emre</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#">Home</Nav.Link>
					<Nav.Link href="#">About</Nav.Link>
					<Nav.Link href="#">Progress</Nav.Link>
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
