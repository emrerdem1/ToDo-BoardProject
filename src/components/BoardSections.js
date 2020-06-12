import React, { useState, useEffect, createContext } from 'react';
import db from '../firebaseConfig';

export const BoardStore = React.createContext();

export const BoardSections = ({children }) => {

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
  
  
	return (
		<React.Fragment>
			<div className="cards">
                {boards.map((board) => {
                return board.id;
                })}
            </div>
				<BoardStore.Provider value={[boards, setBoards]}>
					{children}
				</BoardStore.Provider>
		</React.Fragment>
	)
};
