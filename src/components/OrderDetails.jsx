import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Button from './Button';

const OrderDetails = ({ id, status, items, total, dateOrdered, buttonAction }) => {
	const dateFormatted = format(new Date(dateOrdered), 'M/d/yyyy HH:mm');
	const shortID = id.slice(0, 5);
	return (
		<div className="flex justify-between items-center py-5 border-b">
			<div className="flex flex-col lg:flex-row lg:justify-around w-full lg:items-center">

				<div className="flex items-center gap-2 flex-row md:flex-row">
					<div className="text-lg uppercase font-bold">Order</div>
					<div className="text-lg font-semibold uppercase text-gray-400">#{shortID}</div>
				</div>

				<div className="text-lg uppercase">{dateFormatted}</div>

				<div className="flex gap-5 items-center lg:w-[200px] lg:justify-between">
					<div className=""><span className="text-xl font-semibold">{items.length}</span> items</div>
					<div className="text-red-400 font-semibold text-xl">${Number.parseFloat(total).toFixed(2)}</div>
				</div>
			</div>

			<div className="flex h-[80px] flex-col md:flex-row justify-around items-end md:items-center md:gap-5">
				<div className="border flex justify-center bg-blue-200 font-semibold
				rounded mt-2 px-2 md:px-3 md:py-1 max-w-[100px]"
				>
					{status}
				</div>

				<div
					className="flex justify-center bg-gray-200 p-2
				font-semibold rounded mt-2 hover:cursor-pointer w-[130px]" onClick={buttonAction}
				>
					More details
				</div>
			</div>
		</div>
	);
};

OrderDetails.propTypes = {
	buttonAction: PropTypes.any,
	dateOrdered: PropTypes.any,
	id: PropTypes.string,
	items: PropTypes.array,
	status: PropTypes.string,
	total: PropTypes.number
};

export default OrderDetails;
