import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { statuses } from '../constants/statuses';

const OrderHistoryElement = ({ id, status, items, total, dateOrdered, buttonAction }) => {
	const dateFormatted = format(new Date(dateOrdered), 'M/d/yyyy HH:mm');
	const [statusColor, setStatusColor] = useState();
	const shortID = id.slice(0, 5);

	useEffect(() => {
		switch (status) {
			case statuses.PROCESSING: {
				setStatusColor('bg-blue-200');
				break;
			}

			case statuses.SHIPPED: {
				setStatusColor('bg-green-200');
				break;
			}

			case statuses.CANCELLED: {
				setStatusColor('bg-red-200');
				break;
			}

			default: {
				setStatusColor('bg-blue-200');
			}
		}
	}, [status]);

	return (
		<div className="flex mt-5 md:mt-0">
			<div className="flex flex-col lg:flex-row lg:justify-around w-full lg:items-center">
				{/* order, orderid */}
				<div className="flex items-center gap-2 flex-row md:flex-row">
					<div className="text-lg uppercase font-bold">Order</div>
					<div className="text-lg font-semibold uppercase text-gray-400">#{shortID}</div>
				</div>

				{/* Order date */}
				<div className="text-lg">{dateFormatted}</div>

				{/* Number of items, price */}
				<div className="flex gap-5 items-center lg:w-[200px] lg:justify-between">
					<div className=""><span className="text-xl font-semibold">{items.length}</span> items</div>
					<div className="text-red-400 font-semibold text-xl">${Number.parseFloat(total).toFixed(2)}</div>
				</div>
			</div>

			{/* status (ordered, shipped..), more details button */}
			<div className="flex h-[80px] flex-col md:flex-row justify-around items-end md:items-center md:gap-5">
				<div className={`border flex justify-center ${statusColor} font-semibold
				rounded py-2 mt-2 w-[100%] md:w-[100px] capitalize`}
				>
					{status}
				</div>

				<div
					className="flex justify-center bg-gray-200 p-2
				font-semibold rounded mt-2 hover:cursor-pointer w-[130px]" onClick={()=>buttonAction(id)}
				>
					More details
				</div>
			</div>
		</div>
	);
};

OrderHistoryElement.propTypes = {
	buttonAction: PropTypes.any,
	dateOrdered: PropTypes.any,
	id: PropTypes.string,
	items: PropTypes.array,
	status: PropTypes.string,
	total: PropTypes.number
};

export default OrderHistoryElement;
