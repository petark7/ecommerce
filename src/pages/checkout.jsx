import { faClose, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CartItemsCheckout from '../components/CartItemsCheckout';
import PaymentOptions from '../components/PaymentOptions';
import DeliveryDetails from '../components/DeliveryDetails';
import { clearCart, selectCart, selectCartTotal } from '../redux/slices/CartSlice';
import { createOrderFirestore } from '../firebase/utils';
import { selectUser } from '../redux/slices/UserSlice';

const Checkout = () => {
	const cartTotal = useSelector(selectCartTotal);
	const cart = useSelector(selectCart);
	const user = useSelector(selectUser);
	const shippingCost = 10; // Hardcoded. TODO: calculate shipping depending on location
	const total = Number.parseFloat(cartTotal + shippingCost).toFixed(2);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = useState();

	// TODO HARDCODED DELIVERY DETAILS
	const handleCompleteOrder = async () => {
		const formData = {
			cart,
			total: cartTotal + shippingCost,
			deliveryDetails: {
				name: 'Petar Kuzmanovski',
				address: '22 high street',
				phone: '074123456',
				email: 'petark@gmail.com'
			},
			paymentOption: 'direct' // TODO: add stripe
		};

		try {
			const order = await createOrderFirestore(user.uid, formData);
			if (order) {
				dispatch(clearCart());
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const emptyCart = (
		<div className="border p-10 flex flex-col gap-2 justify-center">
			<div className="text-2xl">Your shopping cart is empty.</div>
			<div className="text-lg">Add some products and they&apos;ll appear here.</div>

			<button
				type="button"
				className="w-full border p-5 px-8 mt-10 bg-gray-700 font-bold text-white"
				onClick={() => {
					navigate(-1);
				}}
			>
				Go back
			</button>
		</div>
	);

	const notEmptyCart = (
		<div>
			<div className="font-semibold text-2xl text-center mb-10">Order Details</div>
			<div
				className="text-lg flex items-center gap-2 justify-end hover:text-red-400
				hover:cursor-pointer mb-2 font-semibold"
				onClick={() => {
					dispatch(clearCart());
				}}
			>
				Clear cart <FontAwesomeIcon icon={faTrashCan} />
			</div>
			<div className="border">
				<CartItemsCheckout />
			</div>
			<PaymentOptions setSelectedOption={setSelectedOption} />
			<DeliveryDetails />

			{/* total and complete order button */}
			<div className="flex flex-col justify-center gap-1 border mt-3 p-2">
				<div className="flex gap-2 justify-end text-xl">
					Shipping: <div className="text-red-400 font-bold">${shippingCost}</div>
				</div>
				<div className="flex gap-2 justify-end text-xl">
					Total: <div className="text-red-400 font-bold">${total}</div>
				</div>
			</div>
			<button
				type="button"
				className="w-full border p-5 px-8 mt-10 bg-gray-700 font-bold text-white"
				onClick={() => {
					handleCompleteOrder();
				}}
			>
				Complete Order
			</button>

		</div>
	);
	return (
		<Layout>
			<section className="flex justify-center min-h-screen md:m-0 my-10 mx-5 md:mt-10 md:mb-10">
				{cartTotal > 0 ? notEmptyCart : emptyCart}
			</section>
		</Layout>
	);
};

export default Checkout;
