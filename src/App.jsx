import { ToastContainer } from 'react-toastify';
import SidebarProvider from './contexts/SidebarContext';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './redux/slices/UserSlice';
import { auth } from './firebase/utils';
import Routes from './router';

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(setUser({
					uid: user.uid,
					accessToken: user.accessToken
				}));
				navigate('/');
			}
		});
	}, [navigate, dispatch]);

	return (
		<SidebarProvider>
			<ToastContainer />
			<Routes />
		</SidebarProvider>
	);
};

export default App;
