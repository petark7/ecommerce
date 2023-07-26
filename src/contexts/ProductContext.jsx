import PropTypes from 'prop-types';
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

	const getProduct = id => products.find(product => id == product.id);

	return (
		<ProductContext.Provider value={{ products, getProduct }}>
			{children}
		</ProductContext.Provider>
	);
};

ProductProvider.propTypes = {
	children: PropTypes.node
};

export default ProductProvider;
