import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2023-08-16',
});

const handler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { currency, cart, shippingCost } = req.body;
			console.log(`🚀  file: checkout.js:12  shippingCost =>`, shippingCost);
			console.log(`🚀  file: checkout.js:12  req.body =>`, req.body);

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
					// unit_amount: product.price * 100,
					unit_amount: (product.price + shippingCost) * 100,
				},
				quantity: product.quantity,
			}));
			console.log(`🚀  file: checkout.js:29  lineItems =>`, lineItems);

			const cartData = {
				method: 'stripe payment',
				// cart: JSON.stringify({
				// 	_id: cart.products.map((product) => product._id),
				// 	name: cart.products.map((product) => product.title),
				// 	price: cart.products.map((product) => product.price),
				// 	quantity: cart.products.map((product) => product.quantity),
				// 	extraOptions: cart.products.map(
				// 		(product) => product.extraOptions,
				// 	),
				// }),
				cart: JSON.stringify(cart.products),
				total: cart.total,
				shippingCost: shippingCost || 0,
				customer: req.body.customer,
				address: req.body.address,
				phone: req.body.phone,
				deviceId: req.body.deviceId,
			};

			const response = await axios.post(
				'http://localhost:800/api/orders',
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
					// success_url: `${req.headers.origin}/success`,
					success_url: `${req.headers.origin}/orders/${response.data._id}`,
					cancel_url: `${req.headers.origin}/cancel`,
				});
				console.log('Session ID:', session.id);
				res.status(200).json({ sessionId: session.id });
			} else {
				res.status(400).json({ statusCode: response.status });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};

export default handler;
