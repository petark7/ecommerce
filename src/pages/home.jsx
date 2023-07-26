import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import Layout from '../components/Layout';

const Home = () => (
	<Layout>
		<Sidebar />
		<ProductList />
	</Layout>
);

export default Home;
