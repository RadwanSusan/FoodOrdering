import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, selectOrders } from '../../redux/ordersSlice';
import { formatDistanceToNow } from 'date-fns';
import styles from '../../styles/OrderList.module.css';
import Link from 'next/link';

// const Orders = () => {
// 	const dispatch = useDispatch();
// 	const orders = useSelector(selectOrders);
// 	console.log(orders);

// 	useEffect(() => {
// 		fetch(
// 			`http://localhost:800/api/orders?deviceId=${localStorage.getItem(
// 				'deviceId',
// 			)}`,
// 		)
// 			.then((response) => response.json())
// 			.then((data) => dispatch(setOrders(data)));
// 	}, [dispatch]);

// 	return (
// 		<div>
// 			{orders.map((order) => (
// 				<div key={order._id}>
// 					<div>
// 						<img
// 							src={order.image}
// 							alt={order.title}
// 						/>
// 					</div>
// 					<h2>{order.title}</h2>
// 					<p>{order.description}</p>
// 					<h3>{order.customer}</h3>
// 					<p>{order.address}</p>
// 					<p>{order.total}</p>
// 					<p>{order.method}</p>
// 					<p>{order.createdAt}</p>
// 					<p>{order.status}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

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
			`http://localhost:800/api/orders?deviceId=${localStorage.getItem(
				'deviceId',
			)}`,
		)
			.then((response) => response.json())
			.then((data) => dispatch(setOrders(data)));
	}, [dispatch]);
	console.log(orders);

	const getRandomColorClass = () => {
		const randomIndex = Math.floor(Math.random() * tagColors.length);
		return styles[tagColors[randomIndex]];
	};

	return (
		// <div className={styles.container}>
		// 	{orders.map((order) => (
		// 		<div
		// 			className='card'
		// 			key={order._id}
		// 		>
		// 			<div className={styles.cardHeader}>
		// 				<img
		// 					src={JSON.parse(orders[0].cart)[0].img}
		// 					alt={order.title}
		// 				/>
		// 			</div>
		// 			<div className={styles.cardBody}>
		// 				<h4>{order.title}</h4>
		// 				<p>{order.description}</p>
		// 				<div className={styles.user}>
		// 					<h5>{order.customer}</h5>
		// 					<p>{order.address}</p>
		// 					<p>{order.total}</p>
		// 					<p>{order.method}</p>
		// 					<p>{order.createdAt}</p>
		// 					<p>{order.status}</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	))}
		// </div>
		<>
			<h1>My Orders</h1>
			<div className={styles.container}>
				{orders.map((order) => (
					<div
						className={styles.card}
						key={order._id}
					>
						<div className={styles.cardHeader}>
							<img
								src={JSON.parse(orders[0].cart)[0].img}
								alt='rover'
							/>
						</div>
						<div className={styles.cardBody}>
							<span className={`${styles.tag} ${getRandomColorClass()}`}>
								<Link href={`/orders/${order._id}`}>More Info</Link>
							</span>
							<h4>{order.title}</h4>
							<ul>
								<li>
									<span>
										{order.cart.map((item) => (
											<div key={JSON.parse(item)[0].uniqueId}>
												<p>
													{JSON.parse(item).map((i) => i.title)}
												</p>
												<p>{item.description}</p>
											</div>
										))}
									</span>
								</li>
							</ul>
							<div className={styles.user}>
								<div className={styles.userInfo}>
									<h5>{order.customer}</h5>
									<small>
										{formatDistanceToNow(new Date(order.createdAt))}{' '}
										ago
									</small>
								</div>
							</div>
						</div>
					</div>
				))}
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
