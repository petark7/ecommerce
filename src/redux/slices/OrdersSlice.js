import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: []
	},
	reducers: {}
});

export const selectOrders = state => state.orders.orders;

export default ordersSlice.reducer;
