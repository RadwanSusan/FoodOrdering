import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, selectOrders } from '../../redux/ordersSlice';
import { formatDistanceToNow } from 'date-fns';
import styles from '../../styles/OrderList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

const tagColors = [
	'tagTeal',
	'tagPurple',
	'tagRed',
	'tagOrange',
	'tagBlue',
	'tagGreen',
	'tagPink',
	'tagYellow',
];

const Orders = () => {
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);

	useEffect(() => {
		fetch(
			`http://31.170.165.239:765/api/orders?deviceId=${localStorage.getItem(
				'deviceId',
			)}`,
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => dispatch(setOrders(data)))
			.catch((error) => {
				console.error(
					'There has been a problem with your fetch operation:',
					error,
				);
			});
	}, [dispatch]);

	const getRandomColorClass = () => {
		const randomIndex = Math.floor(Math.random() * tagColors.length);
		return styles[tagColors[randomIndex]];
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
			<h1 style={{ margin: '40px' }}>My Orders</h1>
			<div className={styles.container}>
				{orders.length === 0 ? (
					<p>No orders yet</p>
				) : (
					orders.map((order) => (
						<div
							className={styles.card}
							key={order._id}
						>
							<div className={styles.cardHeader}>
								<Image
									src={`http://31.170.165.239:3000${
										JSON.parse(orders[0].cart)[0].img
									}`}
									alt='product-image'
									quality={90}
									placeholder='blur'
									blurDataURL={`http://31.170.165.239:3000${
										JSON.parse(orders[0].cart)[0].img
									}`}
									loading='lazy'
								/>
							</div>
							<div className={styles.cardBody}>
								<Link
									href={`/orders/${order._id}`}
									className={`${styles.tag} ${getRandomColorClass()}`}
								>
									<span>Track Your Order</span>
								</Link>
								<h5>{order.method}</h5>
								<span>
									Order total:{' '}
									<strong style={{ textDecoration: 'underline' }}>
										{order.total} AED
									</strong>
								</span>
								<span>
									Shipping costs:{' '}
									<strong>{order.shippingCost} AED</strong>
								</span>
								<hr />
								<table className={styles.table}>
									<thead>
										<tr>
											<th>Quantity</th>
											<th>Product Name</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody>
										{order.cart.map((item, index) => {
											const parsedItem = JSON.parse(item);
											return parsedItem.map((i, iIndex) => (
												<tr key={`${index}-${iIndex}`}>
													<td>{i.quantity}</td>
													<td>{i.title}</td>
													<td>{i.price} AED</td>
												</tr>
											));
										})}
									</tbody>
								</table>
								<h3>Your Order</h3>
								<hr />
								<div className={styles.user}>
									<div className={styles.userInfo}>
										<h5>{order.customer}</h5>
										<small>
											{formatDistanceToNow(
												new Date(order.createdAt),
											)}{' '}
											ago
										</small>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;

	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}

	return {
		props: {
			admin,
		},
	};
};

export default Orders;
