import { useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
	const { id } = useParams();
	const { getProduct } = useContext(ProductContext);
	const [product, setProduct] = useState({});
	const { addToCart } = useContext(CartContext);

	useEffect(() => {
		setProduct(getProduct(id));
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<Layout>
			<section className="py-20 min-h-screen">
				{/* container for all elements */}
				<div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
					<img className="mb-8 lb:mb-0 pb-4 max-w-[200px] lg:max-w-sm lg:mr-20" src={product.image} />
					{/* title, price, description, add to cart button */}
					<div className="flex flex-col gap-4 max-w-[700px]">
						<div className="text-2xl font-semibold text-center lg:text-left">{product.title} </div>
						<div className="text-red-400 text-2xl">${product.price}</div>
						<div className="text-xl">{product.description}</div>
						<div>
							<button
								type="button"
								className="flex font-semibold justify-center p-4 mt-4 lg:mt-5 border w-full lg:w-[200px]
								 bg-gray-700 text-white"
								onClick={() => {
									addToCart(product);
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
