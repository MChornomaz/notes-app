import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import HeaderButton from '../../UI/buttons/HeaderButton/HeaderButton';
import AddIcon from '../../static/icons/AddIcon';
import DeleteIcon from '../../static/icons/DeleteIcon';
import CheckIcon from '../../static/icons/CheckIcon';
import SearchBox from '../SearchBox/SearchBox';
import AppContext from '../../store/app-context';
import Modal from '../../UI/Modal/Modal';
import ModalButton from '../../UI/buttons/ModalButton/ModalButton';

import styles from './header.module.scss';

const Header = ({ deleteNote, inputRef }) => {
	const location = useLocation();
	const noteId = location.pathname.slice(1);
	const [blockButtons, setBlockButtons] = useState(true);
	const [searchString, setSearchString] = useState('');
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	const { mobileScreen, burgerOpened, setBurgerOpened, data } =
		useContext(AppContext);

	const addNoteHandler = useCallback(() => {
		setBurgerOpened(false);
		navigate('/add-note');
	}, [navigate, burgerOpened]);

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

	const deleteNoteHandler = useCallback(
		(id) => {
			deleteNote(id);
			setShowModal(false);

			navigate('/');
			if (mobileScreen) {
				setBurgerOpened(true);
			}
		},
		[deleteNote]
	);

	const searchChangeHandler = useCallback(
		(e) => {
			setSearchString(e.target.value);
			const foundItem = data.find((el) =>
				el.note.toLowerCase().includes(e.target.value.trim().toLowerCase())
			);

			if (foundItem) {
				navigate(`/${foundItem.id}`);
			}
		},
		[data, navigate]
	);

	const modalShowHandler = useCallback(() => {
		setShowModal(!showModal);
	}, [showModal]);

	return (
		<>
			{showModal && (
				<Modal>
					<div className={styles.modal}>
						<h2 className={styles.modal__heading}>
							Are you sure, you want to delete this note?
						</h2>
						<div className={styles.modal__buttons}>
							<ModalButton onClick={() => deleteNoteHandler(noteId)}>
								Yes
							</ModalButton>
							<ModalButton onClick={modalShowHandler} inverted={true}>
								No
							</ModalButton>
						</div>
					</div>
				</Modal>
			)}
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
					<HeaderButton disabled={blockButtons} onClick={modalShowHandler}>
						<DeleteIcon />
					</HeaderButton>
					<HeaderButton
						disabled={blockButtons}
						onClick={() => inputRef.current.focus()}
					>
						<CheckIcon />
					</HeaderButton>
				</div>
				<div className={styles.header__search}>
					<SearchBox
						id='search'
						placeholder='Search'
						value={searchString}
						onChange={searchChangeHandler}
					/>
				</div>
			</header>
		</>
	);
};

export default Header;
