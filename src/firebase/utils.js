import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firebaseConfig } from '../firebaseConfig';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Firebase project configuration
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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

export const updateCartFirestore = async (userID, data) => {
	await setDoc(doc(db, 'users', userID), { data });
};

export const getCartFirestore = async userID => {
	const docRef = doc(db, 'users', userID);
	const docSnap = await getDoc(docRef);

	return docSnap.data().data;
};

// TODO: create user
// const createUser = async (email, password) => {};
