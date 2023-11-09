import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, selectOrders } from '../../redux/ordersSlice';
import { formatDistanceToNow } from 'date-fns';
import styles from '../../styles/OrderList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Swal from 'sweetalert2';
import useTranslation from 'next-translate/useTranslation';

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
	const fallbackImg = `${process.env.API_URL_MEDIA}/images/LF-logo-1k.png`;
	const [imgSrc, setImgSrc] = useState(fallbackImg);
	const { t, lang } = useTranslation('common');

	useEffect(() => {
		fetch(
			`${process.env.API_URL}/api/orders?deviceId=${localStorage.getItem(
				'deviceId',
			)}`,
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				dispatch(setOrders(data));
				if (data[0] && data[0].cart[0]) {
					setImgSrc(
						`${process.env.API_URL_MEDIA}${
							JSON.parse(data[0].cart)[0].img
						}`,
					);
				}
			})
			.catch((error) => {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: lang === 'en' ? `An error occurred ${error}` : 'حدث خطا',
					text: error.message,
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			});
	}, [dispatch, lang]);

	const handleError = () => {
		setImgSrc(fallbackImg);
	};

	const getRandomColorClass = () => {
		const randomIndex = Math.floor(Math.random() * tagColors.length);
		return styles[tagColors[randomIndex]];
	};

	return (
		<>
			<Head>
				<title>
					{t('Lahmah&Fahmah')} | {t('Orders')}
				</title>
			</Head>
			<h1 style={{ margin: '40px' }}>{t('My Orders')}</h1>
			<div className={styles.container}>
				{orders.length === 0 ? (
					<p>{t('No orders yet')}</p>
				) : (
					orders.map((order) => (
						<div
							className={styles.card}
							key={order._id}
						>
							<div className={styles.cardHeader}>
								<Image
									src={imgSrc}
									alt='product-image'
									quality={90}
									placeholder='blur'
									blurDataURL={imgSrc}
									loading='lazy'
									onError={handleError}
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
									Order total:
									<strong style={{ textDecoration: 'underline' }}>
										{order.total} AED
									</strong>
								</span>
								<span>
									Shipping costs:
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
											)}
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

	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59',
	);

	return {
		props: {
			admin,
		},
	};
};

export default Orders;
