import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuantityCounter from '../components/QuantityCounter';

const CartItemsCheckout = () => (
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
			{/* row 1 */}
			<tr>
				<td>
					<div className="flex items-center space-x-3">
						<div className="w-25 h-25">
							<img
								className="w-[100px] object-cover object-center"
								src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" />
						</div>
						<div>
							<div className="font-bold">Mens Casual Slim Fit</div>
						</div>
					</div>
				</td>
				<td>
					<QuantityCounter quantity={2} />
				</td>
				<td>$15</td>
				<th>
					<FontAwesomeIcon
						className="text-xl text-gray-500 cursor-pointer  hover:text-red-400"
						icon={faClose}
						onClick={() => {}} />
				</th>
			</tr>

			{/* row 2 */}
			<tr>
				<td>
					<div className="flex items-center space-x-3">

						<div className="w-25 h-25">
							<img
								className="w-[100px] object-cover object-center"
								src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
							/>
						</div>
						<div>
							<div className="font-bold">Wimens Casual Slim Fit</div>
							<div className="text-sm opacity-50">Red</div>
						</div>
					</div>
				</td>
				<td>
					<QuantityCounter quantity={2} />
				</td>
				<td>$15</td>
				<th>
					<FontAwesomeIcon
						className="text-xl text-gray-500 cursor-pointer  hover:text-red-400"
						icon={faClose}
						onClick={() => {}} />
				</th>
			</tr>

			{/* row 3 */}
			<tr>
				<td>
					<div className="flex items-center space-x-3">

						<div className="w-25 h-25">
							<img
								className="w-[100px] object-cover object-center"
								src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
							/>
						</div>
						<div>
							<div className="font-bold">Wimens Casual Slim Fit</div>
							<div className="text-sm text-red-600 font-semibold">Red</div>
						</div>
					</div>
				</td>
				<td>
					<QuantityCounter quantity={2} />
				</td>
				<td>$15</td>
				<th>
					<FontAwesomeIcon
						className="text-xl text-gray-500 cursor-pointer  hover:text-red-400"
						icon={faClose}
						onClick={() => {}} />
				</th>
			</tr>
		</tbody>

	</table>
);

export default CartItemsCheckout;
