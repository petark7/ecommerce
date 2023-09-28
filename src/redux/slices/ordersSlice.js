import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersForUser } from '../../firebase/utils';
import { logUserOut } from './userSlice';

// Async thunk
export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async userID => {
		const response = await getOrdersForUser(userID);
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
export const selectOrdersErrorStatus = state => state.orders.error;

export default ordersSlice.reducer;
