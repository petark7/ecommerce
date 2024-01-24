import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProductDetails from './pages/product-details';
import Login from './pages/login';
import NotFound from './pages/notfound';
import Checkout from './pages/checkout';
import Account from './pages/account';
import OrderDetails from './pages/order-details';

const Router = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/product-details/:id" element={<ProductDetails />} />
		<Route path="/order-details/:id" element={<OrderDetails />} />
		<Route path="/checkout" element={<Checkout />} />
		<Route path="/login" element={<Login />} />
		<Route
			path="/account/:page" element={<Account />} />
		<Route path="*" element={<NotFound />} />
	</Routes>
);

export default Router;
