import React from "react";
import "./App.css";
import {BoardSections} from './components/BoardSections';
import HomePage from './components/HomePage';
import { Container } from 'react-bootstrap';


const App = (props) => {
  
  return (
    <BoardSections>
		<Container fluid >
			<HomePage />
		</Container>
	</BoardSections>
  );
}

export default App;
