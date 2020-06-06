import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebaseConfig";
import { useForm } from "react-hook-form";

const BoardItem = (props) => {
  console.log(props);
  return (
    <div className="general-board">
      <h1>Atom Board</h1>
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
      <div className="cards">
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
        )}
      </div>
    </div>
  );
};

export default BoardItem;
