import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/utils';
import { selectUser, setUser } from './redux/slices/UserSlice';
import { selectCartTotal, setFirebaseCart, syncWithFirestore } from './redux/slices/cartSlice';
import Routes from './router';

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const cartTotal = useSelector(selectCartTotal);

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

	useEffect(() => {
		dispatch(setFirebaseCart(user?.uid));
	}, [cartTotal]);
	return (
		<>
			<ToastContainer />
			<Routes />
		</>
	);
};

export default App;
