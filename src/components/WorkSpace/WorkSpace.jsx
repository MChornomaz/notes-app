import styles from './workSpace.module.scss';
import { Outlet, Route } from 'react-router-dom';

const WorkSpace = () => {
	return (
		<div className={styles.workspace}>
			<Outlet />
		</div>
	);
};

export default WorkSpace;
