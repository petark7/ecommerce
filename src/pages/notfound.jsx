import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Layout>
			<section className="flex flex-col gap-4 justify-center p-10 h-screen">
				<div className="text-4xl">
					Page not found :(
				</div>
				<div className="text-xl">
					You either wandered to a place that doesn&apos;t exist or don&apos;t have permissions to visit. Sorry!
				</div>
				<button
					type="button"
					className="mt-10 w-full border bg-red-500 text-xl
            text-white py-4 font-semibold"
					onClick={() => navigate(-1)}
				>
					Go back
				</button>
			</section>
		</Layout>
	);
};

export default NotFound;
