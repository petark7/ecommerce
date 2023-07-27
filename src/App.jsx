import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProductProvider from './contexts/ProductContext';
import CartProvider from './contexts/CartContext';
import router from './router';
import SidebarProvider from './contexts/SidebarContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
	<CartProvider>
		<ProductProvider>
			<SidebarProvider>
				<ToastContainer />
				<RouterProvider router={router} />
			</SidebarProvider>
		</ProductProvider>
	</CartProvider>
);

export default App;
