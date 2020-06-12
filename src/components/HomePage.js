import React, { useContext } from 'react';
import Board from './Board';
import { BoardStore } from './BoardSections';
import db from '../firebaseConfig';
import { Grid, Row, Col, Button, Container } from 'react-bootstrap';
import { defaultStyle } from './DefaultStyle';

const HomePage = () => {
	const [ boards, setBoards ] = useContext(BoardStore);

	const addBoard = () => {
		db.collection('boards').add({
			position: boards.length + 1,
			name: 'custom board2'
		});
	};
	return (
		<Container fluid className="boards-container" style={defaultStyle}>
			<Row>
				{boards.map((board) => {
					return <Board key={board.id} singleBoard={board} />;
				})}
				<Container className="add-section">
					<Button className='add-general-board' onClick={addBoard}>Board Ekle</Button>
				</Container>
			</Row>
		</Container>
	);
};
export default HomePage;
