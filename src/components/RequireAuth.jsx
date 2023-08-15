import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { selectUser } from '../redux/slices/UserSlice';
import { getLoggedUser } from '../firebase/utils';

const RequireAuth = ({ children }) => {
	const [user, setUser] = useState();
	const navigate = useNavigate();

	console.log(user);

	useEffect(() => {
		const checkIfLogged = async () => {
			const userAcc = await getLoggedUser();

			if (!userAcc?.uid) {
				navigate('/');
			}
		};
	}, []);

	return children;
};

RequireAuth.propTypes = {
	children: PropTypes.node
};

export default RequireAuth;
