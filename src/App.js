import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebaseConfig";
import Board from "./components/Board";

function App() {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    db.collection("boards").orderBy('position').onSnapshot(collection => {
      const data = collection.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setBoards([...data]);
    });
  }, []);

  const addBoard = () => {
    db.collection("boards").add({
      position: boards.length + 1,
      name: "custom board2",
    });
  };

  return (
    <div>
      <button onClick={addBoard}>Board Ekle</button>
      <div className="cards">
        {boards.map((board) => {
          return <Board key={board.id} singleBoard={board} />;
        })}
      </div>
    </div>
  );
}

export default App;
