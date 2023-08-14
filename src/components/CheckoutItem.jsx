import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import QuantityCounter from '../components/QuantityCounter';
import { addToCart, decrementProductAmount, removeFromCart } from '../redux/slices/CartSlice';

const CheckoutItem = ({ product }) => {
	const dispatch = useDispatch();

	const incrementProduct = () => {
		dispatch(addToCart(product));
	};

	const decrementProduct = () => {
		dispatch(decrementProductAmount(product));
	};

	return (
		<tr>
			<td>
				<div className="flex items-center space-x-3">

					<img
						className="max-w-[70px] object-cover object-center mr-15"
						src={product.image} />

					<div>
						<Link
							className="font-bold mr-18"
							to={`/product-details/${product.id}`}
						>
							{product.title}
						</Link>
					</div>
				</div>
			</td>

			<td>
				<QuantityCounter
					quantity={product.amount}
					incrementAction={incrementProduct}
					decrementAction={decrementProduct} />
			</td>

			<td className="font-semibold">${product.price * product.amount}</td>
			<th>
				<FontAwesomeIcon
					className="text-xl text-gray-500 cursor-pointer  hover:text-red-400"
					icon={faClose}
					onClick={() => dispatch(removeFromCart(product.id))} />
			</th>
		</tr>
	);
};

export default CheckoutItem;
