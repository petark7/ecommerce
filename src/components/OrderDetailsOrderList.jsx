import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderDetailsOrderList = ({ order }) => {
	const [orderProductsJSX, setOrderProductsJSX] = useState();

	useEffect(() => {
		if (order?.cart?.length > 0) {
			const productsJSX = order?.cart.map((product, index) => (
				<tr key={product.id} className="h-[80px]">
					<th>{index + 1}</th>
					<td>
						<Link
							className="uppercase font-semibold max-w-[240px] hover:text-red-400"
							to={`/product-details/${product.id}`}
						><div className="flex flex-col md:flex-row gap-3 font-semibold text-md items-center">
							<img className="w-14" src={product?.image} />
							<div className="max-w-[200px]">{product?.title}</div>
						</div>
						</Link>

					</td>
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
