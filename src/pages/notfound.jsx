import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import notFoundImage from '../assets/notfound.svg';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Layout>
			<section className="flex flex-col md:flex-row md:items-center
      gap-4 justify-center p-10 h-screen"
			>
				<div className="flex flex-col md:flex-row md:items-center md:w-[1000px]">
					<img className="md:max-w-[400px]" src={notFoundImage} />
					<div className="flex flex-col gap-4">

						<div className="text-4xl">
							Page not found :(
						</div>

						<div className="text-xl">
							You either wandered to a place that doesn&apos;t exist or don&apos;t have permissions to visit. Sorry!
						</div>

						<button
							type="button"
							className="md:max-w[100px] mt-5 md:w-[250px] border bg-red-500 text-xl
            text-white py-4 font-semibold rounded-md"
							onClick={() => navigate(-1)}
						>
							Go back
						</button>

					</div>
				</div>
			</section>
		</Layout>
	);
};

export default NotFound;
