import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';

import storage from './custom-storage-engine';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
	reducer: {
		cart: persistedReducer,
		orders: ordersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;
