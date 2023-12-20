import { loadStripe } from '@stripe/stripe-js';
import styles from '../styles/Cart.module.css';
import { useState } from 'react';
import OrderDetail from './OrderDetail';
import Swal from 'sweetalert2';
import useTranslation from 'next-translate/useTranslation';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const CheckoutRedirectButton = ({ children, ...props }) => {
	const [showOrderDetail, setShowOrderDetail] = useState(false);
	const { t, lang } = useTranslation('common');

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
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: lang === 'en' ? 'An error occurred' : 'حدث خطا',
				text: result.error.message,
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
		}

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
					onClick={() => setShowOrderDetail(true)}>
					{children}
				</button>
			</form>
		);
	};
};
