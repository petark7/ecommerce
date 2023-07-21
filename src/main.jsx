import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import router from './router';
import './index.css';
import ProductProvider from './contexts/ProductContext';

ReactDOM.createRoot(document.querySelector('#root')).render(
	<React.StrictMode>
		<ProductProvider>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</ProductProvider>
	</React.StrictMode>
);
