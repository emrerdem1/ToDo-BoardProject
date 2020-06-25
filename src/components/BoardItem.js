import React, { useState, useEffect, useContext, useRef } from 'react';
import db from './../firebaseConfig';
import EditBoardItem from './EditBoardItem';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { BoardStore, PriorityStore } from './BoardSections';
import EditableInput from './Editable/EditableInput';

const BoardItem = ({ boardItem, boardId }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [priorities] = useContext(PriorityStore);
	const [statuses] = useContext(BoardStore);
	const [task, setTask] = useState('');
	const inputRef = useRef();
	// const date = boardItem.dueDate ? new Date(boardItem?.dueDate?.seconds * 1000) : '';

	useEffect(() => {
		setTask(boardItem?.title);
	}, [boardItem]);

	const deleteBoardItem = (id) => {
		db.doc(`boards/${boardId}/boardItems/${id}`).delete();
	};

	const doneBoardItem = (item) => {
		const done = statuses.find((status) => status.name === 'done');
		const id = done?.id;
		db.doc(`boards/${boardId}/boardItems/${item.id}`).delete();
		db.collection(`boards/${id}/boardItems`).add({
			...item,
			status: done.position,
			position: 9999
		});
	};

	const handleNameChange = (item) => (event) => {
		const title = event.target.value;
		setTask(title);
		db.doc(`boards/${boardId}/boardItems/${item.id}`).update({
			title
		});
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
					<Container className="board-item_nested--id">
							<EditableInput text={task} placeholder="Write a task name" childRef={inputRef} type="input">
								<input
									ref={inputRef}
									type="text" name="task" placeholder="Write a task name" value={task}
									onChange={handleNameChange(boardItem)}/>
								
							</EditableInput>
					</Container>
					<ButtonGroup className="edit-delete-buttons">
						<Button
							variant="outline-success"
							size="sm"
							style={{ marginBottom: '3px' }}
							onClick={() => doneBoardItem(boardItem)}
						>
							<i className="fas fa-check-circle"></i>
						</Button>
						<Button
							className="btn-edit"
							variant="outline-warning"
							size="sm"
							style={{ marginBottom: '3px' }}
							onClick={() => handleOpenModal(boardItem)}
						>
							<i className="fas fa-edit"></i>
						</Button>
						<Button
							style={{ marginBottom: '3px' }}
							className="btn-del"
							variant="outline-danger"
							size="sm"
							onClick={() => deleteBoardItem(boardItem.id)}
						>
							<i className="fas fa-trash-alt"></i>
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
