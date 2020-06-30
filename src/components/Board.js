import React, { useState, useEffect, useRef } from "react";
import BoardItem from "./BoardItem";
import db from "./../firebaseConfig";
import { Col, Container, Button } from "react-bootstrap";
import { IconButton, Icon, TextField, MenuItem } from "@material-ui/core";
import EditBoard from "./EditBoard";
import customClasses from "classnames";
import EditableInput from "./Editable/EditableInput";
import { toggleClasses } from "./DefaultStyle";

export default function Board({ singleBoard, toggleDisplay }) {
  const [showModal, setShowModal] = useState(false);
  const [boardItems, setBoardItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [task, setTask] = useState("");
  const [sorting, setSorting] = useState("position");
  const [sortType, setSortType] = useState("asc");
  const inputRef = useRef();
  const sortItems = [
    { id: 1, value: "position", name: "Default" },
    { id: 2, value: "title", name: "Title" },
    { id: 3, value: "dueDate", name: "DueDate" },
    { id: 4, value: "priority", name: "Priority" },
  ];

  useEffect(() => {
    db.collection(`boards/${singleBoard.id}/boardItems`)
      .orderBy(sorting, sortType)
      .onSnapshot((collection) => {
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
  }, [singleBoard, sorting, sortType]);

  useEffect(() => {
    setTask(singleBoard?.name);
  }, [singleBoard]);

  const addBoardItem = (boardId) => {
    db.collection(`boards/${boardId}/boardItems`).add({
      status: singleBoard.position,
      position: boardItems.length + 1,
    });
  };

  const deleteBoard = (singleBoard) => {
    if (singleBoard?.name !== "done") {
      db.doc(`boards/${singleBoard?.id}`).delete();
    }
  };

  const handleOpenModal = (board) => {
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
        position: incoming.position,
      });
      db.doc(`boards/${incoming.id}`).set({
        ...incoming,
        position: current.position,
      });
    }
  };

  const handleUpdateBoardItem = (current, incoming, id) => {
    if (current.id !== id) {
      db.doc(`boards/${id}/boardItems/${incoming.id}`).delete();
      db.collection(`boards/${current.id}/boardItems`).add({
        ...incoming,
        status: current.position,
        position: boardItems.length + 1,
      });
    }
  };

  const handleNameChange = (board) => (event) => {
    const name = event.target.value;
    setTask(name);
    db.doc(`boards/${board.id}`).update({
      name,
    });
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  const handleSortTypeChange = (type) => {
    setSortType(type);
  };

  return (
    <React.Fragment>
      {showModal && (
        <EditBoard
          isOpen={showModal}
          closeModal={handleCloseModal}
          selectedItem={selectedItem}
        />
      )}
      <Col
        className={`homepage-board 
				${toggleDisplay ? toggleClasses.listView : toggleClasses.initial}
				${collapseStatus && "collapse-height"}`}
        draggable
        onDrop={(e) => {
          if (e.dataTransfer.getData("updatedItem")) {
            handleUpdateBoardItem(
              singleBoard,
              JSON.parse(e.dataTransfer.getData("updatedItem")),
              e.dataTransfer.getData("boardId")
            );
          } else {
            handleUpdateBoardPosition(
              singleBoard,
              JSON.parse(e.dataTransfer.getData("updatedBoard"))
            );
          }
        }}
        onDragStart={(e) => {
          e.dataTransfer.setData("updatedBoard", JSON.stringify(singleBoard));
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <Container
          style={{ flexBasis: "20%" }}
          className={customClasses(`board-description`, {
            collapseStatus_false: collapseStatus,
          })}
        >
          <Container className="user-board-input">
            <EditableInput
              style={{ marginRight: "5px", minWidth: "150px" }}
              text={task}
              placeholder="Write a task name"
              childRef={inputRef}
              type="input"
            >
              <input
                ref={inputRef}
                type="text"
                name="task"
                placeholder="Write a task name"
                value={task}
                onChange={handleNameChange(singleBoard)}
              />
            </EditableInput>
            <IconButton
              onClick={() => handleOpenModal(singleBoard)}
              size="small"
            >
              <Icon>edit</Icon>
            </IconButton>
            <Button
              variant="outline-dark"
              size="xs"
              onClick={() => setCollapseStatus(!collapseStatus)}
              className="collapse-button"
            >
              <i
                className="fas fa-compress-arrows-alt"
                style={{ fontSize: "20px" }}
              ></i>
            </Button>
          </Container>

          <Container className="del-and-edit_buttons">
            {!collapseStatus && (
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => addBoardItem(singleBoard.id)}
              >
                Add an item
              </Button>
            )}
            {!collapseStatus && (
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => deleteBoard(singleBoard)}
                className="ml-2"
              >
                Delete the board
              </Button>
            )}
            {!collapseStatus && (
              <Container
                style={{ width: "100" }}
                className="mt-3 d-flex justify-content-center sort-class"
              >
                <TextField
                  style={{ width: 150 }}
                  select
                  label="Sort By"
                  name="sort"
                  value={sorting}
                  onChange={handleSortingChange}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 250,
                        },
                      },
                    },
                  }}
                >
                  {sortItems.map(({ id, name, value }) => (
                    <MenuItem key={id} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
                <Container className="d-flex align-items-center ml-3">
                  <i
                    className="fas fa-sort-up sortIcon"
                    onClick={() => handleSortTypeChange("asc")}
                  ></i>
                  <i
                    className="fas fa-sort-down ml-2 sortIcon"
                    onClick={() => handleSortTypeChange("desc")}
                  ></i>
                </Container>
              </Container>
            )}
          </Container>
        </Container>
        {!collapseStatus &&
          boardItems.map((boardItem) => {
            return (
              <BoardItem
                key={boardItem.id}
                boardItem={boardItem}
                boardId={singleBoard.id}
              />
            );
          })}
      </Col>
    </React.Fragment>
  );
}
