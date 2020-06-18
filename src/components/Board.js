import React, { useState, useEffect, useRef } from 'react';
import BoardItem from './BoardItem';
import db from './../firebaseConfig';
import { Grid, Row, Col, Container, Button } from 'react-bootstrap';
import { IconButton, Icon } from '@material-ui/core';
import EditBoard from './EditBoard';
import EditableInput from './Editable/EditableInput';

export default function Board({ singleBoard }) {
	const [showModal, setShowModal] = useState(false);
	const [boardItems, setBoardItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [task, setTask] = useState("");
	const inputRef = useRef();

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
			setBoardItems(data);
		});
	}, [singleBoard]);

	useEffect(() => {
		setTask(singleBoard?.name)
	}, [singleBoard])

	const addBoardItem = (boardId) => {
		db.collection('boards').doc(boardId).collection('boardItems').add({
			status: singleBoard.position,
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

	const handleUpdateBoardPosition = (current, incoming) => {
		if (current.id !== incoming.id) {
			db.doc(`boards/${current.id}`).set({
				...current,
				position: incoming.position
			});
			db.collection("boards").doc(incoming.id).set({
				...incoming,
				position: current.position
			});
		}
	};

	const handleUpdateBoardItem = (current, incoming, id) => {
		if (current.id !== id) {
			db.doc(`boards/${id}/boardItems/${incoming.id}`).delete();
			db.collection(`boards/${current.id}/boardItems`).add({
				...incoming,
				position: boardItems.length + 1
			})
		}
	}

	const handleNameChange = board => event => {
		const name = event.target.value;
		setTask(name);
		db.collection('boards').doc(board.id).update({
			name
		});
	}

	return (
		<React.Fragment>
			{showModal && <EditBoard isOpen={showModal} closeModal={handleCloseModal} selectedItem={selectedItem} />
			}
			<Col xs={11} sm={6} md={4} lg={3} xl={3} className="homepage-board" draggable onDrop={(e) => {
				if (e.dataTransfer.getData('updatedItem')) {
					handleUpdateBoardItem(singleBoard, JSON.parse(e.dataTransfer.getData('updatedItem')), e.dataTransfer.getData('boardId'));
				} else {
					handleUpdateBoardPosition(singleBoard, JSON.parse(e.dataTransfer.getData('updatedBoard')))
				}
			}} onDragStart={(e) => {
				e.dataTransfer.setData("updatedBoard", JSON.stringify(singleBoard));
			}} onDragOver={(e) => {
				e.preventDefault();
			}}>
				<Container className="board-description">
					<Container className="user-board-input">
						{/* <p>name: {singleBoard.name}</p> */}
						<EditableInput text={task}
							placeholder="Write a task name"
							childRef={inputRef}
							type="input">
							<input
								ref={inputRef}
								type="text"
								name="task"
								placeholder="Write a task name"
								value={task}
								onChange={handleNameChange(singleBoard)}
							/>
						</EditableInput>
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
