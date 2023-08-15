import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersForUser } from '../firebase/utils';
import { selectUser } from '../redux/slices/UserSlice';
import { fetchOrders, selectOrders } from '../redux/slices/OrdersSlice';
import OrderDetails from './OrderDetails';

const OrderHistory = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const orders = useSelector(selectOrders);
	const [renderableOrders, setRenderableOrders] = useState();
	const getOrders = async () => {
		dispatch(fetchOrders(user.uid));
		// Const orders = await getOrdersForUser(user.uid);
	};

	useEffect(() => {
		getOrders();
	}, []);

	console.log(orders);
	useEffect(() => {
		if (orders.length > 0) {
			const orderElements = orders.map(order => (
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
		}
	}, [orders]);
	return (
		<div className="flex flex-col">
			{renderableOrders}
		</div>
	);
};

export default OrderHistory;
