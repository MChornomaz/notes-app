import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AppContext from '../../store/app-context';
import { getToday } from '../../helpers/getToday';

import styles from './listItem.module.scss';

const ListItem = (props) => {
	const { id, note, created } = props;
	const match = note.match(/^.*?[.?!](\s|$)/);
	const heading = match ? match[0].trim() : note.slice(0, 40);
	const text = note.slice(heading.length).trim();

	const { setBurgerOpened } = useContext(AppContext);
	const navigate = useNavigate();

	const listItemClickHandler = useCallback(() => {
		setBurgerOpened(false);
		navigate(`/${id}`);
	}, [id, navigate]);

	const today = getToday();
	let noteDate;

	if (created.includes(today)) {
		noteDate = created.slice(today.length + 4);
	} else {
		noteDate = created;
	}

	return (
		<li
			className={`${styles.item} ${props.classname}`}
			onClick={listItemClickHandler}
		>
			<h3 className={styles.item__heading}>{heading}</h3>
			<div className={styles.item__content}>
				<span>{noteDate}</span>
				<span className={styles.item__text}>{text}</span>
			</div>
		</li>
	);
};

export default ListItem;
