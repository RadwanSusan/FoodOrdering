import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2023-08-16',
});

const handler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { currency, cart, shippingCost } = req.body;

			if (!cart?.products || cart.products.length === 0) {
				return res.status(400).json({ message: 'No cart items found.' });
			}

			const lineItems = cart.products.map((product) => ({
				price_data: {
					currency,
					product_data: {
						name: product.title,
						images: [product.img],
						description: product.desc,
					},
					unit_amount: (product.price + shippingCost) * 100,
				},
				quantity: product.quantity,
			}));

			const cartData = {
				method: 'stripe payment',
				cart: JSON.stringify(cart.products),
				total: cart.total,
				shippingCost: shippingCost || 0,
				customer: req.body.customer,
				address: req.body.address,
				phone: req.body.phone,
				deviceId: req.body.deviceId,
			};

			const response = await axios.post(
				`${process.env.API_URL}/api/orders`,
				cartData,
			);

			if (response.status === 201) {
				const session = await stripe.checkout.sessions.create({
					payment_method_types: ['card'],
					line_items: lineItems,
					metadata: {
						order_id: response.data._id,
					},
					phone_number_collection: {
						enabled: false,
					},
					mode: 'payment',
					success_url: `${req.headers.origin}/orders/${response.data._id}`,
					cancel_url: `${req.headers.origin}/cart`,
				});
				res.status(200).json({ sessionId: session.id });
			} else {
				res.status(400).json({ statusCode: response.status });
			}
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};

export default handler;
