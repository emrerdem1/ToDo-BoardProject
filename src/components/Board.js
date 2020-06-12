import React, { useState, useEffect } from 'react';
import BoardItem from './BoardItem';
import db from './../firebaseConfig';
import { Grid, Row, Col, Container, Button } from 'react-bootstrap';

export default function Board({ singleBoard }) {
	// const priorities = [
	//     { value: 0, name: "low" },
	//     { value: 1, name: "medium" },
	//     { value: 2, name: "high" },
	//   ];
	//   const statusFlags = [
	//     { value: 0, name: "todo" },
	//     { value: 1, name: "planned" },
	//     { value: 2, name: "inProgress" },
	//     { value: 3, name: "done" },
	//     { value: 4, name: "testing" },
	//   ];
	const [ boardItems, setBoardItems ] = useState([]);

	useEffect(
		() => {
			db
				.collection('boards')
				.doc(singleBoard.id)
				.collection('boardItems')
				.orderBy('position')
				.onSnapshot((collection) => {
					const data = collection.docs.map((doc, index) => {
						const docData = { ...doc.data() };
						if (docData.position !== index + 1) docData.position = index + 1;
						return {
							...docData,
							id: doc.id
						};
					});
					setBoardItems([ ...data ]);
				});
		},
		[ singleBoard ]
	);

	const addBoardItem = (boardId) => {
		db.collection('boards').doc(boardId).collection('boardItems').add({
			position: boardItems.length + 1,
			title: `test - position: ${boardItems.length + 1}`
		});
	};

	return (
		<Col xs={11} sm={6} md={4} lg={3} xl={3} className="homepage-board">
			<Container className="board-description">
				<Container className="user-board-input">
					<p>name: {singleBoard.name}</p>
				</Container>
				<Button variant="outline-light" onClick={() => addBoardItem(singleBoard.id)}>
					Ekle
				</Button>
			</Container>
			{boardItems.map((boardItem) => {
				return <BoardItem key={boardItem.id} boardItem={boardItem} boardId={singleBoard.id} />;
			})}
		</Col>
	);
}
