import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, selectOrders } from '../../redux/ordersSlice';
import { formatDistanceToNow } from 'date-fns';
import styles from '../../styles/OrderList.module.css';
import Link from 'next/link';
import Image from 'next/image';

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
