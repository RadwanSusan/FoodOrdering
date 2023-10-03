import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ admin, children }) => {
	return (
		<>
			<Navbar admin={admin} />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
