import { useSelector } from 'react-redux';
import { selectCart } from '../redux/slices/cartSlice';
import CheckoutItem from './CheckoutItem';

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
