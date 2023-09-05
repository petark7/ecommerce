import PropTypes from 'prop-types';
import { faBox, faCashRegister, faCheck, faShoppingCart, faTruck } from '@fortawesome/free-solid-svg-icons';
import { getFormattedDate } from '../utils/date';
import OrderStatusElement from './OrderStatusElement';

const OrderDetailsDeliveryTracker = ({ statuses }) => (
	<div className="flex flex-col gap-3 md:border md:p-7 md:rounded-xl w-full px-5 md:shadow">
		<div className="text-2xl font-semibold">Order Status</div>
		<div className="flex flex-col gap-10">
			<OrderStatusElement
				isFirst
				icon={faCashRegister}
				statusName="Order Placed"
				statusDate={getFormattedDate(statuses?.orderPlaced?.date)} />

			<OrderStatusElement
				isFirst={false}
				icon={faShoppingCart}
				statusName="Order Picked"
				statusDate={getFormattedDate(statuses?.orderPicked?.date)} />

			<OrderStatusElement
				isFirst={false}
				icon={faBox}
				statusName="Order Boxed"
				statusDate={getFormattedDate(statuses?.orderBoxed?.date)} />

			<OrderStatusElement
				isFirst={false}
				icon={faTruck}
				statusName="Shipped"
				statusDate={getFormattedDate(statuses?.orderShipped?.date)} />

			<OrderStatusElement
				isFirst={false}
				icon={faCheck}
				statusName="Delivered"
				statusDate={getFormattedDate(statuses?.orderDelivered?.date)} />
		</div>
	</div>
);

OrderDetailsDeliveryTracker.propTypes = {
	statuses: PropTypes.shape({
		orderBoxed: PropTypes.shape({
			date: PropTypes.string
		}),
		orderDelivered: PropTypes.shape({
			date: PropTypes.string
		}),
		orderPicked: PropTypes.shape({
			date: PropTypes.string
		}),
		orderPlaced: PropTypes.shape({
			date: PropTypes.string
		}),
		orderShipped: PropTypes.shape({
			date: PropTypes.string
		})
	})
};

export default OrderDetailsDeliveryTracker;
