import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
	<>
		<Navbar />

		<div className="min-h-screen">
			{children}
		</div>
		<Footer />
	</>
);

export default Layout;
