import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import sidebarReducer from './slices/SidebarSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		product: productReducer,
		sidebar: sidebarReducer
	}
});
