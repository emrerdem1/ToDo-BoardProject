import React, { Fragment } from 'react';
import './App.css';
import RouteBlock from './components/RouteBlock';
import NavBar from './components/NavBar';

const App = () => {
	return (
		<Fragment>
			<NavBar />
			<RouteBlock />
		</Fragment>
	);
};

export default App;
