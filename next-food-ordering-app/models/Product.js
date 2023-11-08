import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 60,
		},
		title_ar: {
			type: String,
			required: true,
			maxlength: 60,
		},
		desc: {
			type: String,
			maxlength: 200,
		},
		desc_ar: {
			type: String,
			maxlength: 200,
		},
		img: {
			type: String,
			required: true,
		},
		prices: {
			type: [Number],
			required: true,
		},
		category: {
			type: [String],
			required: true,
		},
		extraOptions: {
			type: [
				{
					text: { type: String, required: true },
					text_ar: { type: String, required: true },
					price: { type: Number, required: true },
				},
			],
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Product ||
	mongoose.model('Product', ProductSchema);
