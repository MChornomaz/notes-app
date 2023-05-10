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
	createNote,
	updateNote,
	deleteNote,
} from './databases/quintadb';
import AppContext from './store/app-context';
import { getCurrentDate } from './helpers/getCurrentDate';

import './App.scss';

function App() {
	const { data, setData, dbType, setDBType } = useContext(AppContext);
	const navigate = useNavigate();
	const textAreaRef = useRef(null);

	useEffect(() => {
		if (process.env.REACT_APP_DB) {
			setDBType(process.env.REACT_APP_DB.toString());
		} else {
			setDBType('indexeddb');
		}
	}, [setDBType]);

	useEffect(() => {
		const fetchData = async () => {
			const dbName = process.env.REACT_APP_DB || 'indexeddb';
			let getData, saveData;
			const today = getCurrentDate();
			const firstNote = {
				note: 'My first Note!',
				created: today,
			};
			if (dbName === 'quintadb') {
				getData = getQuintaDbData;
				getData().then((data) => setData(data));
				if (!data) {
					const firstNote = {
						note: 'My first Note!',
						created: today,
						id: 'note-1',
					};
					await createNote(firstNote);
				}
			} else {
				getData = getIndexedDbData;
				saveData = saveIndexedDbData;
				const data = await getData('notes');
				if (!data) {
					saveData('notes', [firstNote]);
				}
				setData(data);
			}
		};
		fetchData();
	}, [setData, data]);

	const saveData = saveIndexedDbData;

	const addNoteHandler = useCallback(
		async (note) => {
			if (dbType === 'indexeddb') {
				if (data) {
					const newData = [...data, note];
					await saveData('notes', newData);
					setData(newData);
				}
			} else if (dbType === 'quintadb') {
				let id;
				await createNote(note).then((data) => (id = data));
				getQuintaDbData().then((data) => setData(data));
				navigate(`/${id}`);
			}
		},
		[saveData, data, setData, dbType, navigate]
	);

	const editNoteHandler = useCallback(
		async (id, value) => {
			if (dbType === 'indexeddb') {
				const noteToEdit = data.find((el) => el.id === id);
				const newNote = { ...noteToEdit, note: value };
				const restOfData = data.filter((el) => el.id !== id);
				const newData = [...restOfData, newNote];
				await ('notes', newData);
				setData(newData);
			} else if (dbType === 'quintadb') {
				let newNote;
				await updateNote(id, value).then((data) => (newNote = data));
				const restOfData = data.filter((el) => el.id !== id);
				const newData = [...restOfData, newNote];
				setData(newData);
			}
		},
		[data, setData, dbType]
	);

	const deleteNoteHandler = useCallback(
		(id) => {
			if (data) {
				if (dbType === 'indexeddb') {
					const filteredNotes = data.filter((el) => el.id !== id);
					try {
						saveData('notes', filteredNotes);
						setData(filteredNotes);
						navigate('/');
					} catch (e) {
						console.log(e);
					}
				} else if (dbType === 'quintadb') {
					const filteredNotes = data.filter((el) => el.id !== id);
					deleteNote(id).then(() => setData(filteredNotes));
				}
			}
		},
		[data, saveData, navigate, setData, dbType]
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
