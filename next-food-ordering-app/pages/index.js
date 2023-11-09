import axios from 'axios';
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import Featured from '../components/Featured';
import MenuList from '../components/MenuList';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

export default function Home({ productsList, admin }) {
	const { t, lang } = useTranslation('common');
	const [close, setClose] = useState(true);
	let counter = 0;

	return (
		<>
			<Head>
				<title>{t('Lahmah&Fahmah')}</title>
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
		</>
	);
}

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;

	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}

	const res = await axios.get(`${process.env.API_URL}/api/products`);

	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59',
	);

	return {
		props: {
			productsList: res.data,
			admin,
		},
	};
};
