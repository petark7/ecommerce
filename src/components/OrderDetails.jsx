import Button from './Button';

const OrderDetails = ({ status, items, total, id, buttonAction }) => (
	<div className="flex justify-between items-center pb-5 border-b">
		<div className="flex flex-col md:flex-row md:justify-around w-full md:items-center">
			<div className="flex items-center gap-3">
				<div className="text-lg uppercase font-bold">Order #1435</div>

			</div>
			<div className="text-lg uppercase">24/08/2023</div>
			<div className="flex gap-5 items-center lg:w-[200px] lg:justify-between">
				<div className=""><span className="text-xl font-semibold">24</span> items</div>
				<div className="text-red-400 font-semibold text-xl">$421</div>
			</div>
		</div>
		<div className="flex h-[80px] flex-col md:flex-row justify-around items-end md:items-center md:gap-5">
			<div className="border flex justify-center bg-blue-200 font-semibold rounded mt-2 px-2 md:px-3 md:py-1 max-w-[100px]">Shipped</div>

			<div className="flex justify-center bg-gray-200 p-2
      font-semibold rounded mt-2 hover:cursor-pointer w-[130px]"
			>
				More details
			</div>
		</div>
	</div>
);

export default OrderDetails;
