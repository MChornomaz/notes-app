import styles from './listItem.module.scss';
import { NavLink } from 'react-router-dom';

const ListItem = (props) => {
	const { id, note, created } = props;
	const match = note.match(/^.*?[.?!](\s|$)/);
	const heading = match[0].trim();
	const text = note.slice(heading.length).trim();

	return (
		<li className={`${styles.item} ${props.classname}`}>
			<NavLink to={`/${id}`}>
				<h3 className={styles.item__heading}>{heading}</h3>
				<div className={styles.item__content}>
					<span>{created}</span>
					<span className={styles.item__text}>{text}</span>
				</div>
			</NavLink>
		</li>
	);
};

export default ListItem;
