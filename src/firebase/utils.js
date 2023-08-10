import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firebaseConfig } from '../firebaseConfig';
import showToast from '../utils/toast';
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
		showToast('User logged in successfully.');
		return ({
			uid: user.uid,
			accessToken: user.accessToken
		});
	} catch (error) {
		showToast('You entered incorrect credentials.', false, true);
		const errorCode = error.code;
		// TODO: implement better handling
		return ('error');
	}
};

// Log user out
export const logout = async () => {
	const auth = getAuth();
	try {
		const result = await signOut(auth);
		toast.success(result);
	} catch {
		toast.error('Something happened and your logout was not successfull');
	}
};

export const updateCartFirestore = async (userID, cart) => {
	await setDoc(doc(db, 'users', userID), { cart });
};

export const getCartFirestore = async userID => {
	const docRef = doc(db, 'users', userID);
	const docSnap = await getDoc(docRef);
	console.log(docSnap.data().cart);
	return docSnap.data().cart;
};

// TODO: create user
// const createUser = async (email, password) => {};
