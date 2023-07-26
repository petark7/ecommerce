import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Product = ({ product }) => {
	const { id, image, category, title, price } = product;
	const { addToCart } = useContext(CartContext);

	return (
		<div className="product-card">
			<div className="product-image border border-[#e4e4e4] h-[300px] mb-4
			relative overflow-hidden group transition"
			>
				{/* Image */}
				<div
					className="w-full h-full flex justify-center
					items-center cursor-pointer"
				>
					<Link
						to={`/product-details/${id}`}
					>
						<img
							className="w-[120px] group-hover:scale-110 mx-auto flex justify-center
						items-center transition duration-300" src={image} />
					</Link>
				</div>

				{/* Buttons */}
				<div className="absolute top-2 -right-0 group-hover:right-2 p-2
				flex flex-col gap-2 opacity-0 group-hover:opacity-100
				transition-all duration-200"
				>
					<button
						type="button" className="hover:scale-110 transition duration-200 w-10 h-10 bg-red-500 shadow-md" onClick={() => {
							console.log(product);
							addToCart(product);
						}}
					>
						<FontAwesomeIcon className="text-white" icon={faCartShopping} />
					</button>
				</div>
			</div>

			{/* Category title and price */}
			<div>
				<div>
					<div className="text-sm capitalize text-gray-500">
						{category}
					</div>

					<Link
						className="font-semibold mb-1"
						to={`/product-details/${id}`}
					>
						{title}
					</Link>

					<div className="font-bold text-red-400">
						${price}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;