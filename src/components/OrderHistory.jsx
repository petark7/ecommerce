import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../redux/slices/userSlice';
import { fetchOrders, selectOrders, selectOrdersStatus } from '../redux/slices/ordersSlice';
import { getOrderStatus } from '../utils/statuses';
import { getItemQuantity, sortOrders } from '../utils/orderHistory';
import OrderHistoryElement from './OrderHistoryElement';

const OrderHistory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const orders = useSelector(selectOrders);
	const [renderableOrders, setRenderableOrders] = useState();
	const ordersStatus = useSelector(selectOrdersStatus);
	const [sortBy, setSortBy] = useState('date');

	useEffect(() => {
		dispatch(fetchOrders(user?.uid));
	}, [user]);

	useEffect(() => {
		if (orders.length > 0) {
			const sortedOrders = sortOrders(orders, sortBy);
			const orderElements = sortedOrders.map(order => {
				const orderStatus = getOrderStatus(order);
				return (
					<OrderHistoryElement
						key={order.id}
						id={order.id}
						status={orderStatus}
						itemQuantity={getItemQuantity(order.cart)}
						total={order.total}
						dateOrdered={order.createdAt}
						buttonAction={orderId => navigate(`/order-details/${orderId}`, {
							state: {
								itemQuantity: order.cart.length
							}
						})} />
				);
			});
			setRenderableOrders(orderElements);
		} else if (ordersStatus === 'succeeded') {
			setRenderableOrders(<div className="text-center text-2xl">You haven&apos;t made any orders yet!</div>);
		}
	}, [orders, sortBy]);

	return (
		<div className="flex flex-col">
			<div className="flex text-end justify-end items-center gap-4">
				<label className="block mb-2 font-medium text-gray-900">Sort by</label>
				<select
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
				 focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-fit"
					onChange={event => setSortBy(event.target.value)}
				>
					<option selected value="date">Date</option>
					<option value="total">Total Amount</option>
					<option value="quantity">Item Quantity</option>
				</select>
			</div>
			{renderableOrders}
		</div>
	);
};

export default OrderHistory;
