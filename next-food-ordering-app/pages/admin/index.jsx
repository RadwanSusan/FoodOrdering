import axios from 'axios';
import Image from 'next/legacy/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../../styles/Admin.module.css';
import Swal from 'sweetalert2';
import Add from '../../components/Add';
import ProductCategoryDropdown from '../../components/ProductCategoryDropdown';

const status = ['preparing', 'on the way', 'delivered'];
const options = [
	{ value: 'Best Sellers', label: 'best sellers' },
	{ value: 'Our Mix Grill', label: 'Our Mix Grill' },
	{ value: 'Meal for one', label: 'Meal for one' },
	{ value: 'Meal for two', label: 'Meal for two' },
	{ value: 'Meal for four', label: 'Meal for four' },
	{ value: 'Sandwiches', label: 'Sandwiches' },
	{ value: 'Wrap Sandwiches', label: 'Wrap Sandwiches' },
	{ value: 'Appetizer', label: 'Appetizer' },
	{ value: 'Pans', label: 'Pans' },
	{ value: 'Salad', label: 'Salad' },
	{ value: 'Australian Lamb', label: 'Australian Lamb' },
	{ value: 'Local Lamb', label: 'Local Lamb' },
	{ value: 'Syrian Lamb', label: 'Syrian Lamb' },
	{ value: 'Mutton', label: 'Mutton' },
	{ value: 'Australian Beef', label: 'Australian Beef' },
	{ value: 'Local Beef', label: 'Local Beef' },
	{ value: 'Fresh Chicken', label: 'Fresh Chicken' },
	{ value: 'Ready To Cook', label: 'Ready To Cook' },
	{ value: 'Ready To Grill', label: 'Ready To Grill' },
	{ value: 'Frozen Item', label: 'Frozen Item' },
	{ value: 'Soft Drinks', label: 'Soft Drinks' },
];

const Index = ({ orders, products }) => {
	const [product, setProductList] = useState(products);
	const [orderList, setOrderList] = useState(orders);
	const [editingId, setEditingId] = useState(null);
	const [close, setClose] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(options[0].value);
	const originalOrderList = useRef(orders);

	useEffect(() => {
		const interval = setInterval(() => {
			axios.get('http://localhost:800/api/products').then((res) => {
				setProductList(res.data);
			});
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const handleDelete = useCallback(
		async (id) => {
			try {
				const result = await Swal.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!',
				});

				if (result.isConfirmed) {
					const res = await axios.delete(
						'http://localhost:800/api/products/' + id,
					);
					if (res.status >= 200 && res.status < 300) {
						const newProduct = product.filter(
							(product) => product._id !== id,
						);
						setProductList(newProduct);
						setClose(true);
						Swal.fire(
							'Deleted!',
							'Your product has been deleted.',
							'success',
						);
					}
				}
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
		},
		[product, setProductList, setClose],
	);

	const handleEdit = useCallback((productId) => {
		setEditingId(productId);
	}, []);

	const handleStatus = useCallback(
		async (id) => {
			const item = orderList.filter((order) => order._id === id)[0];
			const currentStatus = item.status;

			try {
				const res = await axios.put(
					'http://localhost:800/api/orders/' + id,
					{
						status: currentStatus + 1,
					},
				);
				setOrderList([
					res.data,
					...orderList.filter((order) => order._id !== id),
				]);
				const phoneNumber = item.phone_number;
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
		},
		[orderList, status],
	);

	const handleUpdate = useCallback(
		async (updatedProduct) => {
			try {
				const res = await axios.put(
					'http://localhost:800/api/products/' + updatedProduct._id,
					updatedProduct,
				);
				setProductList(
					product.map((product) =>
						product._id === res.data._id ? res.data : product,
					),
				);
				setEditingId(null);
			} catch (err) {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Update Failed',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			}
		},
		[product],
	);
	const handleSort = (key) => {
		let sortedOrders;

		if (key === 'newest') {
			sortedOrders = [...orderList].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			);
		} else if (key === 'oldest') {
			sortedOrders = [...orderList].sort(
				(a, b) => new Date(a.createdAt) - new Date(b.createdAt),
			);
		} else {
			sortedOrders = [...orderList].sort((a, b) => {
				if (a[key] < b[key]) return -1;
				if (a[key] > b[key]) return 1;
				return 0;
			});
		}

		setOrderList(sortedOrders);
	};

	const handleFilter = (key, value) => {
		const filteredOrders = originalOrderList.current.filter((order) => {
			if (order[key] && typeof order[key] === 'string') {
				return order[key].toLowerCase().includes(value.toLowerCase());
			}
			return false;
		});
		setOrderList(filteredOrders);
	};

	return (
		<div className={styles.container}>
			{editingId ? (
				<Add
					productToEdit={product.find((p) => p._id === editingId)}
					onUpdate={handleUpdate}
					onCancel={() => setEditingId(null)}
					setClose={setClose}
				/>
			) : (
				<>
					<div className={styles.item}>
						<ProductCategoryDropdown
							options={options}
							onCategoryChange={setSelectedCategory}
						/>
						<h1 className={styles.title}>Products</h1>
						<table className={styles.table}>
							<tbody>
								<tr className={styles.trTitle}>
									<th>Image</th>
									<th>Id</th>
									<th>Title</th>
									<th>Prices</th>
									<th>Action</th>
								</tr>
							</tbody>
							{product
								.filter((product) =>
									product.category.includes(selectedCategory),
								)
								.map((product) => (
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
											<td>
												${product.prices[0]} - ${product.prices[1]}{' '}
												- ${product.prices[2]}
											</td>
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
						<select onChange={(e) => handleSort(e.target.value)}>
							<option value='newest'>Sort by Newest</option>
							<option value='oldest'>Sort by Oldest</option>
							<option value='id'>Sort by ID</option>
							<option value='customer'>Sort by Customer</option>
							<option value='total'>Sort by Total</option>
							<option value='payment'>Sort by Payment</option>
							<option value='status'>Sort by Status</option>
						</select>

						<input
							type='text'
							onChange={(e) => handleFilter('customer', e.target.value)}
							placeholder='Filter by customer'
						/>
						<h1 className={styles.title}>Orders</h1>
						<table className={styles.table}>
							<tbody>
								<tr className={styles.trTitle}>
									<th>Id</th>
									<th>Customer</th>
									<th>Total</th>
									<th>Payment</th>
									<th>Status</th>
									<th>Order Date</th>
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
											{new Date(order.createdAt).toLocaleString()}
										</td>
										<td>
											<button
												onClick={() => handleStatus(order._id)}
											>
												Next Stage
											</button>
										</td>
									</tr>
								</tbody>
							))}
						</table>
					</div>
				</>
			)}
		</div>
	);
};

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;

	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}

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
			admin,
		},
	};
};

export default Index;
