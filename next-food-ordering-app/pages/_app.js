import Layout from '../components/Layout';
import '../styles/globals.css';
import store from '../redux/store';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head';
import { useEffect } from 'react';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const deviceId = localStorage.getItem('deviceId') || uuidv4();
		localStorage.setItem('deviceId', deviceId);
	}, []);

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1'
				/>
			</Head>
			<Provider store={store}>
				<PersistGate
					loading={null}
					persistor={persistor}
				>
					<Layout {...pageProps}>
						<NextNProgress color='#da0f00' />
						<Component {...pageProps} />
					</Layout>
				</PersistGate>
			</Provider>
		</>
	);
}

export default MyApp;
