import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';
import { query, where, getDocs, doc, setDoc, getDoc, getFirestore, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firebaseConfig } from '../firebaseConfig';
import showToast, { ShowToast } from '../utils/toast';
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
		showToast('User logged in successfully.', { success: true });
		return ({
			uid: user.uid,
			accessToken: user.accessToken
		});
	} catch {
		showToast('You entered incorrect credentials.', { success: false });
		// TODO: implement better handling
		return ('error');
	}
};

// Log user out
export const logout = async () => {
	const auth = getAuth();
	try {
		await signOut(auth);
		showToast('Signed out successfully!', { success: true });
	} catch {
		toast.error('Something happened and your logout was not successfull');
	}
};

export const getLoggedUser = async () => {
	const user = auth.currentUser;
	return user;
};

export const setCartFirestore = async (userID, cart) => {
	const docRef = doc(db, 'users', userID);
	const docData = await getDoc(docRef);

	try {
		await setDoc(docRef, { ...docData.data(), cart });
	} catch (error) {
		console.log(error);
	}
};

export const getCartFirestore = async userID => {
	const docRef = doc(db, 'users', userID);
	const docSnap = await getDoc(docRef);
	return docSnap.data().cart;
};

// Create order and generate random unique ID
export const createOrderFirestore = async (userID, formData) => {
	const orderData = {
		userID,
		...formData
	};

	try {
		const date = new Date().toJSON();

		const dataToSend = {
			...orderData,
			createdAt: date,
			statuses: {
				orderPlaced: {
					date
				},

				orderPicked: {
					date: ''
				},

				orderBoxed: {
					date: ''
				},

				orderShipped: {
					date: ''
				},

				orderDelivered: {
					date: ''
				}

			}
		};

		const docRef = await addDoc(collection(db, 'orders'), dataToSend);
		ShowToast('Order submitted successfully', { success: true });

		return (docRef);
	} 	catch {
		ShowToast('Submitting order failed... try again.', { success: false });
	}
};

export const getOrdersForUser = async userID => {
	const ordersCollection = collection(db, 'orders');
	const q = query(ordersCollection, where('userID', '==', userID));
	const querySnapshot = await getDocs(q);

	const orders = [];
	for (const doc of querySnapshot.docs) {
		orders.push({ id: doc.id, ...doc.data() });
	}

	return orders;
};

export const updatePersonalInfoFirestore = async (userID, data) => {
	const docRef = doc(db, 'users', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		try {
			const userData = {
				...docSnap.data(),
				userData: data
			};

			await setDoc(docRef, userData);
			ShowToast('Successfully updated data!', { success: true });
			return userData.userData;
		} catch {
			ShowToast('Updating the personal data has been unsuccessful...', { success: false });
		}
	}
};

export const fetchAccountSettingsFirestore = async userID => {
	const docRef = doc(db, 'users', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		try {
			return docSnap.data().userData;
		} catch {
			console.log('Error fetching account settings...');
		}
	}
};

export const updatePasswordFirebase = async newPassword => {
	const auth = getAuth();
	const user = auth.currentUser;

	try {
		await updatePassword(user, newPassword);
		ShowToast('Password updated successful.', { success: true });
	} catch {
		ShowToast('Updating the password has been unsuccessful.', { success: false });
	}
};

// TODO: create user
// const createUser = async (email, password) => {};
