import { useEffect, useContext, useCallback, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import WorkSpace from './components/WorkSpace/WorkSpace';
import WorkSpaseTextArea from './components/WorkSpaseTextArea/WorkSpaseTextArea';
import {
	getData as getIndexedDbData,
	saveData as saveIndexedDbData,
} from './databases/indexeddb';
import {
	getData as getQuintaDbData,
	saveData as saveQuintaDbData,
} from './databases/quintadb';
import AppContext from './store/app-context';
import { getCurrentDate } from './helpers/getCurrentDate';

import './App.scss';

function App() {
	const { data, setData } = useContext(AppContext);
	const navigate = useNavigate();
	const textAreaRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			const dbName = process.env.REACT_APP_DB || 'indexeddb';
			let getData, saveData;
			if (dbName === 'quintadb') {
				getData = getQuintaDbData;
				saveData = saveQuintaDbData;
			} else {
				getData = getIndexedDbData;
				saveData = saveIndexedDbData;
			}
			const data = await getData('notes');
			if (!data) {
				const today = getCurrentDate();
				const firstNote = [
					{
						id: '1',
						note: 'My first Note!',
						created: today,
					},
				];
				saveData('notes', firstNote);
			}
			setData(data);
		};
		fetchData();
	}, [setData]);

	const saveData =
		process.env.REACT_APP_DB === 'quintadb'
			? saveQuintaDbData
			: saveIndexedDbData;

	const addNoteHandler = useCallback(
		(note) => {
			if (data) {
				const newData = [...data, note];
				saveData('notes', newData);
				setData(newData);
			}
		},
		[saveData, data, setData]
	);

	const editNoteHandler = useCallback(
		(id, value) => {
			const noteToEdit = data.find((el) => el.id === id);
			const newNote = { ...noteToEdit, note: value };
			const restOfData = data.filter((el) => el.id !== id);
			const newData = [...restOfData, newNote];
			saveData('notes', newData);
			setData(newData);
		},
		[data, saveData, setData]
	);

	const deleteNoteHandler = useCallback(
		(id) => {
			if (data) {
				const filteredNotes = data.filter((el) => el.id !== id);
				try {
					saveData('notes', filteredNotes);
					setData(filteredNotes);
					navigate('/');
				} catch (e) {
					console.log(e);
				}
			}
		},
		[data, saveData, navigate, setData]
	);

	return (
		<>
			<Header deleteNote={deleteNoteHandler} inputRef={textAreaRef} />
			<main className='main-block'>
				<Sidebar />
				<Routes>
					<Route path='/' element={<WorkSpace />}>
						<Route
							path='/:noteId'
							element={
								<WorkSpaseTextArea
									onEdit={editNoteHandler}
									inputRef={textAreaRef}
								/>
							}
						/>
						<Route
							path='/add-note'
							element={<WorkSpaseTextArea onAdd={addNoteHandler} />}
						/>
					</Route>
				</Routes>
			</main>
		</>
	);
}

export default App;
