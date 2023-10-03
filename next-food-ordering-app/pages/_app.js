import Layout from '../components/Layout';
import '../styles/globals.css';
import store from '../redux/store';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

let persistor = persistStore(store);

// let deviceId = localStorage.getItem('deviceId');
// if (!deviceId) {
// 	deviceId = uuidv4();
// 	localStorage.setItem('deviceId', deviceId);
// }

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		let deviceId = localStorage.getItem('deviceId');
		if (!deviceId) {
			deviceId = uuidv4();
			localStorage.setItem('deviceId', deviceId);
		}
	}, []);
	return (
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<Layout {...pageProps}>
					<NextNProgress color='#8f0900' />
					<Component {...pageProps} />
				</Layout>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
