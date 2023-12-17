import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart, selectIsUpdating } from '../redux/slices/cartSlice';
import ShowToast from '../utils/toast';
import { selectUser } from '../redux/slices/userSlice';
import { ADD_PRODUCT_SUCCESS } from '../constants/toastMessages';
import { urlFor } from '../constants/sanity';
import Button from './Button';

const Product = ({ product }) => {
	const { _id, slug, images, categories, name, price } = product;
	const isUpdating = useSelector(selectIsUpdating);
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		console.log(product);
	}, []);
	const handleClick = () => {
		if (!isUpdating && user) {
			dispatch(addToCart(product));
			ShowToast(ADD_PRODUCT_SUCCESS, { success: true, position: 'bottom-right' });
		} else if (!user) {
			// Code when user is not logged in
			dispatch(addToCart(product));
			ShowToast(ADD_PRODUCT_SUCCESS, { success: true, position: 'bottom-right' });
		}
	};

	return (
		<div className="product-card">
			<div className="product-image border border-[#e4e4e4] h-[300px] mb-4
			relative overflow-hidden group transition rounded-xl shadow"
			>
				{/* Image */}
				<div
					className="w-full h-full flex justify-center
					items-center"
				>
					<Link
						to={`/product-details/${slug.current}`}
					>
						<img
							className="h-[300px] object-cover group-hover:scale-110 mx-auto flex justify-center items-center transition duration-300"
							src={urlFor(images[1].asset).url()}
							alt="Product Image"
						/>

					</Link>
				</div>

				{/* Buttons */}
				<div className="absolute top-2 -right-0 group-hover:right-2 p-2
				flex flex-col gap-2 opacity-0 group-hover:opacity-100
				transition-all duration-200"
				>
					<div className="relative">
						<button
							type="button"
							className="hover:scale-110 transition duration-200 w-10 h-10 bg-red-500 shadow-md"
							onClick={() => handleClick()}
						>
							<FontAwesomeIcon className="text-white" icon={faCartShopping} />
						</button>
					</div>
				</div>
			</div>

			{/* Category name and price */}
			<div>
				<div className="">
					<div className="text-sm capitalize text-gray-500">
						{categories[0]}
					</div>

					{/* Name */}
					<Link
						className="font-semibold mb-1"
						to={`/product-details/${slug.current}`}
					>
						{name}
					</Link>

					<div className="">
						{/* Price */}
						<div className="font-bold text-red-400">
							${price}
						</div>
						<div className="md:hidden">
							<Button handleClick={() => handleClick()}>Add to Cart
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
