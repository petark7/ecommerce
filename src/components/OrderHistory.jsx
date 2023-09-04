import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../redux/slices/userSlice';
import { fetchOrders, selectOrders, selectOrdersStatus } from '../redux/slices/ordersSlice';
import OrderHistoryElement from './OrderHistoryElement';

const OrderHistory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const orders = useSelector(selectOrders);
	const [renderableOrders, setRenderableOrders] = useState();
	const ordersStatus = useSelector(selectOrdersStatus);
	const [sortBy, setSortBy] = useState('date');

	const handleSortBy = event => {
		setSortBy(event.target.value);
	};

	const sortOrders = (orders, sortBy) => {
		const ordersCopy = [...orders]; // Create a copy of the array
		return ordersCopy.sort((a, b) => {
			switch (sortBy) {
				case 'date': {
					return new Date(b.createdAt) - new Date(a.createdAt);
				}

				case 'total': {
					return Number(b.total) - Number(a.total);
				}

				case 'quantity': {
					return b.cart.length - a.cart.length;
				}

				default: {
					return 0;
				}
			}
		});
	};

	useEffect(() => {
		dispatch(fetchOrders(user?.uid));
	}, [user]);

	useEffect(() => {
		console.log(orders);
		if (orders.length > 0) {
			const sortedOrders = sortOrders(orders, sortBy);
			const orderElements = sortedOrders.map(order => (
				<OrderHistoryElement
					key={order.id}
					id={order.id}
					status={order.status}
					items={order.cart}
					total={order.total}
					dateOrdered={order.createdAt}
					buttonAction={orderId => navigate(`/order-details/${orderId}`)} />
			));
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
					onChange={handleSortBy}
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
