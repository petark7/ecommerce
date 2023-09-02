import { faArrowRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSidebarOpen } from '../redux/slices/sidebarSlice';
import { clearCart, selectCart, selectCartTotal, selectNumberOfProducts } from '../redux/slices/cartSlice';
import CartItem from './CartItem';
import Button from './Button';

const Sidebar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartNumberOfProducts = useSelector(selectNumberOfProducts);
	const cartTotal = useSelector(selectCartTotal);
	const sidebarIsOpen = useSelector(state => state.sidebar.isOpen);
	const cart = useSelector(selectCart);

	return (
		<div className={`${sidebarIsOpen ? 'right-0' : '-right-full'} p-5 w-full fixed top-0 h-full
        bg-white z-20 md:w-[450px] md:min-w-[350px] xl:max-w-[26vw] transition-all duration-300 shadow-2xl`}
		>
			<div className="flex justify-between py-4 border-b">
				<div className="uppercase font-semibold">
					Shopping cart ({cartNumberOfProducts})
				</div>

				<div className="flex gap-2">
					<FontAwesomeIcon
						className="text-xl text-gray-500 cursor-pointer  hover:text-red-400"
						icon={faTrashCan}
						onClick={() => {
							dispatch(clearCart());
						}} />

					<FontAwesomeIcon
						className="text-xl text-gray-500 cursor-pointer  hover:text-red-400"
						icon={faArrowRight}
						onClick={() => {
							dispatch(setSidebarOpen(false));
						}} />
				</div>
			</div>

			{/* cart items */}
			<div className="max-h-[60vh] overflow-y-auto">
				{cart.map(product => <CartItem key={product.id} product={product} />)}
			</div>

			{/* cart total and place order */}
			<div className="flex gap-1 mt-5 justify-end select-none font-bold
				 text-gray-700 uppercase"
			>
				{cartNumberOfProducts === 0
					?						<div className="flex w-full font-semibold text-lg">No items added yet!</div>
					:					 (
						<div className="flex flex-col w-full">

							<div className="flex gap-2 justify-end text-xl">
								Total: <div className="text-red-400 font-bold">${cartTotal.toFixed(2)}</div>
							</div>

							<Button
								type="button"
								handleClick={() => {
									navigate('/checkout');
									dispatch(setSidebarOpen(false));
								}}
							>
								Checkout
							</Button>

						</div>
					)}
			</div>
		</div>
	);
};

export default Sidebar;
