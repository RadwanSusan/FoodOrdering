import dbConnect from '../../../util/mongo';
import Order from '../../../models/Order';

const handler = async (req, res) => {
	const { method } = req;

	await dbConnect();

	if (method === 'GET') {
		try {
			const deviceId = req.query.deviceId;
			const orders = deviceId
				? await Order.find({ deviceId })
				: await Order.find();
			res.status(200).json(orders);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (method === 'POST') {
		try {
			const order = await Order.create({
				...req.body,
				deviceId: req.body.deviceId,
			});
			res.status(201).json(order);
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

export default handler;
