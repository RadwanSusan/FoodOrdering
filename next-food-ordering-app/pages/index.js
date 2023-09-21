import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import Featured from '../components/Featured';
import MenuList from '../components/MenuList';
import styles from '../styles/Home.module.css';

export default function Home({ productsList, admin }) {
	const [close, setClose] = useState(true);
	let counter = 0;
	return (
		<div className={styles.container}>
			<Head>
				<title>Pizza Restaurant in Dubai</title>
				<meta
					name='description'
					content='Best pizza shop in town'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
					type='image/x-icon'
				/>
			</Head>
			<Featured />
			{admin ? <AddButton setClose={setClose} /> : null}
			<MenuList
				menuListItems={productsList}
				key={counter++}
			/>
			{!close && <Add setClose={setClose} />}
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;

	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}

	const res = await axios.get('http://localhost:800/api/products');
	return {
		props: {
			productsList: res.data,
			admin,
		},
	};
};
