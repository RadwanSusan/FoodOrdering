import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		customer: {
			type: String,
			maxlength: 60,
		},
		address: {
			type: String,
			maxlength: 200,
		},
		phone_number: {
			type: Number,
		},
		email: {
			type: String,
		},
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			default: 0,
		},
		method: {
			type: String,
			required: true,
		},
		cart: {
			type: Array,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		payment_received: {
			type: Boolean,
			default: false,
		},
		deviceId: {
			type: String,
		},
		shippingCost: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
