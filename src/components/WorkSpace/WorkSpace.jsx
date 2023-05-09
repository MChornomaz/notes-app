import styles from './workSpace.module.scss';
import { Outlet, Route } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../store/app-context';

const WorkSpace = () => {
	const { burgerOpened, mobileScreen } = useContext(AppContext);
	return (
		<div
			className={`${styles.workspace} ${
				burgerOpened && mobileScreen && styles.hidden
			}`}
		>
			<Outlet />
		</div>
	);
};

export default WorkSpace;
