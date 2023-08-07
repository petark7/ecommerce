import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from '../firebase/utils';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const checkIfLoggedIn = async () => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	};

	const logUserOut = () => {
		logout();
		setUser(null);
	};

	useEffect(() => {
		checkIfLoggedIn();
	}, []);

	return (
		<UserContext.Provider value={{ user, logUserOut }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.any
};

export default UserProvider;
