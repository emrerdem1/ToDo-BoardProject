import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ProgressPage from './ProgressPage';

function RouteBlock() {
	return (
		<Switch>
			<Route path="/about" component={AboutPage} />
			<Route path="/progress" component={ProgressPage} />
			<Route exact path="/" component={HomePage} />
		</Switch>
	);
}

export default RouteBlock;
