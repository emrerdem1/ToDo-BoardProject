import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebaseConfig";
import { useForm } from "react-hook-form";

function App() {
  const priorities = [
    { value: 0, name: "low" },
    { value: 1, name: "medium" },
    { value: 2, name: "high" },
  ];
  const statusFlags = [
    { value: 0, name: "todo" },
    { value: 1, name: "planned" },
    { value: 2, name: "inProgress" },
    { value: 3, name: "done" },
    { value: 4, name: "testing" },
  ];
  const [boards, setBoards] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getBoards();
  }, []);

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

  const getBoards = async () => {
    const response = await db.collection("boards").get();
    const data = response.docs.map((board) => ({
      ...board.data(),
      id: board.id,
    }));
    setBoards([...data]);
  };

  const addBoard = (board) => {
    db.collection("boards").add(board);
    getBoards();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
      {boards.map(
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
            <div key={id}>
              <hr />
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
      )}
    </div>
  );
}

export default App;
