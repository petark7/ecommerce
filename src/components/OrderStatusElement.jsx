import PropTypes from 'prop-types';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCashRegister, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrderStatusElement = ({ isFirst = true, icon = faCashRegister, statusName = 'Order Placed', statusDate }) => (

	<div className="flex justify-between items-center">
		<div className="flex gap-5">
			{/* icon */}
			<div className="relative flex items-center">
				{!isFirst && <div className={`absolute top-[-20px] left-[26px] transform -translate-y-1/2 border-dashed border-2 h-10 w-0 ${statusDate ? 'border-green-600' : 'border-gray-500'}`} />}
				<div className="rounded-full border flex justify-center items-center w-14 h-14 shadow">
					<FontAwesomeIcon icon={icon} size="xl" color="#E57373" />
				</div>
			</div>

			{/* status and date */}
			<div className="flex flex-col justify-center">
				<div className="font-semibold">{statusName}</div>
				{statusDate && <div>{statusDate}</div>}
			</div>
		</div>

		{/* status icon */}
		<div className="flex justify-center items-center">
			{statusDate ? <FontAwesomeIcon icon={faCircleCheck} size="xl" color="green" /> : <FontAwesomeIcon icon={faClock} size="xl" color="gray" />}
		</div>
	</div>
);

OrderStatusElement.propTypes = {
	icon: PropTypes.any,
	isFirst: PropTypes.bool,
	statusDate: PropTypes.string,
	statusName: PropTypes.string
};

export default OrderStatusElement;
