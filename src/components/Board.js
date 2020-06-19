import React, { useState, useEffect } from 'react';
import BoardItem from './BoardItem';
import db from './../firebaseConfig';
import { Grid, Row, Col, Container, Button } from 'react-bootstrap';
import { IconButton, Icon } from '@material-ui/core';
import EditBoard from './EditBoard';
import customClasses from 'classnames';

export default function Board({ singleBoard, toggleDisplay }) {
	const [showModal, setShowModal] = useState(false);
	const [boardItems, setBoardItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [collapseStatus, setCollapseStatus] = useState(false);
	useEffect(() => {
		db.collection(`boards/${singleBoard.id}/boardItems`)
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
				setBoardItems([...data]);
			});
	}, [singleBoard]);

	const addBoardItem = (boardId) => {
		db.collection(`boards/${boardId}/boardItems`).add({
			position: boardItems.length + 1
		});
	};

	const deleteBoard = (boardId) => {
		db.doc(`boards/${boardId}`).delete();
	};

	const handleOpenModal = (board) => {
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
		db.doc(`boards/${gelen.id}`).set({
			...gelen,
			position: olan.position
		});
	};

	const handleUpdateBoardItem = (olan, gelen, id) => {
		db.doc(`boards/${id}/boardItems/${gelen.id}`).delete();
		db.collection(`boards/${olan.id}/boardItems`).add({
			...gelen,
			position: boardItems.length + 1
		});
	};
	const toggleClasses = {
		initial: 'col-xs-11 col-sm-6 col-md-4 col-lg-3 col-xl-3',
		listView: 'col-11 d-flex'
	};
	return (
		<React.Fragment>
			{showModal && <EditBoard isOpen={showModal} closeModal={handleCloseModal} selectedItem={selectedItem} />}
			<Col
				className={`homepage-board 
				${toggleDisplay ? toggleClasses.listView : toggleClasses.initial}
				${collapseStatus && 'collapse-height'}`}
				draggable
				onDrop={(e) => {
					if (e.dataTransfer.getData('position')) {
						// console.log(JSON.parse(e.dataTransfer.getData('position')));
						// console.log(e.dataTransfer.getData('boardId'));
						handleUpdateBoardItem(
							singleBoard,
							JSON.parse(e.dataTransfer.getData('position')),
							e.dataTransfer.getData('boardId')
						);
					} else {
						console.log(singleBoard);
						console.log(JSON.parse(e.dataTransfer.getData('positionBoard')));
						handleUpdateBoardPosition(singleBoard, JSON.parse(e.dataTransfer.getData('positionBoard')));
					}
				}}
				onDragStart={(e) => {
					e.dataTransfer.setData('positionBoard', JSON.stringify(singleBoard));
				}}
				onDragOver={(e) => {
					e.preventDefault();
				}}
			>
				<Container
					style={{ flexBasis: '20%' }}
					className={customClasses(`board-description`, { collapseStatus_false: collapseStatus })}
				>
					<Container className="user-board-input">
						<Container>
							<p>{singleBoard.name}</p>
							<span>
								<IconButton onClick={() => handleOpenModal(singleBoard)} size="small">
									<Icon>edit</Icon>
								</IconButton>
							</span>
						</Container>
						<Button
							variant="outline-light"
							size="xs"
							onClick={() => setCollapseStatus(!collapseStatus)}
							className="collapse-button"
						>
							<span>Collapse</span>
						</Button>
					</Container>
					{!collapseStatus && (
						<Button variant="outline-light" size="sm" onClick={() => addBoardItem(singleBoard.id)}>
							<span>Add an item</span>
						</Button>
					)}
					{!collapseStatus && (
						<Button
							variant="outline-light"
							size="sm"
							onClick={() => deleteBoard(singleBoard.id)}
							className="ml-2"
						>
							<span>Delete the board</span>
						</Button>
					)}
				</Container>
				{!collapseStatus &&
					boardItems.map((boardItem) => {
						return <BoardItem key={boardItem.id} boardItem={boardItem} boardId={singleBoard.id} />;
					})}
			</Col>
		</React.Fragment>
	);
}
