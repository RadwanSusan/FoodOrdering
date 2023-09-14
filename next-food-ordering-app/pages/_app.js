import Layout from '../components/Layout';
import '../styles/globals.css';
import store from '../redux/store';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<NextNProgress color='#8f0900' />
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
