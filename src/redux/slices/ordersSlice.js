import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersForUser } from "../../firebase/utils";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await getOrdersForUser(userID);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
