import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrdersForUser } from '../firebase/utils';
import OrderDetails from './OrderDetails';
import { selectUser } from '../redux/slices/UserSlice';

const OrderHistory = () => {
	const [orders, setOrders] = useState();
	const user = useSelector(selectUser);
	const [renderableOrders, setRenderableOrders] = useState();
	const test = async () => {
		const orders = await getOrdersForUser(user.uid);
		setOrders(orders);
	};

	useEffect(() => {
		test();
	}, []);
	useEffect(() => {
		if (orders) {
			const orderElements = orders.map(order => (
				<OrderDetails />
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
