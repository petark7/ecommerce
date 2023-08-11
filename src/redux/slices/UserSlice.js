import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logout } from '../../firebase/utils';
import { clearCart } from './CartSlice';

export const login = createAsyncThunk(
	'auth/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const result = await loginUser(credentials.email, credentials.password);
			if (result === 'auth/invalid-email') {
				return rejectWithValue(result);
			}

			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const clearCartAction = createAsyncThunk(
	'user/logUserOut',
	async (_, { dispatch }) => {
		// Perform logout operation here
		dispatch(clearCart());
	}
);

const userSlice = createSlice({
	name: 'auth',
	initialState: { user: null },
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logUserOut: state => {
			logout();
			state.user = { user: null };
		}
	},
	extraReducers: {
		[login.rejected]: (state, action) => {
			console.log('error!');
		}
	}
});

export const { setUser, logUserOut } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;
