import { faArrowRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { cart, cartTotal, numberOfProducts } = useContext(CartContext);

	return (
		<>
			<div onClick={() => {
				setIsOpen(previousValue => !previousValue);
			}}
			> <FontAwesomeIcon className="text-red text-2xl text-red-400 cursor-pointer" icon={faShoppingCart} />
			</div>

			<div className={`${isOpen ? 'right-0' : '-right-full'} p-5 w-full fixed top-0 h-full
        bg-white z-20 md:w-[450px] md:min-w-[350px] xl:max-w-[25vw] transition-all duration-300 shadow-2xl`}
			>
				<div className="flex justify-between py-4 border-b">
					<div className="uppercase font-semibold">
						Shopping bag ({numberOfProducts})
					</div>

					<FontAwesomeIcon
						className="text-xl text-gray-500 cursor-pointer  hover:text-red-400" icon={faArrowRight} onClick={() => {
							setIsOpen(false);
						}} />
				</div>

				{/* cart items */}
				{cart.map(product => <CartItem key={product.id} product={product} />)}

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
									className="w-full border p-5 px-8 mt-10 bg-red-200 uppercase
									font-bold text-gray-700"
								>
									Place order
								</button>

							</div>
						)}
				</div>
			</div>

		</>
	);
};

export default Sidebar;
