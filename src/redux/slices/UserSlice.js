import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logout } from '../../firebase/utils';

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

const userSlice = createSlice({
	name: 'auth',
	initialState: { user: null },
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logUserOut: state => {
			logout();
			state.user = null;
		}
	},
	extraReducers: {
		[login.rejected]: (state, action) => {
			console.log('error!');
		}
	}
});

export const { setUser, logUserOut } = userSlice.actions;

export default userSlice.reducer;
