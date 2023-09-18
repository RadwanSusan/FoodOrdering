import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2023-08-16',
});

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { currency, cart } = req.body;

			if (!cart || !cart.products) {
				return res.status(400).json({ message: 'No cart items found.' });
			}

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: cart.products.map((product) => ({
					price_data: {
						currency,
						product_data: {
							name: product.title,
							images: [product.img],
							description: product.desc,
						},
						unit_amount: product.price * 100,
					},
					quantity: product.quantity,
				})),
				mode: 'payment',
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/cancel`,
			});
			res.status(200).json({ sessionId: session.id });
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};
