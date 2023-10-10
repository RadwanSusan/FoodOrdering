import { loadStripe } from '@stripe/stripe-js';
import CheckoutFormData from './CheckoutFormData';
import styles from '../styles/Cart.module.css';
import { useState } from 'react';
import OrderDetail from './OrderDetail';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const CheckoutRedirectButton = ({ children, ...props }) => {
	console.log(`🚀  file: StripeButton.jsx:9  props =>`, props);
	const [showOrderDetail, setShowOrderDetail] = useState(false);

	const handleCheckout = async (data) => {
		const stripe = await stripePromise;
		const orderData = {
			customer: data.customer,
			address: data.address,
			total: data.total,
			method: data.method,
			cart: data.cart,
			phone_number: data.phone,
			deviceId: localStorage.getItem('deviceId'),
			shippingCost: data.shippingCost,
		};
		console.log(`🚀  file: StripeButton.jsx:24  orderData =>`, orderData);

		const response = await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				amount: props.amount,
				currency: props.currency,
				cart: props.cart,
				shippingCost: orderData.shippingCost,
				customer: orderData.customer,
				address: orderData.address,
				phone: orderData.phone,
				method: orderData.method,
				deviceId: orderData.deviceId,
			}),
		});

		const session = await response.json();

		const result = await stripe.redirectToCheckout({
			sessionId: session.sessionId,
		});

		if (result.error) {
			console.error(result.error.message);
		}
	};

	return (
		// <form onSubmit={(e) => e.preventDefault()}>
		// 	{showOrderDetail && (
		// 		<OrderDetail
		// 			total={props.amount / 100}
		// 			createOrder={handleCheckout}
		// 			cart={props.cart}
		// 			setCash={setShowOrderDetail}
		// 		/>
		// 	)}
		// 	<button
		// 		className={styles.payButton}
		// 		type='button'
		// 		disabled={props.disabled}
		// 		onClick={() => setShowOrderDetail(true)}
		// 	>
		// 		{children}
		// 	</button>
		// </form>
		<form onSubmit={(e) => e.preventDefault()}>
			{showOrderDetail && (
				<OrderDetail
					total={props.amount / 100}
					createOrder={handleCheckout}
					cart={props.cart}
					setCash={setShowOrderDetail}
				/>
			)}
			<button
				className={styles.payButton}
				type='button'
				disabled={props.disabled}
				onClick={() => setShowOrderDetail(true)}
			>
				{children}
			</button>
		</form>
	);
};
