import { loadStripe } from '@stripe/stripe-js';
import CheckoutFormData from './CheckoutFormData';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const CheckoutRedirectButton = ({ children, ...props }) => {
	const createOrder = async (data) => {
		try {
			const res = await axios.post(
				'http://31.170.165.239:800/api/orders',
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
					timer: 3000,
					timerProgressBar: true,
				});
			}
		} catch (err) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Order Failed',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
		}
	};
	const handleCheckout = async (event) => {
		event.preventDefault();

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
		} else {
			createOrder(
				JSON.stringify({
					amount: props.amount,
					currency: props.currency,
					cart: props.cart,
					result: result,
				}),
			);
		}
	};

	return (
		<form onSubmit={handleCheckout}>
			<CheckoutFormData
				amount={props.amount}
				currency={props.currency}
			/>
			<button
				type='submit'
				disabled={props.disabled}
			>
				{children}
			</button>
		</form>
	);
};
