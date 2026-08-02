import React from "react";

const AppContext = React.createContext({
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	token: null,
	setToken: () => {}
})

export default AppContext