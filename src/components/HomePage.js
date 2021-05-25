import React, { useContext, useState } from 'react';
import Board from './Board';
import { BoardStore } from './BoardSections';
import db from '../firebaseConfig';
import { Row, Col, Button, Container } from 'react-bootstrap';

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
          <Col xs={11} sm={6} md={4} lg={3} xl={3}>
            <Container className="add-section">
              <Button className="add-general-board" onClick={addBoard}>
                Add Board
              </Button>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomePage;
