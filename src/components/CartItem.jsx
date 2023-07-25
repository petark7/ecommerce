import { useContext, useEffect, useMemo, useState } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../contexts/CartContext';
import QuantityCounter from './QuantityCounter';

const CartItem = ({ product }) => {
	const { id, image, title, price, amount } = product;
	const totalPrice = (amount * price);
	const { addToCart, decrementProductAmount } = useContext(CartContext);

	const incrementProduct = () => {
		addToCart(product);
	};

	const decrementProduct = () => {
		decrementProductAmount(product);
	};

	return (
		<div className="flex items-center my-5 border-b pb-5 gap-3">
			{/* image */}
			<div>
				<img src={image} className="w-28" />
			</div>

			{/* controls */}
			<div className="w-full flex flex-col py-2 column">

				{/* title & close btn */}
				<div className="flex  justify-between mb-2">
					<div className="uppercase font-bold max-w-[220px]">{title}</div>
					<FontAwesomeIcon className="text-xl text-gray-600 cursor-pointer" icon={faClose} />
				</div>

				{/* counter (item quantity) */}
				<div className="flex gap-3">
					<QuantityCounter quantity={amount} incrementAction={incrementProduct} decrementAction={decrementProduct} />
					<div className="flex w-full justify-between items-center">
						<div className="select-none">
							${price}
						</div>
						<div className="select-none font-bold text-red-400 text-xl">
							${Number.parseFloat(totalPrice).toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
