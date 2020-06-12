import React from 'react';
import './App.css';
import { BoardSections } from './components/BoardSections';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

const App = (props) => {
	return (
		<BoardSections>
			<NavBar />
			<HomePage />
		</BoardSections>
	);
};

export default App;
