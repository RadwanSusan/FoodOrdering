const accountSid = `${process.env.ACCOUNTSID}`;
const authToken = `${process.env.AUTHTOKEN}`;
const client = require('twilio')(accountSid, authToken);
export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { to, body } = req.body;

		try {
			await client.messages.create({
				body: body,
				from: 'whatsapp:+14155238886',
				to: `whatsapp:${to}`,
			});

			res.status(200).json({ success: true });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
