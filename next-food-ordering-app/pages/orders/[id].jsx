import styles from '../../styles/Order.module.css';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { toArabic } from 'arabic-digits';

const Order = ({ order }) => {
	const status = order.status;
	const { t, lang } = useTranslation('common');

	const statusClass = (index) => {
		if (index - status < 1) return styles.done;
		if (index - status === 1) return styles.inProgress;
		if (index - status > 1) return styles.undone;
	};

	return (
		<>
			<Head>
				<title>{t('Lahmah&FahmahOrders')}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.left}>
					<div className={styles.row}>
						<table className={styles.table}>
							<thead className={styles.thead}>
								<tr className={styles.trTitle}>
									<th>{t('Order ID')}</th>
									<th>{t('Customer')}</th>
									<th>{t('Orderaddress')}</th>
									<th>{t('Ordertotal')}</th>
								</tr>
							</thead>
							<tbody className={styles.tbody}>
								<tr className={styles.tr}>
									<td>
										<span className={styles.id}>{order._id}</span>
									</td>
									<td>
										<span className={styles.name}>
											{order.customer}
										</span>
									</td>
									<td>
										<span className={styles.address}>
											{order.address}
										</span>
									</td>
									<td>
										<span className={styles.total}>
											{lang === 'en'
												? `${order.total} AED`
												: `${toArabic(order.total)} درهم إماراتي`}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className={styles.row}>
						<div className={statusClass(0)}>
							<Image
								src='/img/paid.svg'
								width={30}
								height={30}
								alt={t('Payment')}
							/>
							<span>{t('Payment')}</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(1)}>
							<Image
								src='/img/bake.svg'
								width={30}
								height={30}
								alt={t('Preparing')}
							/>
							<span>{t('Preparing')}</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(2)}>
							<Image
								src='/img/bike.svg'
								width={30}
								height={30}
								alt={t('On the way')}
							/>
							<span>{t('On the way')}</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
						<div className={statusClass(3)}>
							<Image
								src='/img/delivered.svg'
								width={30}
								height={30}
								alt={t('Delivered')}
							/>
							<span>{t('Delivered')}</span>
							<div className={styles.checkedIcon}>
								<Image
									className={styles.checkedIcon}
									src='/img/checked.svg'
									width={20}
									height={20}
									alt='checked'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.wrapper}>
						<h2 className={styles.title}>{t('CART TOTAL')}</h2>
						<div className={styles.totalText}>
							<b className={styles.totalTextTitle}>{t('TotalOrder')}</b>
							{lang === 'en'
								? `${order.total} AED`
								: `${toArabic(order.total)} درهم إماراتي`}
						</div>
						<button
							disabled
							className={styles.button}
						>
							{t('PAID')}
						</button>
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const res = await axios.get(
		`${process.env.API_URL}/api/orders/${params.id}`,
	);

	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59',
	);

	return {
		props: { order: res.data },
	};
};

export default Order;
