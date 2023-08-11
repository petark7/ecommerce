import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import QuantityCounter from '../components/QuantityCounter';
import CartItemsCheckout from '../components/CartItemsCheckout';
import PaymentOptions from '../components/PaymentOptions';
import DeliveryDetails from '../components/DeliveryDetails';

const Checkout = () => (
	<Layout>
		<section className="container mx-auto flex items-center justify-center min-h-screen mb-10">
			<div>
				<div className="font-semibold text-2xl text-center mb-10">Order Details</div>
				<div className="border">
					<CartItemsCheckout />
				</div>
				<PaymentOptions />
				<DeliveryDetails />
				<div className="flex gap-2 justify-end text-xl mt-2">
					Shipping: <div className="text-red-400 font-bold">$10</div>
				</div>
				<div className="flex gap-2 justify-end text-xl mt-2">
					Total: <div className="text-red-400 font-bold">$169</div>
				</div>
				<button
					type="button"
					className="w-full border p-5 px-8 mt-10 bg-gray-700 font-bold text-white"
					onClick={() => {}}
				>
					Complete Order
				</button>
			</div>
		</section>
	</Layout>
);

export default Checkout;
