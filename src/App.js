import React from "react";
import "./App.css";
import {BoardSections} from './components/BoardSections';
import HomePage from './components/HomePage';


const App = (props) => {
  
  return (
    <BoardSections>
		<div className='App'>
		<HomePage />
		</div>
	</BoardSections>
  );
}

export default App;
