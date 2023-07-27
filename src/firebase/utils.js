import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../firebaseConfig';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Firebase project configuration
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

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

// Log user out
export const logout = async () => {
	const auth = getAuth();
	try {
		const result = await signOut(auth);
		toast.success(result);
	} catch (error) {
		console.log(error);
	}
};

// TODO: create user
const createUser = async (email, password) => {};
