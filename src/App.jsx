import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/utils';
import { setUser } from './redux/slices/UserSlice';
import { syncWithFirestore } from './redux/slices/cartSlice';
import Routes from './router';

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// Const syncCartWithFirestore = (userId) => {

	// }

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(setUser({
					uid: user.uid,
					accessToken: user.accessToken
				}));
				dispatch(syncWithFirestore(user.uid));
			}
		});
	}, []);

	return (
		<>
			<ToastContainer />
			<Routes />
		</>
	);
};

export default App;
