import { useRoutes, Link } from 'react-router-dom';
import router from './router';

const App = () => {
	const routeResult = useRoutes(router);

	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
				</ul>
			</nav>
			{routeResult}
		</div>
	);
};

export default App;
