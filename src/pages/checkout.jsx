import { faClose } from '@fortawesome/free-solid-svg-icons';
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

	return (
		<Layout>
			<section className="container mx-auto flex items-center justify-center min-h-screen m-10">
				<div>
					<div className="font-semibold text-2xl text-center mb-10">Order Details</div>
					<div className="border">
						<CartItemsCheckout />
					</div>
					<PaymentOptions />
					<DeliveryDetails />
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
			</section>
		</Layout>
	);
};

export default Checkout;
