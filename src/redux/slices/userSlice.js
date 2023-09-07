import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAccountSettingsFirestore, loginUser, logout, updatePersonalInfoFirestore } from '../../firebase/utils';
import { clearCart } from './cartSlice';

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

export const updateAccountSettings = createAsyncThunk(
	'user/updateUserData', async ({ userID, data }) => {
		const result = await updatePersonalInfoFirestore(userID, data);
		return result;
	}
);

export const fetchAccountSettings = createAsyncThunk(
	'user/fetchAccountSettings', async userID => {
		const result = await fetchAccountSettingsFirestore(userID);
		return result;
	}
);

const userSlice = createSlice({
	name: 'auth',
	initialState: { user: null, userData: null },
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logUserOut: state => {
			logout();
			state.user = null;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.rejected, () => {
				console.log('error! (great error handling, I know :D)');
			})
			.addCase(updateAccountSettings.fulfilled, (state, action) => {
				state.userData = action.payload;
			})
			.addCase(fetchAccountSettings.fulfilled, (state, action) => {
				state.userData = action.payload;
			});
	}
});

export const { setUser, logUserOut } = userSlice.actions;

export const selectUser = state => state.user.user;
export const selectUserData = state => state.user.userData;

export default userSlice.reducer;
