import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartFirestore, updateCartFirestore } from '../../firebase/utils';

export const syncWithFirestore = createAsyncThunk(
	'cart/syncWithFirestore',
	async userId => {
		const firebaseCart = await getCartFirestore(userId);
		return firebaseCart;
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: [],
		cartTotal: null,
		numberOfProducts: 0,
		syncedWithFirestore: false
	},
	reducers: {
		addToCart: (state, action) => {
			const product = action.payload;
			const newItem = { ...product, amount: 1 };

			// Check if item is added already.
			// If item already in cart, increment value only. Otherwise, add item + value of 1
			const cartItem = state.cart.find(item => item.id === product.id);
			if (cartItem) {
				const updatedCart = [...state.cart].map(item => item.id === product.id
					?				{ ...item, amount: cartItem.amount + 1 }
					:				item);
				state.cart = updatedCart;
			} else {
				state.cart.push(newItem);
			}
		},
		decrementProductAmount: (state, action) => {
			const product = action.payload;
			// Find item and decrement amount by 1
			const cartItem = state.cart.find(item => item.id === product.id);
			const updatedCart = [...state.cart].map(item => item.id === product.id
				?				{ ...item, amount: cartItem.amount - 1 }
				:				item);
			state.cart = updatedCart;
		},
		removeFromCart: (state, action) => {
			const id = action.payload;
			const newCart = state.cart.filter(product => product.id !== id);
			state.cart = newCart;
		}
	},
	extraReducers: builder => {
		builder.addCase(syncWithFirestore.fulfilled, (state, action) => {
			state.cart = action.payload;
			state.syncedWithFirestore = true;
		});
	}
});

export const { addToCart, decrementProductAmount, removeFromCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;
export const selectNumberOfProducts = state => state.cart.cart.reduce((total, product) => total + product.amount, 0);
export const selectCartTotal = state => state.cart.cart.reduce((total, product) => (total + (product.amount * product.price)), 0);

export default cartSlice.reducer;
