import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

import AppContext from '../../store/app-context';
import ListItem from '../ListItem/ListItem';

import styles from './sidebar.module.scss';

const Sidebar = () => {
	const location = useLocation();
	const noteId = location.pathname.slice(1);
	const { mobileScreen, burgerOpened, data } = useContext(AppContext);

	return (
		<aside
			className={`${styles.sidebar} ${
				mobileScreen && !burgerOpened && styles.hidden
			}`}
		>
			<ul>
				{data &&
					data.map((note) => (
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
