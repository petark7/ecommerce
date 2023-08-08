import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
	const [animate, setAnimate] = useState(false);
	const sidebarContext = useContext(SidebarContext);
	const { numberOfProducts } = useContext(CartContext);
	const { user, logUserOut } = useContext(UserContext);

	useEffect(() => {
		if (numberOfProducts > 0) {
			setAnimate(true);
			setTimeout(() => setAnimate(false), 100); // Reset animation after 1 second
		}
	}, [numberOfProducts]);

	return (
		<div className="flex h-14 shadow-md select-none">
			<div className="container mx-auto flex justify-between items-center">
				{/* LOGO */}
				<Link className="uppercase font-bold text-2xl text-red-400" to="/">Bluzify</Link>

				<div className="flex w-[250px] gap-2 justify-end items-center">
					{/* logged in -> show icon */}
					{user
						? 						(
							<div className="dropdown dropdown-end">
								<label tabIndex="0" className="m-1">
									<FontAwesomeIcon
										className="text-3xl text-gray-600 cursor-pointer"
										icon={faUserCircle}
									/>
								</label>
								<ul
									tabIndex="0"
									className="dropdown-content z-[1] menu p-2 shadow bg-base-100
									rounded-box w-52"
								>
									<li><a>Account settings</a></li>
									<li>
										<a onClick={() => {
											logUserOut();
										}}
										>
											Logout
										</a>
									</li>
								</ul>
							</div>
						)
					// Not logged in -> show login/register buttons
						: (
							<div className="flex font-light justify-center items-center">
								<div className="flex gap-1">
									<Link
										className="font-semibold hover:text-red-500 cursor-pointer"
										to="/login"
									>
										Login
									</Link>
									or
									<Link
										className="font-semibold hover:text-red-500 cursor-pointer"
										to="/register"
									>
										create account
									</Link>
								</div>
							</div>
						)}

					{/* OPEN CART */}
					<div
						className="relative m-2 cursor-pointer" onClick={() => {
							sidebarContext.setIsOpen(previousValue => !previousValue);
						}}
					>
						{/* CART ICON */}
						<FontAwesomeIcon
							className="text-2xl text-gray-600 cursor-pointer"
							icon={faShoppingCart}
						/>

						{/* number of products indicator */}
						<div className={`flex justify-center items-center absolute -right-3 -bottom-2
        bg-red-400 rounded-full text-white w-[20px] h-[20px] text-xs transition-all duration-200 ${animate ? 'scale-[1.75]' : ''}`}
						>
							<div>
								{numberOfProducts}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
