import React, { useState } from 'react';
import db from './../firebaseConfig';
import EditBoardItem from './EditBoardItem';
import { Grid, Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap';

const BoardItem = ({ boardItem, boardId }) => {
	const [ showModal, setShowModal ] = useState(false);
	const [ selectedItem, setSelectedItem ] = useState(null);

	// const updateBoardItem = id => {

	//   db.collection("boards").doc(boardId).collection("boardItems").doc(id).set({
	//     ...boardItem,
	//     title: 'test5'
	//   });
	// };
	const deleteBoardItem = (id) => {
		db.collection('boards').doc(boardId).collection('boardItems').doc(id).delete();
	};

	const handleOpenModal = (boardItem) => {
		setShowModal(true);
		setSelectedItem({ ...boardItem });
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedItem(null);
	};

	return (
		<React.Fragment>
			{showModal && (
				<EditBoardItem isOpen={showModal} closeModal={handleCloseModal} selectedItem={selectedItem} />
			)}
			<Container className="board-item">
				<Container className="board-item_nested" style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h6>id: {boardItem.id}</h6>
					<ButtonGroup className="edit-delete-buttons">
						<Button
							variant="outline-warning"
							size="sm"
							style={{ marginRight: '3px' }}
							onClick={() => handleOpenModal(boardItem)}
						>
							Edit
						</Button>
						<Button variant="outline-danger" size="sm" onClick={() => deleteBoardItem(boardItem.id)}>
							Delete
						</Button>
					</ButtonGroup>
				</Container>
				{boardItem.title && (
					<Container>
						<p>title: {boardItem.title}</p>
						<p>subtitle: {boardItem.subtitle}</p>
						<p>assignee: {boardItem.assignee}</p>
					</Container>
				)}
				{/* <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title: </label>
        <input name="title" ref={register({ required: true })} />
        <br />
        <label htmlFor="subtitle">Subtitle: </label>
        <input name="subtitle" ref={register()} />
        <br />
        <label htmlFor="assignee">Assignee: </label>
        <input name="assignee" ref={register()} />
        <br />
        <label htmlFor="explanation">Explanation: </label>
        <input name="explanation" ref={register()} />
        <br />
        <label htmlFor="priority">Priorities: </label>
        <select name="priority" id="priority" ref={register()}>
          {priorities.map((priority) => {
            return (
              <option key={priority.value} value={priority.value}>
                {priority.name}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="statusFlag">Choose a status flag:</label>
        <select name="statusFlag" id="statusFlag" ref={register()}>
          {statusFlags.map((flag) => {
            return (
              <option key={flag.value} value={flag.value}>
                {flag.name}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="dueDate">Bitiş Tarihi: </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={1593475200000}
          ref={register()}
        />
        <br />
        <button type="submit">Kaydet</button>
      </form> */}
				{/* <div className="cards"> */}
				{/* {boards.map(
          ({
            id,
            title,
            subtitle,
            assignee,
            explanation,
            dueDate,
            priority,
            statusFlag,
          }) => {
            return (
              <div key={id} className="card">
                <p>Title: {title} </p>
                <p>Subtitle: {subtitle}</p>
                <p>Assignee: {assignee}</p>
                <p>Explanation: {explanation}</p>
                <p>
                  Due Date: {new Intl.DateTimeFormat("en-US").format(dueDate)}
                </p>
                <p>Priority: {priority}</p>
                <p>StatusFlag: {statusFlag}</p>
              </div>
            );
          }
        )} */}
			</Container>
		</React.Fragment>
	);
};

export default BoardItem;
