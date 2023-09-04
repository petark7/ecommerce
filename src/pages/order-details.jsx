import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import OrderDetailsOrderList from '../components/OrderDetailsOrderList';
import { fetchOrders, selectOrders } from '../redux/slices/ordersSlice';
import { selectUser } from '../redux/slices/userSlice';
import OrderDetailsSummary from '../components/OrderDetailsSummary';
import OrderDetailsDeliveryTracker from '../components/OrderDetailsDeliveryTracker';

const OrderDetails = () => {
	const orders = useSelector(selectOrders);
	const [order, setOrder] = useState();
	const orderId = useParams().id;
	console.log(orderId);

	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	// Get orders if not already set in store
	useEffect(() => {
		if (orders.length === 0) {
			dispatch(fetchOrders(user?.uid));
		}
	}, [user, orders.length, dispatch]);

	useEffect(() => {
		setOrder(orders?.find(order => order.id === orderId));
	}, [orders, orderId]);

	return (
		<Layout>
			<section className="flex gap-5 my-10 md:justify-center min-h-screen p-4">
				<div className="flex flex-col gap-3 md:border md:p-7 md:rounded-xl">
					<div className="text-2xl font-semibold">
						Order Details
					</div>

					<div>

						{/* top part */}
						<div className="flex flex-col gap-2 bg-gradient-to-r from-[#FF5E62] to-[#FF9966] p-10 rounded-lg">
							<div className="text-3xl text-white font-semibold">
								Order #08974
							</div>
							<div className="font-thin text-white">
								July 25, 2022 at 09:45 AM
							</div>
						</div>

						<div className="flex flex-col mt-10 md:mt-0 md:p-10 gap-20">
							{/* items ordered */}
							<OrderDetailsOrderList order={order} />

							{/* order summary */}
							<OrderDetailsSummary />
						</div>
					</div>
				</div>
				<OrderDetailsDeliveryTracker />
			</section>
		</Layout>
	);
};

export default OrderDetails;
