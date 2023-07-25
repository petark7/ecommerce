import { faArrowRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const cartContext = useContext(CartContext);

	console.log(cartContext);
	return (
		<>
			<div onClick={() => {
				setIsOpen(previousValue => !previousValue);
			}}
			> <FontAwesomeIcon className="text-red text-2xl text-red-400 cursor-pointer" icon={faShoppingCart} />
			</div>

			<div className={`${isOpen ? 'right-0' : '-right-full'} p-5 w-full fixed top-0 right-0 h-full
        bg-white z-20 md:w-[35vw] xl:max-w-[20vw] transition-all duration-300 shadow-2xl`}
			>
				<div className="flex justify-between py-4 border-b">
					<div className="uppercase font-semibold">
						Shopping bag (0)
					</div>

					<FontAwesomeIcon
						className="text-xl cursor-pointer" icon={faArrowRight} onClick={() => {
							setIsOpen(false);
						}} />
				</div>

				<CartItem />
			</div>

		</>
	);
};

export default Sidebar;
