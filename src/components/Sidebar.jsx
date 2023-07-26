import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { SidebarContext } from '../contexts/SidebarContext';
import CartItem from './CartItem';

const Sidebar = () => {
	const { isOpen, setIsOpen } = useContext(SidebarContext);
	const { cart, cartTotal, numberOfProducts } = useContext(CartContext);

	return (
		<div className={`${isOpen ? 'right-0' : '-right-full'} p-5 w-full fixed top-0 h-full
        bg-white z-20 md:w-[450px] md:min-w-[350px] xl:max-w-[26vw] transition-all duration-300 shadow-2xl`}
		>
			<div className="flex justify-between py-4 border-b">
				<div className="uppercase font-semibold">
					Shopping cart ({numberOfProducts})
				</div>

				<FontAwesomeIcon
					className="text-xl text-gray-500 cursor-pointer  hover:text-red-400" icon={faArrowRight} onClick={() => {
						setIsOpen(false);
					}} />
			</div>

			{/* cart items */}
			<div className="max-h-[60vh] overflow-y-auto">
				{cart.map(product => <CartItem key={product.id} product={product} />)}
			</div>

			{/* cart total and place order */}
			<div className="flex gap-1 mt-5 justify-end select-none font-bold
				 text-gray-700 uppercase"
			>
				{cartTotal == 0
					?						<div className="flex w-full font-semibold text-lg">No items added yet!</div>
					:					 (
						<div className="flex flex-col w-full">

							<div className="flex gap-2 justify-end text-xl">
								Total: <div className="text-red-400 font-bold">${cartTotal}</div>
							</div>

							<button
								type="button"
								className="w-full border p-5 px-8 mt-10 bg-gray-700 font-bold text-white"
							>
								Checkout
							</button>

						</div>
					)}
			</div>
		</div>
	);
};

export default Sidebar;
