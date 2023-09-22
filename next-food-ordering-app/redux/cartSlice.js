import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			const product = action.payload;
			product.uniqueId = new Date().getTime();
			state.products.push(product);
			state.quantity += 1;
			state.total += product.price * product.quantity;
		},

		reset: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
		removeFromCart: (state, action) => {
			const productToRemove = state.products.find(
				(item) => item.uniqueId === action.payload,
			);

			if (productToRemove) {
				state.quantity -= 1;
				state.total -= productToRemove.price * productToRemove.quantity;

				state.products = state.products.filter(
					(item) => item.uniqueId !== action.payload,
				);
			}
		},
	},
});

export const { addProduct, reset, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
