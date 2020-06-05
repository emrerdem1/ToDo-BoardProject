import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebaseConfig";

function App() {
  const [boards, setBoards] = useState([]);

  console.log(boards);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    const response = await db.collection("boards").get();
    const data = response.docs.map((board) => ({
      ...board.data(),
      id: board.id,
    }));
    setBoards([...data]);
  };

  return <div className="App"></div>;
}

export default App;
