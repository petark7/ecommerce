import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../contexts/SidebarContext';

const Navbar = () => {
	const sidebarContext = useContext(SidebarContext);

	return (
		<div className="flex items-center justify-between p-3 w-full h-14 shadow-lg">
			<Link className="uppercase font-bold text-2xl text-red-400" to="/">Bluzify</Link>
			<div onClick={() => {
				sidebarContext.setIsOpen(previousValue => !previousValue);
			}}
			> <FontAwesomeIcon className="text-red text-2xl text-gray-600 cursor-pointer" icon={faShoppingCart} />
			</div>
		</div>
	);
};

export default Navbar;
