import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const OrderDetailsOrderList = ({ order }) => {
	const [orderProductsJSX, setOrderProductsJSX] = useState();

	useEffect(() => {
		if (order?.cart?.length > 0) {
			const productsJSX = order?.cart.map((product, index) => (
				<tr key={product.id} className="h-[80px]">
					<th>{index + 1}</th>
					<td>{product?.title}</td>
					<td>${product?.price}</td>
					<td className="text-center">{product?.amount}</td>
					<td>${product?.price * product.amount}</td>
				</tr>
			));

			setOrderProductsJSX(productsJSX);
		}
	}, [order]);
	return (

		<div>
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th />
						<th className="uppercase">Name</th>
						<th className="uppercase">Price</th>
						<th className="uppercase">Quantity</th>
						<th className="uppercase">Total</th>
					</tr>
				</thead>
				<tbody>
					{orderProductsJSX}
				</tbody>
			</table>
		</div>
	);
};

OrderDetailsOrderList.propTypes = {
	order: PropTypes.shape({
		cart: PropTypes.array
	})
};

export default OrderDetailsOrderList;
