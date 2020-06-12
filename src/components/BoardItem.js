import React, { useState } from "react";
import db from "./../firebaseConfig";
import EditBoardItem from './EditBoardItem';

const BoardItem = ({ boardItem, boardId }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const priorities = [{ id: 1, name: 'Low' }, { id: 2, name: 'Medium' }, { id: 3, name: 'Important' }, { id: 4, name: 'Urgent' }];
  const statuses = [{ id: 1, name: 'Not Started' }, { id: 2, name: 'Progress' }, { id: 3, name: 'Completed' }];

  const deleteBoardItem = id => {
    db.collection("boards").doc(boardId).collection("boardItems").doc(id).delete();
  };

  const handleOpenModal = boardItem => {
    setShowModal(true);
    setSelectedItem({ ...boardItem });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <React.Fragment>
      {showModal && <EditBoardItem isOpen={showModal} closeModal={handleCloseModal} selectedItem={selectedItem} boardId={boardId} />}
      <div className="board-item">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => handleOpenModal(boardItem)}>Edit</button>
          <button onClick={() => deleteBoardItem(boardItem.id)}>Delete</button>
        </div>
        {boardItem.title &&
          <div onClick={() => handleOpenModal(boardItem)}>
            <p>title: {boardItem.title}</p>
            <p>assignee: {boardItem.assignee}</p>
            <p>description: {boardItem.description}</p>
            <p>status: {boardItem.status && statuses.find(status => status.id === boardItem.status).name}</p>
            <p>priority: {boardItem.priority && priorities.find(priority => priority.id === boardItem.priority).name}</p>
            {/* <p>dueDate: {boardItem.dueDate}</p> */}
          </div>
        }
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
        {/* </div> */}
      </div>
    </React.Fragment>
  );
};

export default BoardItem;
