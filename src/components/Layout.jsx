import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    <div className="min-h-screen">{children}</div>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
