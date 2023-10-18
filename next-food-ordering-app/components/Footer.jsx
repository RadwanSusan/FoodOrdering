import styles from '../styles/Footer.module.css';
import useInstallPrompt from './useInstallPrompt';
import Image from 'next/image';

const Footer = () => {
	const { prompt } = useInstallPrompt();

	const handleInstallClick = () => {
		console.log(prompt);
		if (!prompt) return;
		prompt.prompt();
		prompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the install prompt');
			} else {
				console.log('User dismissed the install prompt');
			}
		});
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.item}>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7218.876265235248!2d55.433713!3d25.222164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f61c339739459%3A0xff265c01d149e7b2!2sLahmah%20%26%20Fahmah%20Butchery%20and%20grill!5e0!3m2!1sen!2sjo!4v1696597024165!5m2!1sen!2sjo'
						className={styles.map}
						allowFullScreen={false}
						loading='lazy'
						title='Restaurant Location'
						referrerPolicy='no-referrer-when-downgrade'
					/>
				</div>
				<div className={styles.item}>
					<div className={styles.card}>
						<h2 className={styles.motto}>
							<div className={styles.item}>
								<div className={styles.PWA}>
									<div
										className={styles.apple}
										onClick={handleInstallClick}
									>
										<Image
											src='/img/apple.svg'
											alt='app-store'
											width='40'
											height='40'
										/>
										<div>
											<h3>Download On</h3>
											<p>Apple Store</p>
										</div>
									</div>
									<div
										className={styles.android}
										onClick={handleInstallClick}
									>
										<Image
											src='/img/android.svg'
											alt='play-store'
											width='40'
											height='40'
										/>
										<div>
											<h3>Android App On</h3>
											<p>Google Play</p>
										</div>
									</div>
								</div>
							</div>
						</h2>
					</div>
					<div className={styles.card}>
						<h1 className={styles.title}>FIND OUR RESTAURANT</h1>
						<p className={styles.text}>
							Mirdif Mall, Dubai – U.A.E
							<br /> Tel. (04) 280 1585
							<br /> Mobile (054) 313 5151
							<br /> Email: tasty@bestmeat.ae
						</p>
					</div>
					<div className={styles.card}>
						<h1 className={styles.title}>WORKING HOURS</h1>
						<p className={styles.text}>
							Everyday from 8:00 AM - 02:00 AM
						</p>
					</div>
				</div>
			</div>
			<div className={styles.copyright}>
				<p>
					© 2023 Lahmah & Fahmah. All rights reserved. Powered by{' '}
					<a
						href='https://pme-ms.com/'
						style={{
							color: 'rgb(223, 67, 67)',
							fontWeight: 'bold',
						}}
					>
						PME
					</a>
				</p>
			</div>
		</>
	);
};

export default Footer;
