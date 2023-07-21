import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
				<div className="absolute top-0 right-0 bg-red-500/40 p-2
				flex flex-column
						" />
			</div>
			<div className="product-title">
				{title}
			</div>
		</div>
	);
};

export default Product;
