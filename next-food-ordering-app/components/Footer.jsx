import styles from '../styles/Footer.module.css';
import useInstallPrompt from './useInstallPrompt';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

const Footer = () => {
	const { prompt } = useInstallPrompt();
	const { t, lang } = useTranslation('common');
	const [showInstallPopup, setShowInstallPopup] = useState(false);

	const handleAppleStoreBoxClick = () => {
		const isAppleDevice =
			/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

		if (isAppleDevice) {
			setShowInstallPopup(true);
		}
	};

	const closeInstallPopup = () => {
		setShowInstallPopup(false);
	};

	const handleInstallClick = () => {
		if (!prompt) return;
		prompt.prompt();
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
										onClick={handleAppleStoreBoxClick}>
										<Image
											src='/img/apple.svg'
											alt='app-store'
											width='40'
											height='40'
										/>
										<div>
											<h3>{t('DownloadOn')}</h3>
											<p>{t('AppleStore')}</p>
										</div>
									</div>
									<div
										className={styles.android}
										onClick={handleInstallClick}>
										<Image
											src='/img/android.svg'
											alt='play-store'
											width='40'
											height='40'
										/>
										<div>
											<h3>{t('AndroidAppOn')}</h3>
											<p>{t('PlayStore')}</p>
										</div>
									</div>
								</div>
							</div>
						</h2>
					</div>
					<div className={styles.card}>
						<h1 className={styles.title}>{t('FindOurRestaurant')}</h1>
						<p className={styles.text}>
							{t('Address')}
							<br />
							{t('phoneNumberNumberP')}
							<p
								style={{
									direction: 'ltr',
									margin: '0',
									display: 'inline-block',
								}}>
								{t('phoneNumberNumber')}
							</p>
							<br />
							{t('phoneNumberNumberP2')}
							<p
								style={{
									direction: 'ltr',
									margin: '0',
									display: 'inline-block',
								}}>
								{t('phoneNumberNumber2')}
							</p>
							<br /> {t('Email')}
							<p style={{ display: 'inline' }}>{t('EmailAddress')}</p>
						</p>
					</div>
					<div className={styles.card}>
						<h1 className={styles.title}>{t('WorkingHours')}</h1>
						<p className={styles.text}>{t('WorkTime')}</p>
					</div>
				</div>
			</div>
			<div className={styles.copyright}>
				<p>
					{t('Copyright')}
					<a
						href='https://pme-ms.com/'
						style={{
							color: 'rgb(223, 67, 67)',
							fontWeight: 'bold',
						}}>
						{t('PME')}
					</a>
				</p>
			</div>
			{showInstallPopup && (
				<>
					<div
						className={`${styles.overlay}`}
						onClick={closeInstallPopup}></div>
					<div
						className={` ${styles.installPopup} ${
							showInstallPopup ? styles.show : ''
						}`}>
						<p>
							{lang === 'en'
								? 'To install the app on your iPhone:'
								: 'لتثبيت التطبيق على جهازك الأيفون:'}
						</p>
						<ol
							style={
								lang === 'en'
									? { textAlign: 'left' }
									: { textAlign: 'right' }
							}>
							<li>
								{lang === 'en'
									? "Tap the 'Share' button in Safari's toolbar."
									: 'اضغط على زر "مشاركة" في شريط أدوات Safari.'}
							</li>
							<li>
								{lang === 'en'
									? "Scroll down and tap 'Add to Home Screen'."
									: "قم بالتمرير لأسفل وانقر فوق 'إضافة إلى الشاشة الرئيسية'."}
							</li>
							<li>
								{lang === 'en'
									? "Edit the name if you like and tap 'Add'."
									: "قم بتحرير الاسم إذا أردت ثم اضغط على 'إضافة'."}
							</li>
						</ol>
						<button onClick={closeInstallPopup}>
							{lang === 'en' ? 'Close' : 'اغلاق'}
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default Footer;
