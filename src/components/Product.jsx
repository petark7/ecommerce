import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	const { id, image, category, title, price } = product;

	return (
		<div className="product-card">
			<div className="product-image border border-[#e4e4e4] h-[300px] mb-4
			relative overflow-hidden group transition"
			>
				{/* Image */}
				<div className="w-full h-full flex justify-center
					items-center "
				>
					<img
						className="w-[120px] group-hover:scale-110 mx-auto flex justify-center
						items-center transition duration-300" src={image} />
				</div>

				{/* Buttons */}
				<div className="absolute top-6 -right-11 group-hover:right-2 p-2
				flex flex-col gap-2 opacity-0 group-hover:opacity-100
				transition-all duration-300"
				>
					<button className="w-10 h-10 bg-red-500 shadow-md">
						<FontAwesomeIcon className="text-white" icon={faPlus} />
					</button>

					<Link
						to={`/product-details/${id}`} className="w-10 h-10 flex justify-center
					items-center bg-white shadow-md"
					>
						<FontAwesomeIcon className="text-gray" icon={faEye} />
					</Link>
				</div>
			</div>
			<div className="product-title">
				{title}
			</div>
		</div>
	);
};

export default Product;
