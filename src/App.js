import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import RouteBlock from './components/RouteBlock';
import NavBar from './components/NavBar';

const App = (props) => {
	return (
		<Fragment>
			<NavBar />
			<RouteBlock />
		</Fragment>
	);
};

export default App;
