import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';

const Home = () => (
	<>
		<Sidebar />
		<ProductList />
	</>
);

export default Home;
