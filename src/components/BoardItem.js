import React, { useState, useContext } from 'react';
import db from './../firebaseConfig';
import EditBoardItem from './EditBoardItem';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { BoardStore, PriorityStore } from './BoardSections';

const BoardItem = ({ boardItem, boardId }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [priorities] = useContext(PriorityStore);
	const [statuses] = useContext(BoardStore);
	// const date = boardItem.dueDate ? new Date(boardItem?.dueDate?.seconds * 1000) : '';

	const deleteBoardItem = (id) => {
		db.doc(`boards/${boardId}/boardItems/${id}`).delete();
	};

	const handleOpenModal = (boardItem) => {
		setShowModal(true);
		setSelectedItem({ ...boardItem });
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedItem(null);
	};

	const getFormattedDate = (timeStamp) => {
		if (timeStamp) {
			const fullDate = new Date(timeStamp * 1000);
			const date = fullDate.getDate();
			const month = fullDate.getMonth() + 1;
			const year = fullDate.getFullYear();
			return `${date}-${month}-${year}`;
		}
		return '-';
	};

	return (
		<React.Fragment>
			{showModal && (
				<EditBoardItem
					isOpen={showModal}
					closeModal={handleCloseModal}
					selectedItem={selectedItem}
					boardId={boardId}
				/>
			)}
			<Container
				className="board-item"
				draggable
				onDragStart={(e) => {
					e.dataTransfer.setData('updatedItem', JSON.stringify(boardItem));
					e.dataTransfer.setData('boardId', boardId);
				}}
				onDragOver={(e) => {
					e.preventDefault();
				}}
			>
				<Container className="board-item_nested" style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className="board-item_nested--id">
						<h6>id: {boardItem.id}</h6>
					</div>
					<ButtonGroup className="edit-delete-buttons">
						<Button
							className="btn-edit"
							variant="outline-warning"
							size="sm"
							style={{ marginRight: '3px' }}
							onClick={() => handleOpenModal(boardItem)}
						>
							<i class="fas fa-edit"></i>
						</Button>
						<Button
							className="btn-del"
							variant="outline-danger"
							size="sm"
							onClick={() => deleteBoardItem(boardItem.id)}
						>
							<i class="fas fa-trash-alt"></i>
						</Button>
					</ButtonGroup>
				</Container>
				<Container className="board-item_object">
					<p>
						<span className="board-item_defaults">Title:</span> {boardItem?.title}
					</p>{' '}
					<p>
						<span className="board-item_defaults">Assignee:</span> {boardItem?.assignee}
					</p>
					<p>
						<span className="board-item_defaults">Description:</span> {boardItem?.description}
					</p>
					<p>
						<span className="board-item_defaults">Status:</span>{' '}
						{boardItem.status && statuses.find((status) => status.position === boardItem.status)?.name}
					</p>
					<p>
						<span className="board-item_defaults">Priority:</span>{' '}
						{boardItem.priority &&
							priorities.find((priority) => priority.value === boardItem.priority)?.name}
					</p>
					<p>
						<span className="board-item_defaults">dueDate:</span>{' '}
						{getFormattedDate(boardItem?.dueDate?.seconds)}
					</p>
				</Container>
			</Container>
		</React.Fragment>
	);
};

export default BoardItem;
