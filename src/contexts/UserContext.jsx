import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/utils';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkIfLoggedIn = async () => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
	};

	useEffect(() => {
		checkIfLoggedIn();
	}, []);

	return (
		<UserContext.Provider value={{ isLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.any
};

export default UserProvider;
