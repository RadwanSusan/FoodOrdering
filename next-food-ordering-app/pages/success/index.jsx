import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const Success = () => {
	const animationOptions = {
		loop: false,
		autoplay: true,
		animationData: require('../../public/lottie-files/success .json'),
	};

	return (
		<>
			<Head>
				<title>{t('Lahmah&FahmahSuccess')}</title>
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
