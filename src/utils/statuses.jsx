import { statuses } from '../constants/statuses';

export const getOrderStatus = order => {
	let latestStatus = null;
	let latestDate = null;

	for (const status in order.statuses) {
		if (Object.prototype.hasOwnProperty.call(order.statuses, status)) {
			const date = order.statuses[status].date;
			if (date) {
				const dateObject = new Date(date);
				if (!latestDate || dateObject > latestDate) {
					latestDate = dateObject;
					latestStatus = status;
				}
			}
		}
	}

	switch (latestStatus) {
		case 'orderPlaced': {
			return statuses.ORDER_PLACED;
		}

		case 'orderPicked': {
			return statuses.ORDER_PICKED;
		}

		case 'orderBoxed': {
			return statuses.ORDER_BOXED;
		}

		case 'orderShipped': {
			return statuses.ORDER_SHIPPED;
		}

		case 'orderDelivered': {
			return statuses.ORDER_DELIVERED;
		}

		default: {
			return 'ERROR';
		}
	}
};
