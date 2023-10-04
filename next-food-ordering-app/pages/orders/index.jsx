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
	const getRandomColorClass = () => {
		const randomIndex = Math.floor(Math.random() * tagColors.length);
		return styles[tagColors[randomIndex]];
	};
	console.log(orders);
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
			<h1 style={{ margin: '40px' }}>My Orders</h1>
			<div className={styles.container}>
				{orders.map((order) => (
					<div
						className={styles.card}
						key={order._id}
					>
						<div className={styles.cardHeader}>
							<img
								src={JSON.parse(orders[0].cart)[0].img}
								alt='product-image'
							/>
						</div>
						<div className={styles.cardBody}>
							<Link
								href={`/orders/${order._id}`}
								className={`${styles.tag} ${getRandomColorClass()}`}
							>
								<span>Track Your Order</span>
							</Link>
							<h6>{order.method}</h6>
							<>
								<span>
									Order total:{' '}
									<strong style={{ textDecoration: 'underline' }}>
										{order.total} AED
									</strong>
								</span>
							</>
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
