import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BoardSections } from './components/BoardSections';
import RouteBlock from './components/RouteBlock'
import NavBar from './components/NavBar';

const App = (props) => {
	return (
		<BoardSections>
			<NavBar />
			<RouteBlock />
		</BoardSections>
	);
};

export default App;
