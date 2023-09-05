import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clearCart, selectCart, selectCartTotal } from '../redux/slices/cartSlice';
import { createOrderFirestore } from '../firebase/utils';
import { selectUser, selectUserData } from '../redux/slices/userSlice';
import CartItemsCheckout from '../components/CartItemsCheckout';
import PaymentOptions from '../components/PaymentOptions';
import DeliveryDetails from '../components/DeliveryDetails';
import Layout from '../components/Layout';
import Button from '../components/Button';
import ShowToast from '../utils/toast';
import { fetchOrders } from '../redux/slices/ordersSlice';

const Checkout = () => {
	const cartTotal = useSelector(selectCartTotal);
	const userDetails = useSelector(selectUserData);
	const cart = useSelector(selectCart);
	const user = useSelector(selectUser);
	const shippingCost = 10; // Hardcoded. TODO: calculate shipping depending on location
	const total = Number.parseFloat(cartTotal + shippingCost).toFixed(2);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = useState();
	const [formErrors, setFormErrors] = useState({
		paymentOptionError: false,
		deliveryDetailsError: false
	});

	const setFormError = (element, value) => {
		setFormErrors(previousValue => (
			{
				...previousValue,
				[element]: value
			}
		));
	};

	const isDataValid = formData => {
		let valid = true;

		if (formData.paymentOption) {
			setFormError('paymentOptionError', false);
		} else {
			setFormError('paymentOptionError', true);
			valid = false;
		}

		if (userDetails) {
			setFormError('deliveryDetailsError', false);
		} else {
			setFormError('deliveryDetailsError', true);
			valid = false;
		}

		return valid;
	};

	useEffect(() => {
		if (userDetails) {
			setFormError('deliveryDetailsError', false);
		}
	}, [userDetails]);

	const handleCompleteOrder = async () => {
		const formData = {
			cart,
			total: cartTotal + shippingCost,
			deliveryDetails: { ...userDetails },
			paymentOption: selectedOption // TODO: add stripe
		};

		if (isDataValid(formData)) {
			try {
				const order = await createOrderFirestore(user.uid, formData);
				if (order) {
					dispatch(clearCart());
					navigate('/');
				}
			} catch {
				ShowToast('There was a problem with the connection to the server. Try again', { success: false });
			}
		}
	};

	useEffect(() => {
		const formData = {
			cart,
			total: cartTotal + shippingCost,
			deliveryDetails: { ...userDetails },
			paymentOption: selectedOption // TODO: add stripe
		};

		if (formErrors.deliveryDetailsError === true || formErrors.paymentOptionError === true) {
			isDataValid(formData);
		}
	}, [formErrors]);

	// Renders when cart is empty:
	const emptyCart = (
		<div className="p-10 flex flex-col gap-2 justify-center items-center h-[91vh]">
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

	// Renders when there are items in cart
	const notEmptyCart = (
		<div>
			<div className="font-semibold text-2xl text-center mb-5">Order Details</div>
			<div
				className="flex items-center gap-2 justify-end hover:text-red-400
				hover:cursor-pointer mb-2 font-semibold"
				onClick={() => {
					dispatch(clearCart());
				}}
			>
				Clear cart <FontAwesomeIcon icon={faTrashCan} />
			</div>
			<div className="border rounded">
				<CartItemsCheckout />
			</div>
			<PaymentOptions setSelectedOption={setSelectedOption} formErrors={formErrors} />
			<DeliveryDetails formErrors={formErrors} />

			{/* total and complete order button */}
			<div className="flex flex-col justify-center gap-1 border rounded mt-3 p-2 ">
				<div className="flex gap-2 justify-end text-xl">
					Shipping: <div className="text-red-400 font-bold">${shippingCost}</div>
				</div>
				<div className="flex gap-2 justify-end text-xl">
					Total: <div className="text-red-400 font-bold">${total}</div>
				</div>
			</div>
			<Button
				type="button"
				handleClick={() => {
					handleCompleteOrder();
				}}
			>
				Complete Order
			</Button>

		</div>
	);
	return (
		<Layout>
			<section className="flex justify-center md:items-center py-10 px-5 md:py-10">
				{cartTotal > 0 ? notEmptyCart : emptyCart}
			</section>
		</Layout>
	);
};

export default Checkout;
