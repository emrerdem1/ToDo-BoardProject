import React, { useState, useEffect, createContext } from 'react';
import db from '../firebaseConfig';

export const BoardStore = React.createContext();

export const BoardSections = ({ children }) => {

	const [boards, setBoards] = useState([]);

	console.log(boards)

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
		<BoardStore.Provider value={[boards, setBoards]}>
			{children}
		</BoardStore.Provider>
	)
};
