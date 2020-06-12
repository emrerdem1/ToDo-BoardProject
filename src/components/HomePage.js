import React, {useContext} from 'react';
import Board from './Board';
import {BoardStore} from './BoardSections';
import db from '../firebaseConfig';


const HomePage = () => {
    const [boards, setBoards] = useContext(BoardStore);

    const addBoard = () => {
    db.collection("boards").add({
      position: boards.length + 1,
      name: "custom board2",
    });
  };
    return (
     <React.Fragment>
            <button onClick={() => addBoard}>Board Ekle</button>
            <div className="cards">
                {boards.map((board) => {
                return <Board key={board.id} singleBoard={board} />;
                })}
            
            </div>
    </React.Fragment>
    )
}
export default HomePage;