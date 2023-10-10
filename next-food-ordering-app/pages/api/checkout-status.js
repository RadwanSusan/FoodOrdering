import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { session_id } = req.body;
		const session = await stripe.checkout.sessions.retrieve(session_id);
		const payment_intent = await stripe.paymentIntents.retrieve(
			session.payment_intent,
		);

		res.status(200).json({ payment_status: payment_intent.status });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
