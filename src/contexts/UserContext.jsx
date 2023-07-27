import PropTypes from 'prop-types';
import { createContext } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => (
	<UserContext.Provider>
		{children}
	</UserContext.Provider>
);

UserProvider.propTypes = {
	children: PropTypes.any
};

export default UserProvider;
