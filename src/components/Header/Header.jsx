import HeaderButton from '../../UI/buttons/HeaderButton/HeaderButton';
import AddIcon from '../../static/icons/AddIcon';
import DeleteIcon from '../../static/icons/DeleteIcon';
import CheckIcon from '../../static/icons/CheckIcon';
import SearchBox from '../SearchBox/SearchBox';
import styles from './header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../../store/app-context';

const Header = () => {
	const location = useLocation();
	const noteId = parseInt(location.pathname.slice(1));
	const [blockButtons, setBlockButtons] = useState(true);

	const navigate = useNavigate();

	const { mobileScreen, burgerOpened, setBurgerOpened } =
		useContext(AppContext);

	const addNoteHandler = useCallback(() => {
		navigate('/add-note');
	}, [navigate]);

	useEffect(() => {
		if (noteId) {
			setBlockButtons(false);
		} else {
			setBlockButtons(true);
		}
	}, [noteId]);

	const burgerButtonClickHandler = useCallback(() => {
		setBurgerOpened(!burgerOpened);
	}, [burgerOpened]);

	return (
		<header className={styles.header}>
			<div className={styles.header__buttons}>
				{mobileScreen && (
					<HeaderButton
						classname={`${styles.burger} ${burgerOpened && styles.opened}`}
						onClick={burgerButtonClickHandler}
					>
						<span />
					</HeaderButton>
				)}
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
