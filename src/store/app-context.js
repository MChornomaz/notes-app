import React from 'react';

const AppContext = React.createContext({
	mobileScreen: false,
	burgerOpened: false,
	data: [],
	setData: (data) => {},
	setBurgerOpened: () => {},
});

export default AppContext;
