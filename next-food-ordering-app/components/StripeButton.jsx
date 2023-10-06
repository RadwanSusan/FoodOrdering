import { loadStripe } from '@stripe/stripe-js';
import CheckoutFormData from './CheckoutFormData';
import styles from '../styles/Cart.module.css';
import { useState } from 'react';
import OrderDetail from './OrderDetail';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// export const CheckoutRedirectButton = ({ children, ...props }) => {
// 	const createOrder = async (data) => {
// 		try {
// 			const res = await axios.post('http://localhost:800/api/orders', data);
// 			if (res.status === 201) {
// 				dispatch(reset());
// 				router.push(`/orders/${res.data._id}`);
// 				Swal.fire({
// 					position: 'center',
// 					icon: 'success',
// 					title: 'Order Placed',
// 					showConfirmButton: false,
// 					timer: 3000,
// 					timerProgressBar: true,
// 				});
// 			}
// 		} catch (err) {
// 			Swal.fire({
// 				position: 'center',
// 				icon: 'error',
// 				title: 'Order Failed',
// 				showConfirmButton: false,
// 				timer: 3000,
// 				timerProgressBar: true,
// 			});
// 		}
// 	};
// 	const handleCheckout = async (event) => {
// 		event.preventDefault();

// 		const stripe = await stripePromise;

// 		const response = await fetch('/api/stripe/checkout', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				amount: props.amount,
// 				currency: props.currency,
// 				cart: props.cart,
// 			}),
// 		});

// 		const session = await response.json();

// 		const result = await stripe.redirectToCheckout({
// 			sessionId: session.sessionId,
// 		});

// 		if (result.error) {
// 			console.error(result.error.message);
// 		} else {
// 			createOrder(
// 				JSON.stringify({
// 					amount: props.amount,
// 					currency: props.currency,
// 					cart: props.cart,
// 					result: result,
// 				}),
// 			);
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleCheckout}>
// 			<CheckoutFormData
// 				amount={props.amount}
// 				currency={props.currency}
// 			/>
// 			<button
// 				className={styles.payButton}
// 				type='submit'
// 				disabled={props.disabled}
// 			>
// 				{children}
// 			</button>
// 		</form>
// 	);
// };

export const CheckoutRedirectButton = ({ children, ...props }) => {
	const [showOrderDetail, setShowOrderDetail] = useState(false);

	// const handleCheckout = async (event) => {
	// 	event.preventDefault();
	// 	const stripe = await stripePromise;

	// 	const response = await fetch('/api/stripe/checkout', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			amount: props.amount,
	// 			currency: props.currency,
	// 			cart: props.cart,
	// 		}),
	// 	});

	// 	const session = await response.json();

	// 	const result = await stripe.redirectToCheckout({
	// 		sessionId: session.sessionId,
	// 	});

	// 	if (result.error) {
	// 		console.error(result.error.message);
	// 	}
	// };

	const handleCheckout = async () => {
		const stripe = await stripePromise;

		const response = await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				amount: props.amount,
				currency: props.currency,
				cart: props.cart,
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
