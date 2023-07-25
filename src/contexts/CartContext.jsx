import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

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

	return (
		<CartContext.Provider value={{ cart, addToCart, decrementProductAmount }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
