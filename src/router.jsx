import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import ProductDetails from './pages/product-details';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/product-details/:id',
		element: <ProductDetails />
	}
]);

export default router;
