import axios from 'axios';
import Image from 'next/legacy/image';
import { useState } from 'react';
import styles from '../../styles/Admin.module.css';
import Swal from 'sweetalert2';

const Index = ({ orders, products }) => {
	const [product, setProductList] = useState(products);
	const [orderList, setOrderList] = useState(orders);
	const status = ['preparing', 'on the way', 'delivered'];

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(
				'http://localhost:800/api/products/' + id,
			);
			setProductList(product.filter((product) => product._id !== id));
		} catch (err) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Delete Failed',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
		}
	};
	const handleEdit = (productId) => {
		console.log(productId);
	};

	// const handleStatus = async (id) => {
	// 	const item = orderList.filter((order) => order._id === id)[0];
	// 	const currentStatus = item.status;

	// 	try {
	// 		const res = await axios.put('http://localhost:800/api/orders/' + id, {
	// 			status: currentStatus + 1,
	// 		});
	// 		setOrderList([
	// 			res.data,
	// 			...orderList.filter((order) => order._id !== id),
	// 		]);
	// 	} catch (err) {
	// 		Swal.fire({
	// 			position: 'center',
	// 			icon: 'error',
	// 			title: 'Status Change Failed',
	// 			showConfirmButton: false,
	// 			timer: 3000,
	// 			timerProgressBar: true,
	// 		});
	// 	}
	// };
	const handleStatus = async (id) => {
		const item = orderList.filter((order) => order._id === id)[0];
		const currentStatus = item.status;

		try {
			const res = await axios.put('http://localhost:800/api/orders/' + id, {
				status: currentStatus + 1,
			});
			setOrderList([
				res.data,
				...orderList.filter((order) => order._id !== id),
			]);

			const phoneNumber = item.phone_number;
			console.log(`🚀  file: index.jsx:70  phoneNumber =>`, phoneNumber);
			const message = `Your order status has been updated to ${
				status[currentStatus + 1]
			}`;
			await axios.post('/api/whatsappBot', { phoneNumber, message });
		} catch (err) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Status Change Failed',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<h1 className={styles.title}>Products</h1>
				<table className={styles.table}>
					<tbody>
						<tr className={styles.trTitle}>
							<th>Image</th>
							<th>Id</th>
							<th>Title</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</tbody>
					{product.map((product) => (
						<tbody key={product._id}>
							<tr className={styles.trTitle}>
								<td>
									<Image
										src={product.img}
										width={50}
										height={50}
										objectFit='cover'
										alt='product-image'
									/>
								</td>
								<td>{product._id.slice(0, 5)}...</td>
								<td>{product.title}</td>
								<td>${product.prices[0]}</td>
								<td>
									<button
										className={styles.button}
										onClick={() => handleEdit(product._id)}
									>
										Edit
									</button>
									<button
										className={styles.button}
										onClick={() => handleDelete(product._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className={styles.item}>
				<h1 className={styles.title}>Orders</h1>
				<table className={styles.table}>
					<tbody>
						<tr className={styles.trTitle}>
							<th>Id</th>
							<th>Customer</th>
							<th>Total</th>
							<th>Payment</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</tbody>
					{orderList.map((order) => (
						<tbody key={order._id}>
							<tr className={styles.trTitle}>
								<td>{order._id.slice(0, 5)}...</td>
								<td>{order.customer}</td>
								<td>${order.total}</td>
								<td>
									{order.method === 0 ? (
										<span>cash</span>
									) : (
										<span>paid</span>
									)}
								</td>
								<td>{status[order.status]}</td>
								<td>
									<button onClick={() => handleStatus(order._id)}>
										Next Stage
									</button>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
};

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';

	if (myCookie.token !== process.env.TOKEN) {
		return {
			redirect: {
				destination: '/admin/login',
				permanent: false,
			},
		};
	}

	const productRes = await axios.get('http://localhost:800/api/products');
	const orderRes = await axios.get('http://localhost:800/api/orders');

	return {
		props: {
			orders: orderRes.data,
			products: productRes.data,
		},
	};
};

export default Index;
