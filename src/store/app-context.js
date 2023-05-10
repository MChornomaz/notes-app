import React from 'react';

const AppContext = React.createContext({
	mobileScreen: false,
	burgerOpened: false,
	data: [],
	dbType: '',
	setData: (data) => {},
	setBurgerOpened: () => {},
	setDBType: (type) => {},
});

export default AppContext;
