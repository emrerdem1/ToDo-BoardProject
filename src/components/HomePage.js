import React, { useContext } from 'react';
import Board from './Board';
import { BoardStore } from './BoardSections';
import db from '../firebaseConfig';
import { Grid, Row, Col, Button, Container } from 'react-bootstrap';
import { defaultStyle } from './DefaultStyle';

const HomePage = () => {
	const [boards, setBoards] = useContext(BoardStore);

	const addBoard = () => {
		db.collection('boards').add({
			position: boards.length + 1,
			name: ''
		});
	};
	return (
		<Container fluid className="boards-container" style={defaultStyle}>
			<Row>
				{boards.map((board) => {
					return <Board key={board.id} singleBoard={board} />;
				})}
				<Col xs={11} sm={6} md={4} lg={3} xl={3}>
					<Container className="add-section">
						<Button className='add-general-board' onClick={addBoard}>Add Board</Button>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};
export default HomePage;
