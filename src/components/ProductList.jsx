import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import { getProducts } from '../redux/slices/ProductSlice';

const ProductList = () => {
	const dispatch = useDispatch();

	// Dispatch the getProducts action when the component mounts
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	// Select the products from the state
	const products = useSelector(state => state.product);

	return (
		<div className="py-16 mx-10">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2
				lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto
				md:max-w-none"
				>
					{products.map(
						product => (
							<Product key={product.id} product={product} />
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
