import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../firebase/utils";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const products = await fetchProducts();
  return products;
});

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => action.payload);
  },
});

export default productSlice.reducer;
