import PropTypes from 'prop-types';

const OrderDetailsSummary = ({ total = 0, shipping = 0 }) => {
	console.log(total, shipping);

	return (
		<div className="flex justify-end md:flex-wrap-reverse gap-10">
			{/* <div className="w-full md:w-fit text-center md:text-left">
					<div className="font-semibold pb-2">Have questions?</div>
					<div>Feel free to contact us at support@bluzify.com</div>
				</div> */}

			<div className="w-full md:w-[250px] flex flex-col justify-between gap-3 md:pr-[10px] pr-3">
				<div className="flex justify-end md:justify-between gap-10">
					<div>Total</div>
					<div className="w-[60px] font-semibold">${total}</div>
				</div>

				<div className="flex justify-end md:justify-between gap-10">
					<div>Shipping</div>
					<div className="w-[60px] font-semibold">${shipping}</div>
				</div>
				<div className="w-full h-[1px] bg-gray-100" />
				<div className="flex justify-end md:justify-between gap-10">
					<div>Order Total</div>
					<div className="w-[60px] font-semibold">${(total + shipping).toFixed(2)}</div>
				</div>
			</div>
		</div>
	);
};

OrderDetailsSummary.propTypes = {
	shipping: PropTypes.number,
	total: PropTypes.number
};

export default OrderDetailsSummary;
