import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';

const Home = () => {
	const productContext = useContext(ProductContext);
	return (
		<div className="py-16">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2
				lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto
				md:max-w-none"
				>
					{productContext.map(
						product => (
							<Product key={product.id} product={product} />
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
