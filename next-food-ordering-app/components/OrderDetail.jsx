import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';

const OrderDetail = ({ total, createOrder, cart }) => {
	const [customer, setCustomer] = useState('');
	const [address, setAddress] = useState('');

	console.log(
		`🚀  file: OrderDetail.jsx:5  cart =>`,
		JSON.stringify(cart.products),
	);
	const handleClick = () => {
		createOrder(
			{ customer, address, total, method: 'Cash on Delivery' },
			JSON.stringify(cart.products),
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>
					You will pay ${total} after delivery.
				</h1>
				<div className={styles.item}>
					<label className={styles.label}>Name Surname</label>
					<input
						placeholder='Full Name'
						type='text'
						className={styles.input}
						onChange={(e) => setCustomer(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Phone Number</label>
					<input
						type='text'
						placeholder='+971(50)0000000'
						className={styles.input}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Address</label>
					<textarea
						rows={5}
						placeholder='Po Box 17918 Jebel Ali Free Zone, Dubai'
						type='text'
						className={styles.textarea}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<button
					className={styles.button}
					onClick={handleClick}
				>
					Order
				</button>
			</div>
		</div>
	);
};

export default OrderDetail;
