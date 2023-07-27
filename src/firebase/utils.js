import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { firebaseConfig } from '../firebaseConfig';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Firebase project configuration

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginUser = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		toast.success('User logged in successfully.');
		return (user);
	} catch (error) {
		toast.error('You entered incorrect credentials');
		const errorCode = error.code;
		const errorMessage = error.message;
		return (errorMessage);
	}
};

const isUserLoggedIn = () => {
	onAuthStateChanged(auth, user => {
		if (user) {
			return true;
		}

		return false;
	});
};

// TODO: create user
const createUser = async (email, password) => {};
