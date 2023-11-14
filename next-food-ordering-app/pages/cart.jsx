import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset, removeFromCart } from '../redux/cartSlice';
import OrderDetail from '../components/OrderDetail';
import Swal from 'sweetalert2';
import { CheckoutRedirectButton } from '../components/StripeButton';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { toArabic } from 'arabic-digits';
import { IoMdClose } from 'react-icons/io';

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [open, setOpen] = useState(false);
	const [cash, setCash] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();
	const { t, lang } = useTranslation('common');

	const [imgSrcs, setImgSrcs] = useState(
		cart.products.reduce((obj, product) => {
			obj[product._id] = `${process.env.API_URL_MEDIA}${product.img}`;
			return obj;
		}, {}),
	);

	const fallbackImg = `${process.env.API_URL_MEDIA}/images/LF-logo-1k.png`;

	const handleError = (id) => {
		setImgSrcs((prev) => ({ ...prev, [id]: fallbackImg }));
	};
	const createOrder = async (data) => {
		try {
			const orderData = {
				customer: data.customer,
				address: data.address,
				total: data.total,
				method: data.method,
				cart: data.cart,
				phone_number: data.phone,
				deviceId: localStorage.getItem('deviceId'),
				shippingCost: data.shippingCost,
			};
			const res = await axios.post(
				`${process.env.API_URL}/api/orders`,
				orderData,
			);
			if (res.status === 201) {
				await axios
					.post('/api/twilio', {
						to: `${data.phone}`,
						body: 'Your order has been placed successfully',
					})
					.then(() => {
						dispatch(reset());
						router.push(`/orders/${res.data._id}`);
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: lang === 'en' ? 'Order Success' : 'تم الطلب بنجاح',
							showConfirmButton: false,
							timer: 3000,
							timerProgressBar: true,
						});
					})
					.catch(() => {
						dispatch(reset());
						router.push(`/orders/${res.data._id}`);
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: lang === 'en' ? 'Order Success' : 'تم الطلب بنجاح',
							showConfirmButton: false,
							timer: 3000,
							timerProgressBar: true,
						});
					});
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: lang === 'en' ? 'Order Failed' : 'فشل الطلب',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			}
		} catch (err) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: lang === 'en' ? 'Order Failed' : 'فشل الطلب',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
		}
	};

	const handleRemoveFromCart = (product) => {
		Swal.fire({
			title: lang === 'en' ? 'Are you sure?' : 'هل انت متأكد؟',
			text:
				lang === 'en'
					? "You won't be able to revert this!"
					: 'لن تتمكن من التراجع من هذه العملية',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: lang === 'en' ? 'Yes, delete it!' : 'نعم',
			cancelButtonText: lang === 'en' ? 'No, cancel' : 'لا ، الغاء',
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(removeFromCart(product.uniqueId));
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: lang === 'en' ? 'Item Removed' : 'تم الحذف بنجاح',
					text:
						lang === 'en'
							? 'This item has been removed from cart'
							: 'تمت العملية بنجاح',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			}
		});
	};

	return (
		<>
			<Head>
				<title>
					{t('Lahmah&Fahmah')} | {t('Cart')}
				</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.left}>
					<table className={styles.table}>
						<tbody>
							<tr className={styles.trTitle}>
								<th>{t('Product')}</th>
								<th>{t('Name')}</th>
								<th>{t('Extras')}</th>
								<th>{t('Price')}</th>
								<th>{t('Quantity')}</th>
								<th>{t('Total')}</th>
							</tr>
						</tbody>
						<tbody>
							{cart.products.map((product) => (
								<tr
									className={styles.tr}
									key={
										Date.now().toString(36) +
										Math.random().toString(36).substr(2)
									}
								>
									<td>
										<div className={styles.imgContainer}>
											<Image
												src={imgSrcs[product._id]}
												width={200}
												height={150}
												style={{ objectFit: 'contain' }}
												alt='product-image'
												loading='lazy'
												placeholder='blur'
												blurDataURL={imgSrcs[product._id]}
												quality={85}
												onError={() => handleError(product._id)}
											/>
										</div>
									</td>
									<td>
										<span className={styles.name}>
											{lang === 'en'
												? product.title
												: product.title_ar}
										</span>
									</td>
									<td>
										<span className={styles.extras}>
											{product.extras.map((extra) => (
												<span key={extra._id}>{extra.text}, </span>
											))}
										</span>
									</td>
									<td>
										<span className={styles.price}>
											{lang === 'ar' ? (
												toArabic(product.price) + ' د.إ'
											) : (
												<>{product.price} AED</>
											)}
										</span>
									</td>
									<td>
										<span className={styles.quantity}>
											{lang === 'ar' ? (
												toArabic(product.quantity)
											) : (
												<>{product.quantity}</>
											)}
										</span>
									</td>
									<td>
										<span className={styles.total}>
											{lang === 'ar' ? (
												toArabic(product.price * product.quantity) +
												' د.إ'
											) : (
												<>{product.price * product.quantity} AED</>
											)}
										</span>
									</td>
									<td>
										<button
											className={styles.removeIcon}
											onClick={() => handleRemoveFromCart(product)}
										>
											<IoMdClose size={23} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className={styles.right}>
					<div className={styles.wrapper}>
						<h2 className={styles.title}>{t('CART TOTAL')}</h2>
						<div className={styles.totalText}>
							<b className={styles.totalTextTitle}>{t('TotalCart')}</b>
							{lang === 'ar' ? (
								toArabic(cart.total) + ' د.إ'
							) : (
								<>{cart.total} AED</>
							)}
						</div>
						{open ? (
							<div className={styles.paymentMethods}>
								<button
									className={styles.payButton}
									onClick={() => {
										if (cart.total === 0)
											return Swal.fire({
												position: 'center',
												icon: 'info',
												title:
													lang === 'en'
														? 'Cart is empty'
														: 'عربة التسوق فارغة',
												showConfirmButton: false,
												timer: 3000,
												timerProgressBar: true,
											});
										setCash(true);
									}}
								>
									{t('CASH ON DELIVERY')}
								</button>
								<CheckoutRedirectButton
									disabled={cart.total === 0}
									amount={cart.total * 100}
									currency='aed'
									cart={cart}
								>
									{t('PAY WITH CREDIT/DEBIT CARD')}
								</CheckoutRedirectButton>
							</div>
						) : (
							<button
								onClick={() => {
									if (cart.total === 0)
										return Swal.fire({
											position: 'center',
											icon: 'info',
											title:
												lang === 'en'
													? 'Cart is empty'
													: 'عربة التسوق فارغة',
											showConfirmButton: false,
											timer: 3000,
											timerProgressBar: true,
										});
									setOpen(true);
								}}
								className={styles.button}
							>
								{t('CHECKOUT NOW!')}
							</button>
						)}
					</div>
				</div>
				{cash && (
					<OrderDetail
						total={cart.total}
						createOrder={createOrder}
						cart={cart}
						setCash={setCash}
					/>
				)}
			</div>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;

	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}

	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59',
	);

	return {
		props: {
			admin,
		},
	};
};

export default Cart;
