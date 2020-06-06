import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebaseConfig";
import { useForm } from "react-hook-form";
import Board from "./components/Board";

function App() {
  const [boards, setBoards] = useState([]);
  console.log(boards);
  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    const response = await db
      .collection("boards")
      .doc("yJX0YJ2ukG1LGlFxQhdr")
      .collection("boardItems")
      .get();

    const data = response.docs.map((board) => {
      console.log(board);
      return {
        ...board.data(),
        id: board.id,
      };
    });
    setBoards([...data]);
  };

  const addBoard = () => {
    db.collection("boards").add([]);
    getBoards();
  };

  const onSubmit = (data) => {
    const sendingData = {
      ...data,
      priority: parseInt(data.priority),
      statusFlag: parseInt(data.statusFlag),
      dueDate: Date.parse(data.dueDate),
    };
    console.log(sendingData);
    addBoard(sendingData);
  };

  const addItem = () => {
    const todoId = boards.find((board) => board.name === "todo").id;
    db.collection("boards").doc(todoId).collection("boardItems").add({
      title: "header",
      subtitle: "header işi",
      assignee: "burak",
      dueDate: "20-12-2020",
    });
    getBoards();
  };

  return (
    <div>
      <button onClick={addBoard}>ekle</button>
      <button onClick={addItem}>item ekle</button>
    </div>
  );
}

export default App;
