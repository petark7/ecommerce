import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';

const Navbar = () => {
	const sidebarContext = useContext(SidebarContext);
	const { numberOfProducts } = useContext(CartContext);

	return (
		<div className="flex h-14 shadow-md select-none">
			<div className="container mx-auto flex justify-between items-center">
				{/* LOGO */}
				<Link className="uppercase font-bold text-2xl text-red-400" to="/">Bluzify</Link>

				{/* OPEN CART */}
				<div
					className="relative m-2 cursor-pointer" onClick={() => {
						sidebarContext.setIsOpen(previousValue => !previousValue);
					}}
				>
					{/* CART ICON */}
					<FontAwesomeIcon className="text-red text-2xl text-gray-600 cursor-pointer" icon={faShoppingCart} />
					<div className="flex justify-center items-center absolute -right-3 -bottom-2
        bg-red-400 rounded-full text-white w-[20px] h-[20px] text-xs"
					>
						<div>{numberOfProducts}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;