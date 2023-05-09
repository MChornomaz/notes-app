import styles from './listItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import AppContext from '../../store/app-context';

const ListItem = (props) => {
	const { id, note, created } = props;
	const match = note.match(/^.*?[.?!](\s|$)/);
	const heading = match[0].trim();
	const text = note.slice(heading.length).trim();

	const { setBurgerOpened } = useContext(AppContext);
	const navigate = useNavigate();

	const listItemClickHandler = useCallback(() => {
		setBurgerOpened(false);
		navigate(`/${id}`);
	}, []);

	return (
		<li
			className={`${styles.item} ${props.classname}`}
			onClick={listItemClickHandler}
		>
			<h3 className={styles.item__heading}>{heading}</h3>
			<div className={styles.item__content}>
				<span>{created}</span>
				<span className={styles.item__text}>{text}</span>
			</div>
		</li>
	);
};

export default ListItem;
