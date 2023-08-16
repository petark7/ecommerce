import PropTypes from 'prop-types';
import { useState } from 'react';

const RequireAuth = ({ children }) => {
	const [user, setUser] = useState();

	// REMOVED INEFFECTIVE CODE
	// TODO: FIND A WAY TO IMPLEMENT PROTECTED ROUTES CORRECTLY

	return children;
};

RequireAuth.propTypes = {
	children: PropTypes.node
};

export default RequireAuth;
