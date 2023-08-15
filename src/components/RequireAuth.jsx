import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { selectUser } from '../redux/slices/UserSlice';

const RequireAuth = ({ children }) => {
	const user = useSelector(selectUser);
	const location = useLocation();

	if (!user?.uid) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children;
};

RequireAuth.propTypes = {
	children: PropTypes.node
};

export default RequireAuth;
