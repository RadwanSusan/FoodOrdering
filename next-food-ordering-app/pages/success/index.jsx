import Lottie from 'react-lottie';
import Link from 'next/link';
import Head from 'next/head';

const Success = () => {
	const animationOptions = {
		loop: false,
		autoplay: true,
		animationData: require('../../public/lottie-files/success .json'),
	};

	return (
		<>
			<Head>
				<title>Lahamah & Fahmah</title>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link
					rel='manifest'
					href='/site.webmanifest'
				/>
				<link
					rel='mask-icon'
					href='/safari-pinned-tab.svg'
					color='#5bbad5'
				/>
				<meta
					name='apple-mobile-web-app-title'
					content='Lahmah &amp; Fahmah'
				/>
				<meta
					name='application-name'
					content='Lahmah &amp; Fahmah'
				/>
				<meta
					name='msapplication-TileColor'
					content='#b91d47'
				/>
				<meta
					name='theme-color'
					content='#ffffff'
				/>
			</Head>
			<Lottie
				options={animationOptions}
				height={400}
				width={400}
				isClickToPauseDisabled
				autoplay
				loop
			/>
			<center>
				<h1>Thank you, your order has been placed</h1>
				<Link href='/'>Go to Homepage</Link>
			</center>
		</>
	);
};

export default Success;
