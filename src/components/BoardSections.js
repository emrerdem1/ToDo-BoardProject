import React, { useState, useEffect, createContext } from 'react';
import db from '../firebaseConfig';

export const BoardStore = createContext();
export const PriorityStore = createContext();

export const BoardSections = ({ children }) => {

	const [boards, setBoards] = useState([]);
	const [priorities, setPriorities] = useState([]);

	console.log(boards)

	useEffect(() => {
		db.collection("boards").orderBy('position').onSnapshot(collection => {
			const data = collection.docs.map((doc, index) => {
				const docData = { ...doc.data() };
				if (docData.position !== index + 1) docData.position = index + 1;
				return {
					...docData,
					id: doc.id,
				};
			});
			setBoards([...data]);
		});
		db.collection("priorities").orderBy('value').onSnapshot(collection => {
			const data = collection.docs.map(doc => {
				return {
					...doc.data(),
					id: doc.id,
				};
			});
			setPriorities([...data]);
		});
	}, []);

	return (
		<BoardStore.Provider value={[boards]}>
			<PriorityStore.Provider value={[priorities]}>
				{children}
			</PriorityStore.Provider>
		</BoardStore.Provider>
	)
};
