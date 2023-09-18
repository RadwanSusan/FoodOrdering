import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		let event;
		try {
			const rawBody = await buffer(req);
			const signature = req.headers['stripe-signature'];
			event = stripe.webhooks.constructEvent(
				rawBody.toString('utf8'),
				signature,
				process.env.STRIPE_WEBHOOK_SECRET,
			);
		} catch (err) {
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}
		if (event.type === 'checkout.session.completed') {
			try {
				const session = event.data.object;
				console.log(`🚀  file: index.js:23  session =>`, session);
				// const res = await axios.post('http://31.170.165.239:8000/api/orders', {
				// 	sessionId: session.id,
				// 	amount: session.amount_total / 100,
				// 	currency: session.currency,
				// 	status: session.payment_status,
				// 	products: JSON.parse(session.metadata.products),
				// });
				res.status(200).json({ received: true });
			} catch (err) {
				res.status(400).json({ received: false });
			}
		} else {
			res.status(400).json({ received: false });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
export const config = {
	api: {
		bodyParser: false,
	},
};
