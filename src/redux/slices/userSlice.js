import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAccountSettingsFirestore,
  loginUser,
  logout,
  updatePersonalInfoFirestore,
} from "../../firebase/utils";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await loginUser(credentials.email, credentials.password);
      if (result === "auth/invalid-email") {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAccountSettings = createAsyncThunk(
  "user/updateUserData",
  async ({ userID, data }, { rejectWithValue }) => {
    try {
      const result = await updatePersonalInfoFirestore(userID, data);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAccountSettings = createAsyncThunk(
  "user/fetchAccountSettings",
  async (userID, { rejectWithValue }) => {
    try {
      const result = await fetchAccountSettingsFirestore(userID);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userData: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      logout();
      state.user = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateAccountSettings.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchAccountSettings.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.userData = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserData = (state) => state.user.userData;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
