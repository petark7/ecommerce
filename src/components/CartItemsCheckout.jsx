import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import QuantityCounter from '../components/QuantityCounter';
import { selectCart } from '../redux/slices/CartSlice';
import CheckoutItem from './checkoutItem';

const CartItemsCheckout = () => {
	const cart = useSelector(selectCart);

	return (
		<table className="table">
			{/* head */}
			<thead>
				<tr>
					<th>Product</th>
					<th>Quantity</th>
					<th>Total</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{/* products */}
				{cart.map(product => <CheckoutItem key={product.id} product={product} />)}
			</tbody>

		</table>
	);
};

export default CartItemsCheckout;
