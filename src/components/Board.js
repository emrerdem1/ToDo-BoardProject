import React, { useState, useEffect } from 'react';
import BoardItem from './BoardItem';
import db from './../firebaseConfig';
import { Grid, Row, Col, Container, Button } from 'react-bootstrap';
import { IconButton, Icon } from '@material-ui/core';
import EditBoard from './EditBoard';

export default function Board({ singleBoard }) {
	const [showModal, setShowModal] = useState(false);
	const [boardItems, setBoardItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		db.collection("boards").doc(singleBoard.id).collection("boardItems").orderBy('position').onSnapshot(collection => {
			const data = collection.docs.map((doc, index) => {
				const docData = { ...doc.data() };
				if (docData.position !== index + 1) docData.position = index + 1;
				return {
					...docData,
					id: doc.id,
				};
			});
			setBoardItems([...data]);
		});
	}, [singleBoard]);

	const addBoardItem = (boardId) => {
		db.collection('boards').doc(boardId).collection('boardItems').add({
			position: boardItems.length + 1
		});
	};


	const deleteBoard = (boardId) => {
		db.collection('boards').doc(boardId).delete();
	};

	const handleOpenModal = board => {
		setShowModal(true);
		setSelectedItem({ ...board });
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedItem(null);
	};

	const handleUpdateBoardPosition = (olan, gelen) => {
		db.doc(`boards/${olan.id}`).set({
			...olan,
			position: gelen.position
		});
		db.collection("boards").doc(gelen.id).set({
			...gelen,
			position: olan.position
		});
	};

	const handleUpdateBoardItem = (olan, gelen, id) => {
		// db.collection("boards").doc(id).collection("boardItems").doc(gelen.id).delete();
		db.doc(`boards/${id}/boardItems/${gelen.id}`).delete();
		db.collection(`boards/${olan.id}/boardItems`).add({
			...gelen,
			position: boardItems.length + 1
		})
	}

	return (
		<React.Fragment>
			{showModal && <EditBoard isOpen={showModal} closeModal={handleCloseModal} selectedItem={selectedItem} />
			}
			<Col xs={11} sm={6} md={4} lg={3} xl={3} className="homepage-board" draggable onDrop={(e) => {
				if (e.dataTransfer.getData('position')) {
					// console.log(JSON.parse(e.dataTransfer.getData('position')));
					// console.log(e.dataTransfer.getData('boardId'));
					handleUpdateBoardItem(singleBoard, JSON.parse(e.dataTransfer.getData('position')), e.dataTransfer.getData('boardId'));
				} else {
					console.log(singleBoard)
					console.log(JSON.parse(e.dataTransfer.getData('positionBoard')));
					handleUpdateBoardPosition(singleBoard, JSON.parse(e.dataTransfer.getData('positionBoard')))
				}
			}} onDragStart={(e) => {
				e.dataTransfer.setData("positionBoard", JSON.stringify(singleBoard));
			}} onDragOver={(e) => {
				e.preventDefault();
			}}>
				<Container className="board-description">
					<Container className="user-board-input">
						<p>name: {singleBoard.name}</p>
						<span>
							<IconButton onClick={() => handleOpenModal(singleBoard)} size="small">
								<Icon >edit</Icon>
							</IconButton>
						</span>
					</Container>
					<Button variant="outline-light" size="sm" onClick={() => addBoardItem(singleBoard.id)}>
						<span>Add an item</span>
					</Button>
					<Button variant="outline-light" size="sm" onClick={() => deleteBoard(singleBoard.id)} className="ml-2">
						<span>Delete the board</span>
					</Button>
				</Container>
				{boardItems.map((boardItem) => {
					return <BoardItem key={boardItem.id} boardItem={boardItem} boardId={singleBoard.id} />;
				})}
			</Col>
		</React.Fragment>
	);
}
