import React, { useState, useEffect, useContext } from 'react';
import db from './../firebaseConfig';
import EditBoardItem from './EditBoardItem';
import { Grid, Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap';
import { BoardStore } from './BoardSections';

const BoardItem = ({ boardItem, boardId }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [priorities, setPriorities] = useState([]);
  const [statuses] = useContext(BoardStore);
  const date = boardItem.dueDate ? new Date(boardItem?.dueDate?.seconds * 1000) : '';

  useEffect(() => {
    db.collection("priorities").orderBy('value').onSnapshot(collection => {
      const data = collection.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setPriorities([...data]);
    });
  }, [])

  // useEffect(() => {
  //   if (boardItem.dueDate) {
  //     console.log(new Date(boardItem?.dueDate.seconds * 1000))
  //   }
  // }, [boardItem])


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

  const getFormattedDate = timeStamp => {
    if (timeStamp) {
      const fullDate = new Date(timeStamp * 1000);
      const date = fullDate.getDate();
      const month = fullDate.getMonth() + 1;
      const year = fullDate.getFullYear();
      return `${date}-${month}-${year}`;
    }
    return '-'
  }

  return (
    <React.Fragment>
      {showModal && (
        <EditBoardItem isOpen={showModal} closeModal={handleCloseModal} selectedItem={selectedItem} boardId={boardId} />
      )}
      <Container className="board-item" draggable onDragStart={(e) => {
        e.dataTransfer.setData("updatedItem", JSON.stringify(boardItem));
        e.dataTransfer.setData("boardId", boardId);
      }} onDragOver={(e) => {
        e.preventDefault();
      }}>
        <Container className="board-item_nested" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='board-item_nested--id'>
            <h6>id: {boardItem.id}</h6>
          </div>
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
        <Container className='board-item_object'>
          <p>Title: {boardItem?.title}</p>
          <p>Assignee: {boardItem?.assignee}</p>
          <p>Description: {boardItem?.description}</p>
          <p>Status: {boardItem.status && statuses.find(status => status.position === boardItem.status)?.name}</p>
          <p>Priority: {boardItem.priority && priorities.find(priority => priority.value === boardItem.priority)?.name}</p>
          <p>dueDate: {getFormattedDate(boardItem?.dueDate?.seconds)}</p>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default BoardItem;
