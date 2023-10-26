import Footer from './Footer';
import Navbar from './Navbar';
import { Quicksand } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const quicksand = Quicksand({
	subsets: ['latin'],
	weight: '500',
});

const Layout = ({ admin, children }) => {
	const { locale } = useRouter();

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
	}, [locale]);

	return (
		<div className={quicksand.className}>
			<Navbar admin={admin} />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
