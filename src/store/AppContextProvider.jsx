import AppContext from './app-context';
import { useEffect, useState } from 'react';

const AppContextProvider = (props) => {
	const [mobileScreen, setMobileScreen] = useState(false);
	const [burgerOpened, setBurgerOpened] = useState(true);
	const [data, setData] = useState([]);
	const [dbType, setDBType] = useState('');

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth < 600) {
				setMobileScreen(true);
			} else {
				setMobileScreen(false);
			}
		}
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const appContext = {
		mobileScreen,
		burgerOpened,
		data,
		setData,
		setBurgerOpened,
		dbType,
		setDBType,
	};
	return (
		<AppContext.Provider value={appContext}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
