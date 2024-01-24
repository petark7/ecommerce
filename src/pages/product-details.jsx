import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { getProducts } from '../redux/slices/productSlice';
import { addToCart, selectIsUpdating } from '../redux/slices/cartSlice';
import ShowToast from '../utils/toast';
import { selectUser } from '../redux/slices/userSlice';
import { ADD_PRODUCT_SUCCESS } from '../constants/toastMessages';

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const products = useSelector(state => state.product);
	const [product, setProduct] = useState({});
	const isUpdating = useSelector(selectIsUpdating);
	const user = useSelector(selectUser);
	const getProduct = id => products.find(product => id == product.id);

	// Set product and scroll to top
	useEffect(() => {
		if (products) {
			setProduct(getProduct(id));
		}

		window.scrollTo({ top: 0 });
	}, [id, products]);

	useEffect(() => {
		if (products.length === 0) {
			dispatch(getProducts());
		}
	}, []);

	return (
		<Layout>
			<section className="py-20 min-h-screen flex">
				{/* container for all elements */}
				<div className="container mx-auto flex flex-col
				lg:flex-row items-center justify-center"
				>
					<img
						className="mb-8 lb:mb-0 pb-4 max-w-[200px] lg:max-w-sm lg:mr-20"
						src={product?.image}
					/>

					{/* title, price, description, add to cart button */}
					<div className="flex flex-col gap-4 max-w-[700px]">

						{/* title */}
						<div className="text-2xl font-semibold text-center lg:text-left">
							{product?.title}
						</div>

						{/* price */}
						<div className="text-red-400 text-2xl">${product?.price}</div>

						{/* description */}
						<div className="text-xl">{product?.description}</div>

						{/* add to cart button */}
						<div>
							<button
								type="button"
								className="flex font-semibold justify-center p-4 mt-4 lg:mt-5 border w-full lg:w-[200px]
								 bg-gray-700 text-white rounded-md"
								onClick={() => {
									if (!isUpdating || !user) {
										dispatch(addToCart(product));
										ShowToast(ADD_PRODUCT_SUCCESS, { success: true, position: 'bottom-right' });
									}
								}}
							>	Add to cart
							</button>

						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ProductDetails;
