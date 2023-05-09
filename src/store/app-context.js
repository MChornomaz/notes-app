import React from 'react';

const AppContext = React.createContext({
	mobileScreen: false,
	burgerOpened: false,
	setBurgerOpened: () => {},
});

export default AppContext;
