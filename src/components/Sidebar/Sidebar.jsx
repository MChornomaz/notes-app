import { NOTES } from '../../constants';
import ListItem from '../ListItem/ListItem';
import styles from './sidebar.module.scss';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
	const location = useLocation();
	const noteId = parseInt(location.pathname.slice(1));

	return (
		<aside className={styles.sidebar}>
			<ul>
				{NOTES.map((note) => (
					<ListItem
						key={note.id}
						note={note.note}
						created={note.created}
						id={note.id}
						classname={noteId === note.id && styles.active}
					/>
				))}
			</ul>
		</aside>
	);
};

export default Sidebar;
