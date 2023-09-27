import Stripe from 'stripe';
import axios from 'axios';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2023-08-16',
});

async function updateOrder(session, res) {
	const orderId = session.metadata.order_id;
	const response = await axios.put(
		`http://31.170.165.239:800/api/orders/${orderId}`,
		{
			payment_received: true,
			customer: session.customer_details.name,
			phone_number: session.customer_details.phone,
			email: session.customer_details.email,
		},
	);
	if (response.status === 200) {
		res.status(200).json({ received: true });
	} else {
		res.status(500).json({ received: false, err: response.data });
	}
}

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
			console.error(err);
			return res.status(500).send(`Webhook Error: ${err.message}`);
		}
		if (event.type === 'checkout.session.completed') {
			try {
				const session = event.data.object;
				await updateOrder(session, res);
			} catch (err) {
				console.error(err);
				res.status(500).json({ received: false });
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
