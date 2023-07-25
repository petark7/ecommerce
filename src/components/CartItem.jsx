import { useMemo, useState } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuantityCounter from './QuantityCounter';

const CartItem = () => {
	const [itemQuantity, setItemQuantity] = useState(1);
	const itemPrice = 45;
	const totalPrice = useMemo(() => itemQuantity * itemPrice, [itemQuantity]);

	return (
		<div className="flex items-center my-5 border-b pb-5 gap-3">
			{/* image */}
			<div>
				<img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" className="w-28" />
			</div>

			{/* controls */}
			<div className="w-full flex flex-col py-2 column">

				{/* title & close btn */}
				<div className="flex items-center justify-between mb-2">
					<div className="uppercase font-bold max-w-[220px]">Very nice handbag here</div>
					<FontAwesomeIcon className="text-xl text-gray-600 cursor-pointer" icon={faClose} />
				</div>

				{/* counter (item quantity) */}
				<div className="flex gap-3">
					<QuantityCounter quantity={itemQuantity} setQuantity={setItemQuantity} />
					<div className="flex w-full justify-between items-center">
						<div>
							$ {itemPrice}
						</div>
						<div>
							$ {totalPrice}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
