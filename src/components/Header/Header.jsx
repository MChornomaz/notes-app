import HeaderButton from '../../UI/buttons/HeaderButton/HeaderButton';
import AddIcon from '../../static/icons/AddIcon';
import DeleteIcon from '../../static/icons/DeleteIcon';
import CheckIcon from '../../static/icons/CheckIcon';
import SearchBox from '../SearchBox/SearchBox';
import styles from './header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

const Header = () => {
	const location = useLocation();
	const noteId = parseInt(location.pathname.slice(1));
	const [blockButtons, setBlockButtons] = useState(true);
	const navigate = useNavigate();

	const addNoteHandler = useCallback(() => {
		navigate('/add-note');
	}, []);

	useEffect(() => {
		if (noteId) {
			setBlockButtons(false);
		} else {
			setBlockButtons(true);
		}
	}, [noteId]);

	return (
		<header className={styles.header}>
			<div className={styles.header__buttons}>
				<HeaderButton onClick={addNoteHandler}>
					<AddIcon />
				</HeaderButton>
				<HeaderButton disabled={blockButtons}>
					<DeleteIcon />
				</HeaderButton>
				<HeaderButton disabled={blockButtons}>
					<CheckIcon />
				</HeaderButton>
			</div>
			<div className={styles.header__search}>
				<SearchBox id='search' placeholder='Search' />
			</div>
		</header>
	);
};

export default Header;
