// import styles from '../styles/Cart.module.css';
// import Image from 'next/legacy/image';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import {
// 	PayPalScriptProvider,
// 	PayPalButtons,
// 	usePayPalScriptReducer,
// } from '@paypal/react-paypal-js';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { reset } from '../redux/cartSlice';
// import OrderDetail from '../components/OrderDetail';
// import Swal from 'sweetalert2';

// const Cart = () => {
// 	const cart = useSelector((state) => state.cart);
// 	const [open, setOpen] = useState(false);
// 	const [cash, setCash] = useState(false);
// 	const amount = cart.total;
// 	const currency = 'USD';
// 	const style = { layout: 'vertical' };
// 	const dispatch = useDispatch();
// 	const router = useRouter();

// 	const createOrder = async (data) => {
// 		try {
// 			const res = await axios.post(
// 				'http://31.170.165.239:8000/api/orders',
// 				data,
// 			);
// 			if (res.status === 201) {
// 				dispatch(reset());
// 				router.push(`/orders/${res.data._id}`);
// 				Swal.fire({
// 					position: 'center',
// 					icon: 'success',
// 					title: 'Order Placed',
// 					showConfirmButton: false,
// 					timer: 1500,
// 				});
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};

// 	// Custom component to wrap the PayPalButtons and handle currency changes
// 	// const ButtonWrapper = ({ currency, showSpinner }) => {
// 	// 	// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
// 	// 	// This is the main reason to wrap the PayPalButtons in a new component
// 	// 	const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

// 	// 	useEffect(() => {
// 	// 		dispatch({
// 	// 			type: 'resetOptions',
// 	// 			value: {
// 	// 				...options,
// 	// 				currency: currency,
// 	// 			},
// 	// 		});
// 	// 	}, [currency, showSpinner]);

// 	// 	return (
// 	// 		<>
// 	// 			{showSpinner && isPending && <div className='spinner' />}
// 	// 			<PayPalButtons
// 	// 				style={style}
// 	// 				disabled={false}
// 	// 				forceReRender={[amount, currency, style]}
// 	// 				fundingSource={undefined}
// 	// 				createOrder={(data, actions) => {
// 	// 					return actions.order
// 	// 						.create({
// 	// 							purchase_units: [
// 	// 								{
// 	// 									amount: {
// 	// 										currency_code: currency,
// 	// 										value: amount,
// 	// 									},
// 	// 								},
// 	// 							],
// 	// 						})
// 	// 						.then((orderId) => {
// 	// 							// Your code here after create the order
// 	// 							return orderId;
// 	// 						});
// 	// 				}}
// 	// 				onApprove={function (data, actions) {
// 	// 					return actions.order.capture().then(function (details) {
// 	// 						const shipping = details.purchase_units[0].shipping;
// 	// 						createOrder({
// 	// 							customer: shipping.name.full_name,
// 	// 							address: shipping.address.address_line_1,
// 	// 							total: cart.total,
// 	// 							method: 1,
// 	// 						});
// 	// 					});
// 	// 				}}
// 	// 			/>
// 	// 		</>
// 	// 	);
// 	// };

// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.left}>
// 				<table className={styles.table}>
// 					<tbody>
// 						<tr className={styles.trTitle}>
// 							<th>Product</th>
// 							<th>Name</th>
// 							<th>Extras</th>
// 							<th>Price</th>
// 							<th>Quantity</th>
// 							<th>Total</th>
// 						</tr>
// 					</tbody>
// 					<tbody>
// 						{cart.products.map((product) => (
// 							<tr
// 								className={styles.tr}
// 								key={product._id}
// 							>
// 								<td>
// 									<div className={styles.imgContainer}>
// 										<Image
// 											src={product.img}
// 											layout='fill'
// 											objectFit='cover'
// 											alt=''
// 										/>
// 									</div>
// 								</td>
// 								<td>
// 									<span className={styles.name}>{product.title}</span>
// 								</td>
// 								<td>
// 									<span className={styles.extras}>
// 										{product.extras.map((extra) => (
// 											<span key={extra._id}>{extra.text}, </span>
// 										))}
// 									</span>
// 								</td>
// 								<td>
// 									<span className={styles.price}>
// 										${product.price}
// 									</span>
// 								</td>
// 								<td>
// 									<span className={styles.quantity}>
// 										{product.quantity}
// 									</span>
// 								</td>
// 								<td>
// 									<span className={styles.total}>
// 										${product.price * product.quantity}
// 									</span>
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 			<div className={styles.right}>
// 				<div className={styles.wrapper}>
// 					<h2 className={styles.title}>CART TOTAL</h2>
// 					<div className={styles.totalText}>
// 						<b className={styles.totalTextTitle}>Subtotal:</b>$
// 						{cart.total}
// 					</div>
// 					<div className={styles.totalText}>
// 						<b className={styles.totalTextTitle}>Discount:</b>$0.00
// 					</div>
// 					<div className={styles.totalText}>
// 						<b className={styles.totalTextTitle}>Total:</b>${cart.total}
// 					</div>
// 					{open ? (
// 						<div className={styles.paymentMethods}>
// 							<button
// 								className={styles.payButton}
// 								onClick={() => setCash(true)}
// 							>
// 								CASH ON DELIVERY
// 							</button>
// 							{/* <PayPalScriptProvider
// 								options={{
// 									'client-id':
// 										'ATTL8fDJKfGzXNH4VVuDy1qW4_Jm8S0sqmnUTeYtWpqxUJLnXIn90V8YIGDg-SNPaB70Hg4mko_fde4-',
// 									components: 'buttons',
// 									currency: 'USD',
// 									'disable-funding': 'credit,card,p24',
// 								}}
// 							>
// 								<ButtonWrapper
// 									currency={currency}
// 									showSpinner={false}
// 								/>
// 							</PayPalScriptProvider> */}
// 						</div>
// 					) : (
// 						<button
// 							onClick={() => setOpen(true)}
// 							className={styles.button}
// 						>
// 							CHECKOUT NOW!
// 						</button>
// 					)}
// 				</div>
// 			</div>
// 			{cash && (
// 				<OrderDetail
// 					total={cart.total}
// 					createOrder={createOrder}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default Cart;

import styles from '../styles/Cart.module.css';
import Image from 'next/legacy/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import OrderDetail from '../components/OrderDetail';
import Swal from 'sweetalert2';
import { CheckoutRedirectButton } from '../components/StripeButton';

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [open, setOpen] = useState(false);
	const [cash, setCash] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const createOrder = async (data) => {
		try {
			const res = await axios.post(
				'http://31.170.165.239:8000/api/orders',
				data,
			);
			if (res.status === 201) {
				dispatch(reset());
				router.push(`/orders/${res.data._id}`);
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Order Placed',
					showConfirmButton: false,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<table className={styles.table}>
					<tbody>
						<tr className={styles.trTitle}>
							<th>Product</th>
							<th>Name</th>
							<th>Extras</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
					</tbody>
					<tbody>
						{cart.products.map((product) => (
							<tr
								className={styles.tr}
								key={product._id}
							>
								<td>
									<div className={styles.imgContainer}>
										<Image
											src={product.img}
											layout='fill'
											objectFit='cover'
											alt='product-image'
										/>
									</div>
								</td>
								<td>
									<span className={styles.name}>{product.title}</span>
								</td>
								<td>
									<span className={styles.extras}>
										{product.extras.map((extra) => (
											<span key={extra._id}>{extra.text}, </span>
										))}
									</span>
								</td>
								<td>
									<span className={styles.price}>
										${product.price}
									</span>
								</td>
								<td>
									<span className={styles.quantity}>
										{product.quantity}
									</span>
								</td>
								<td>
									<span className={styles.total}>
										${product.price * product.quantity}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>CART TOTAL</h2>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Subtotal:</b>$
						{cart.total}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount:</b>$0.00
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Total:</b>${cart.total}
					</div>
					{open ? (
						<div className={styles.paymentMethods}>
							<button
								className={styles.payButton}
								onClick={() => {
									if (cart.total === 0)
										return Swal.fire({
											position: 'center',
											icon: 'info',
											title: 'Cart is empty',
											showConfirmButton: false,
										});
									setCash(true);
								}}
							>
								CASH ON DELIVERY
							</button>
							<CheckoutRedirectButton
								disabled={cart.total === 0}
								amount={cart.total * 100}
								currency='aed'
								cart={cart}
							>
								PAY WITH STRIPE
							</CheckoutRedirectButton>
						</div>
					) : (
						<button
							onClick={() => {
								if (cart.total === 0)
									return Swal.fire({
										position: 'center',
										icon: 'info',
										title: 'Cart is empty',
										showConfirmButton: false,
									});
								setOpen(true);
							}}
							className={styles.button}
						>
							CHECKOUT NOW!
						</button>
					)}
				</div>
			</div>
			{cash && (
				<OrderDetail
					total={cart.total}
					createOrder={createOrder}
					cart={cart}
				/>
			)}
		</div>
	);
};

export default Cart;
