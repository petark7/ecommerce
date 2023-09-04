import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderFirestore, getOrdersForUser, updateOrderFirestore } from '../../firebase/utils';
import { logUserOut } from './userSlice';

// Async thunk
export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async (userID, thunkAPI) => {
		const orders = thunkAPI.getState().orders.orders;
		if (orders.length === 0) {
			const response = await getOrdersForUser(userID);
			return response;
		}

		return orders;
	}
);

export const updateOrder = createAsyncThunk(
	'orders/updateOrder',
	async ({ orderId, updatedData }, thunkAPI) => {
		const response = await updateOrderFirestore(orderId, updatedData);
		return response;
	}
);

const ordersSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: [],
		status: 'idle',
		error: null
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchOrders.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Add any fetched orders to the array
				state.orders = action.payload;
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(logUserOut, state => {
				state.orders = {
					orders: [],
					status: 'idle',
					error: null
				};
			});
	}
});

export const selectOrders = state => state.orders.orders;
export const selectOrdersStatus = state => state.orders.status;

export default ordersSlice.reducer;
