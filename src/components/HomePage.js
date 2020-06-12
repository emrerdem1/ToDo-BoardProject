import React, { useContext } from 'react';
import Board from './Board';
import { BoardStore } from './BoardSections';
import db from '../firebaseConfig';
import { Grid, Row, Col } from 'react-bootstrap';

const HomePage = () => {
	const [ boards, setBoards ] = useContext(BoardStore);

	const addBoard = () => {
		db.collection('boards').add({
			position: boards.length + 1,
			name: 'custom board2'
		});
	};
	return (
		<Row>
			{boards.map((board) => {
				return <Board key={board.id} singleBoard={board} />;
			})}
			<div className="add-section">
				<button onClick={addBoard}>Board Ekle</button>
			</div>
		</Row>
	);
};
export default HomePage;
