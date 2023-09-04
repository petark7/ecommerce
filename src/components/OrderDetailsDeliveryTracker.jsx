import { faBox, faCashRegister, faCheck, faShoppingCart, faTruck, faVanShuttle } from '@fortawesome/free-solid-svg-icons';
import OrderStatusElement from './OrderStatusElement';

const OrderDetailsDeliveryTracker = () => (
	<div className="flex flex-col gap-3 md:border md:p-7 md:rounded-xl w-full">
		<div className="text-2xl font-semibold">Order Status</div>
		<div className="flex flex-col gap-10">
			<OrderStatusElement
				isFirst
				isCompleted
				icon={faCashRegister}
				statusName="Order Placed"
				statusDate="27 Jul 2022" />

			<OrderStatusElement
				isCompleted
				isFirst={false}
				icon={faShoppingCart}
				statusName="Order Picked"
				statusDate="27 Jul 2022" />

			<OrderStatusElement
				isCompleted
				isFirst={false}
				icon={faBox}
				statusName="Order Boxed"
				statusDate="27 Jul 2022" />

			<OrderStatusElement
				isCompleted
				isFirst={false}
				icon={faTruck}
				statusName="Shipped"
				statusDate="27 Jul 2022" />

			<OrderStatusElement
				isCompleted
				isFirst={false}
				icon={faCheck}
				statusName="Delivered"
				statusDate="27 Jul 2022" />
		</div>
	</div>
);

export default OrderDetailsDeliveryTracker;
