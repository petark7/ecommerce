import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersForUser } from '../firebase/utils';
import { selectUser } from '../redux/slices/UserSlice';
import { fetchOrders, selectOrders, selectOrdersStatus } from '../redux/slices/OrdersSlice';
import OrderDetails from './OrderDetails';

const OrderHistory = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const orders = useSelector(selectOrders);
	const [renderableOrders, setRenderableOrders] = useState();

	const sortOrders = (orders, sortBy) => {
		const ordersCopy = [...orders]; // Create a copy of the array
		return ordersCopy.sort((a, b) => {
			switch (sortBy) {
				case 'date': {
					return new Date(b.createdAt) - new Date(a.createdAt);
				}

				case 'price': {
					return b.total - a.total;
				}

				case 'items': {
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
	navigator.clipboard.writeText(JSON.stringify(orders));

	useEffect(() => {
		console.log(orders);
		if (orders.length > 0) {
			const sortedOrders = sortOrders(orders, 'date');
			const orderElements = sortedOrders.map(order => (
				<OrderDetails
					key={order.id}
					id={order.id}
					status={order.status}
					items={order.cart}
					total={order.total}
					dateOrdered={order.createdAt}
					buttonAction={() => {
						alert();
					}} />
			));
			setRenderableOrders(orderElements);
		} else if (selectOrdersStatus === 'succeeded') {
			setRenderableOrders(<div className="text-center text-2xl">You haven&apos;t made any orders yet!</div>);
		}
	}, [orders]);
	return (
		<div className="flex flex-col">
			{renderableOrders}
		</div>
	);
};

export default OrderHistory;
