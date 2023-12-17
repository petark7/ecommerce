import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../constants/sanity';
// Import axios from 'axios';

export const getProducts = createAsyncThunk(
	'product/getProducts',
	async () => {
		// Const products = await axios.get('https://fakestoreapi.com/products');
		// //const filteredProducts = products.data.filter(product => product.category === 'women\'s clothing' || product.category === 'men\'s clothing');
		// return products.data;
		const products = fetchProducts();
		return products;
	}
);

const productSlice = createSlice({
	name: 'product',
	initialState: [],
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getProducts.fulfilled, (state, action) => action.payload);
	}
});

export default productSlice.reducer;
