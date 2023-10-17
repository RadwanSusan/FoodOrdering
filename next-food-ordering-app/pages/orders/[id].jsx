import styles from '../../styles/Order.module.css';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';

const Order = ({ order }) => {
	const status = order.status;

	const statusClass = (index) => {
		if (index - status < 1) return styles.done;
		if (index - status === 1) return styles.inProgress;
		if (index - status > 1) return styles.undone;
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
			<div className={styles.container}>
				<div className={styles.left}>
					<div className={styles.row}>
						<table className={styles.table}>
							<thead className={styles.thead}>
								<tr className={styles.trTitle}>
									<th>Order ID</th>
									<th>Customer</th>
									<th>Address</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody className={styles.tbody}>
								<tr className={styles.tr}>
									<td>
										<span className={styles.id}>{order._id}</span>
									</td>
									<td>
										<span className={styles.name}>
											{order.customer}
										</span>
									</td>
									<td>
										<span className={styles.address}>
											{order.address}
										</span>
									</td>
									<td>
										<span className={styles.total}>
											${order.total}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className={styles.row}>
						<div className={statusClass(0)}>
							<Image
								src='/img/paid.png'
								width={30}
								height={30}
								alt='Payment'
							/>
							<span>Payment</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.png'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(1)}>
							<Image
								src='/img/bake.png'
								width={30}
								height={30}
								alt='Preparing'
							/>
							<span>Preparing</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.png'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(2)}>
							<Image
								src='/img/bike.png'
								width={30}
								height={30}
								alt='On the way'
							/>
							<span>On the way</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.png'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(3)}>
							<Image
								src='/img/delivered.png'
								width={30}
								height={30}
								alt='Delivered'
							/>
							<span>Delivered</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.png'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.wrapper}>
						<h2 className={styles.title}>CART TOTAL</h2>
						<div className={styles.totalText}>
							<b className={styles.totalTextTitle}>Total:</b>$
							{order.total}
						</div>
						<button
							disabled
							className={styles.button}
						>
							PAID
						</button>
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(
		`http://31.170.165.239:765/api/orders/${params.id}`,
	);
	return {
		props: { order: res.data },
	};
};

export default Order;
