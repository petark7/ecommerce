import { RouterProvider } from 'react-router-dom';
import ProductProvider from './contexts/ProductContext';
import CartProvider from './contexts/CartContext';
import router from './router';
import SidebarProvider from './contexts/SidebarContext';

const App = () => (
	<CartProvider>
		<ProductProvider>
			<SidebarProvider>
				<RouterProvider router={router} />
			</SidebarProvider>
		</ProductProvider>
	</CartProvider>
);

export default App;
