import { createContext, useEffect, useState, useContext } from 'react';
import { getCartFirestore, updateCartFirestore } from '../firebase/utils';
import { UserContext } from './UserContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [cartTotal, setCartTotal] = useState(null);
	const { user } = useContext(UserContext);
	const [syncedWithFirestore, setSyncedWithFirestore] = useState(false);
	const [numberOfProducts, setNumberOfProducts] = useState(0);
	const addToCart = product => {
		const newItem = { ...product, amount: 1 };

		// Check if item is added already
		const cartItem = cart.find(item => item.id === product.id);
		if (cartItem) {
			// Item already in cart, increment value only
			const updatedCart = [...cart].map(item => item.id === product.id
				?				{ ...item, amount: cartItem.amount + 1 }
				:				item);
			setCart(updatedCart);
		} else {
			// Add product with amount 1
			setCart(previousItems => ([...previousItems,
				newItem]));
		}
	};

	const decrementProductAmount = product => {
		// Find item and decrement amount by 1
		const cartItem = cart.find(item => item.id === product.id);
		const updatedCart = [...cart].map(item => item.id === product.id
			?				{ ...item, amount: cartItem.amount - 1 }
			:				item);
		setCart(updatedCart);
	};

	const syncWithFirestore = async () => {
		const firebaseCart = await getCartFirestore(user?.uid);
		setCart(firebaseCart);
		setSyncedWithFirestore(true);
	};

	const removeFromCart = id => {
		const newCart = cart.filter(product => product.id !== id);
		setCart(newCart);
	};

	useEffect(() => {
		let total = 0;
		let numberOfProducts = 0;

		cart.map(product => {
			total += product.price * product.amount;
			numberOfProducts += product.amount;
			return 0;
		});
		setCartTotal(Number.parseFloat(total).toFixed(2));
		setNumberOfProducts(numberOfProducts);

		(syncedWithFirestore && updateCartFirestore(user?.uid, cart));
	}, [cart]);

	useEffect(() => {
		if (user) {
			syncWithFirestore();
		}
	}, [user]);

	return (
		<CartContext.Provider value={{ cart,
			addToCart,
			decrementProductAmount,
			cartTotal,
			numberOfProducts,
			removeFromCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
