import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import ProductDetails from './pages/product-details';
import Login from './pages/login';
import NotFound from './pages/notfound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/product-details/:id',
		element: <ProductDetails />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '*',
		element: <NotFound />
	}
]);

export default router;
