import styles from './workSpaseTextArea.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { NOTES } from '../../constants';
import { useEffect, useState } from 'react';

const WorkSpaseTextArea = () => {
	const { noteId } = useParams();
	const { pathname } = useLocation();

	const [noteText, setNoteText] = useState('');
	const [creationDate, setCreationDate] = useState(new Date().toLocaleString());

	useEffect(() => {
		if (noteId) {
			const textContent = NOTES.find(
				(note) => note.id === parseInt(noteId, 10)
			);
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
		setNoteText(e.target.value);
	};

	return (
		<div className={styles.workspace}>
			<p className={styles.workspace__date}>{creationDate}</p>
			<textarea
				className={styles.workspace__input}
				value={noteText}
				onChange={inputChangeHandler}
			></textarea>
		</div>
	);
};

export default WorkSpaseTextArea;
