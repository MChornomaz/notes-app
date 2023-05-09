import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../store/app-context';
import { getCurrentDate } from '../../helpers/getCurrentDate';
import { v4 } from 'uuid';
import styles from './workSpaseTextArea.module.scss';

const WorkSpaseTextArea = ({ onAdd, onEdit, inputRef }) => {
	const { noteId } = useParams();
	const { pathname } = useLocation();
	const creationTime = getCurrentDate();

	const [noteText, setNoteText] = useState('');
	const [creationDate, setCreationDate] = useState('');
	const { data } = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (noteId && data) {
			const textContent = data.find((note) => note.id === noteId);
			if (textContent) {
				setNoteText(textContent.note);
				setCreationDate(textContent.created);
			}
		}
	}, [noteId]);

	useEffect(() => {
		if (pathname === '/add-note') {
			setNoteText('');
		}
	}, [pathname]);

	const inputChangeHandler = (e) => {
		if (
			pathname === '/add-note' &&
			e.target.value.trim().length > 0 &&
			e.target.value.trim().length <= 2
		) {
			const id = v4();
			const note = {
				id,
				created: creationTime,
				note: e.target.value,
			};
			console.log(note);
			onAdd(note);
			navigate(`/${id}`);
		} else if (e.target.value.trim().length >= 1) {
			onEdit(noteId, e.target.value);
		}
		setNoteText(e.target.value);
	};
	return (
		<div className={styles.workspace}>
			<p className={styles.workspace__date}>{creationDate}</p>
			<textarea
				className={styles.workspace__input}
				value={noteText}
				onChange={inputChangeHandler}
				ref={inputRef}
			></textarea>
		</div>
	);
};

export default WorkSpaseTextArea;
