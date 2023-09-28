import PropTypes from 'prop-types';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementProductAmount, removeFromCart, selectIsUpdating } from '../redux/slices/cartSlice';
import { setSidebarOpen } from '../redux/slices/sidebarSlice';
import { selectUser } from '../redux/slices/userSlice';
import QuantityCounter from './QuantityCounter';

const CartItem = ({ product }) => {
	const dispatch = useDispatch();
	const { image, title, price, amount } = product;
	const totalPrice = (amount * price);
	const isUpdating = useSelector(selectIsUpdating);
	const user = useSelector(selectUser);

	const incrementProduct = () => {
		if (!isUpdating && user) {
			dispatch(addToCart(product));
		} else if (!user) {
			// Code when user is not logged in
			dispatch(addToCart(product));
		}
	};

	const decrementProduct = () => {
		if (!isUpdating && user) {
			dispatch(decrementProductAmount(product));
		} else if (!user) {
			// Code when user is not logged in
			dispatch(decrementProductAmount(product));
		}
	};

	return (
		<div className="flex items-center my-5 border-b pb-5 gap-3 p-5 select-none">
			{/* image */}
			<div>
				<img src={image} className="w-28" />
			</div>

			{/* controls */}
			<div className="w-full flex flex-col py-2 column">

				{/* title & close btn */}
				<div className="flex justify-between mb-2">
					<Link
						className="uppercase font-semibold max-w-[240px] hover:text-red-400"
						to={`/product-details/${product.id}`}
						onClick={() => dispatch(setSidebarOpen(false))}
					>{title}
					</Link>
					<FontAwesomeIcon
						className="text-xl text-gray-600 cursor-pointer hover:text-red-400"
						icon={faClose}
						onClick={() => dispatch(removeFromCart(product.id))} />
				</div>

				{/* counter (item quantity) */}
				<div className="flex gap-3">
					<QuantityCounter
						quantity={amount}
						incrementAction={incrementProduct}
						decrementAction={decrementProduct}
					/>
					<div className="flex w-full justify-between items-center">
						{/* item price */}
						<div className="select-none">
							${price}
						</div>
						<div className="select-none font-bold text-red-400 text-xl">
							{/* total items price */}
							${Number.parseFloat(totalPrice).toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CartItem.propTypes = {
	product: PropTypes.shape({
		amount: PropTypes.number,
		id: PropTypes.string,
		image: PropTypes.string,
		price: PropTypes.number,
		title: PropTypes.string
	})
};

export default CartItem;
