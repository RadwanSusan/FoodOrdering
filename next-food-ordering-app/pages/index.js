import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import Featured from '../components/Featured';
import MenuList from '../components/MenuList';

export default function Home({ productsList, admin }) {
	const [close, setClose] = useState(true);
	let counter = 0;
	return (
		<div>
			<Head>
				<title>Lahamah & Fahmah</title>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link
					rel='manifest'
					href='/site.webmanifest'
				/>
				<link
					rel='mask-icon'
					href='/safari-pinned-tab.svg'
					color='#5bbad5'
				/>
				<meta
					name='apple-mobile-web-app-title'
					content='Lahmah &amp; Fahmah'
				/>
				<meta
					name='application-name'
					content='Lahmah &amp; Fahmah'
				/>
				<meta
					name='msapplication-TileColor'
					content='#b91d47'
				/>
				<meta
					name='theme-color'
					content='#ffffff'
				/>
			</Head>
			<Featured />
			{admin ? <AddButton setClose={setClose} /> : null}
			<MenuList
				menuListItems={productsList}
				key={counter++}
			/>
			{!close && (
				<Add
					setClose={setClose}
					onCancel={() => setClose(true)}
				/>
			)}
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;

	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}

	const res = await axios.get('http://31.170.165.239:765/api/products');
	return {
		props: {
			productsList: res.data,
			admin,
		},
	};
};
