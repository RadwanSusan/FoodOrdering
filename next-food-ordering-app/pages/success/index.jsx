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
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1'
				/>
				<title>Lahmah & Fahmah</title>
				<meta
					name='description'
					content='Best PWA app in the world!'
				/>
				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>
				<link
					rel='mask-icon'
					href='/icons/mask-icon.svg'
					color='#FFFFFF'
				/>
				<meta
					name='theme-color'
					content='#ffffff'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/touch-icon-iphone.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='152x152'
					href='/icons/touch-icon-ipad.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/icons/touch-icon-iphone-retina.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='167x167'
					href='/icons/touch-icon-ipad-retina.png'
				/>
				<link
					rel='manifest'
					href='/manifest.json'
				/>
				<meta
					name='twitter:card'
					content='summary'
				/>
				<meta
					name='twitter:url'
					content='https://yourdomain.com'
				/>
				<meta
					name='twitter:title'
					content='My awesome PWA app'
				/>
				<meta
					name='twitter:description'
					content='Best PWA app in the world!'
				/>
				<meta
					name='twitter:image'
					content='/icons/twitter.png'
				/>
				<meta
					name='twitter:creator'
					content='@DavidWShadow'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:title'
					content='My awesome PWA app'
				/>
				<meta
					property='og:description'
					content='Best PWA app in the world!'
				/>
				<meta
					property='og:site_name'
					content='My awesome PWA app'
				/>
				<meta
					property='og:url'
					content='https://yourdomain.com'
				/>
				<meta
					property='og:image'
					content='/icons/og.png'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_2048.png'
					sizes='2048x2732'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1668.png'
					sizes='1668x2224'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1536.png'
					sizes='1536x2048'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1125.png'
					sizes='1125x2436'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1242.png'
					sizes='1242x2208'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_750.png'
					sizes='750x1334'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_640.png'
					sizes='640x1136'
				/>
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
