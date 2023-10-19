import Footer from './Footer';
import Navbar from './Navbar';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
	subsets: ['latin'],
	weight: '500',
});

const Layout = ({ admin, children }) => {
	console.log(admin);
	console.log(children);
	return (
		<div className={quicksand.className}>
			<Navbar admin={admin} />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
