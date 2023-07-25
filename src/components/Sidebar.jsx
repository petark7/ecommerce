import { faArrowRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { cart } = useContext(CartContext);

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
						Shopping bag (0)
					</div>

					<FontAwesomeIcon
						className="text-xl text-gray-500 cursor-pointer" icon={faArrowRight} onClick={() => {
							setIsOpen(false);
						}} />
				</div>

				{cart.map(product => <CartItem />)}
			</div>

		</>
	);
};

export default Sidebar;
