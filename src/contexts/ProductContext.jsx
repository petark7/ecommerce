import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const getProducts = async () => {
			try {
				const products = await axios.get('https://fakestoreapi.com/products');
				const filteredProducts = products.data.filter(product => product.category === 'women\'s clothing' || product.category === 'men\'s clothing');
				setProducts(filteredProducts);
			} catch (error) {
				console.log(error);
			}
		};

		getProducts();
	}, []);

	return (
		<ProductContext.Provider value={products}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductProvider;
