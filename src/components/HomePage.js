import React, { useContext, useState } from 'react';
import Board from './Board';
import { BoardStore } from './BoardSections';
import db from '../firebaseConfig';
import { Row, Button, Container } from 'react-bootstrap';

const HomePage = () => {
  const [boards] = useContext(BoardStore);
  const [toggleDisplay, setToggleDisplay] = useState(false);

  const addBoard = () => {
    db.collection('boards').add({
      position: boards.length + 1,
      name: '',
    });
  };
  return (
    <>
      <Container fluid className="boards-container">
        <Row className="boards-row">
          <Container fluid className="boards-controller">
            <Button className="add-general-board" onClick={addBoard}>
              Add Board
            </Button>
            <Button onClick={() => setToggleDisplay(!toggleDisplay)}>
              Toggle Display
            </Button>
          </Container>
          {boards.map((board) => {
            return (
              <Board
                key={board.id}
                singleBoard={board}
                toggleDisplay={toggleDisplay}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
};
export default HomePage;
