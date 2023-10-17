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

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [open, setOpen] = useState(false);
	const [cash, setCash] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

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
				'http://31.170.165.239:765/api/orders',
				orderData,
			);
			if (res.status === 201) {
				dispatch(reset());
				router.push(`/orders/${res.data._id}`);
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Order Placed',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Order Failed',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			}
		} catch (err) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Order Failed',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
		}
	};

	const handleRemoveFromCart = (product) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(removeFromCart(product.uniqueId));
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Item Removed',
					text: 'This item has been removed from cart',
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
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1'
				/>
				<title>Lahmah & Fahmah</title>
				<meta
					name='description'
					content='Best PWA app in the world!'
				/>
				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>
				<link
					rel='mask-icon'
					href='/icons/mask-icon.svg'
					color='#FFFFFF'
				/>
				<meta
					name='theme-color'
					content='#ffffff'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/touch-icon-iphone.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='152x152'
					href='/icons/touch-icon-ipad.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/icons/touch-icon-iphone-retina.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='167x167'
					href='/icons/touch-icon-ipad-retina.png'
				/>
				<link
					rel='manifest'
					href='/manifest.json'
				/>
				<meta
					name='twitter:card'
					content='summary'
				/>
				<meta
					name='twitter:url'
					content='https://yourdomain.com'
				/>
				<meta
					name='twitter:title'
					content='My awesome PWA app'
				/>
				<meta
					name='twitter:description'
					content='Best PWA app in the world!'
				/>
				<meta
					name='twitter:image'
					content='/icons/twitter.png'
				/>
				<meta
					name='twitter:creator'
					content='@DavidWShadow'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:title'
					content='My awesome PWA app'
				/>
				<meta
					property='og:description'
					content='Best PWA app in the world!'
				/>
				<meta
					property='og:site_name'
					content='My awesome PWA app'
				/>
				<meta
					property='og:url'
					content='https://yourdomain.com'
				/>
				<meta
					property='og:image'
					content='/icons/og.png'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_2048.png'
					sizes='2048x2732'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1668.png'
					sizes='1668x2224'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1536.png'
					sizes='1536x2048'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1125.png'
					sizes='1125x2436'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_1242.png'
					sizes='1242x2208'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_750.png'
					sizes='750x1334'
				/>
				<link
					rel='apple-touch-startup-image'
					href='/images/apple_splash_640.png'
					sizes='640x1136'
				/>
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
			<div className={styles.container}>
				<div className={styles.left}>
					<table className={styles.table}>
						<tbody>
							<tr className={styles.trTitle}>
								<th>Product</th>
								<th>Name</th>
								<th>Extras</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
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
												src={`http://31.170.165.239:3000${product.img}`}
												width={200}
												height={150}
												style={{ objectFit: 'contain' }}
												alt='product-image'
												loading='lazy'
												placeholder='blur'
												blurDataURL={`http://31.170.165.239:3000${product.img}`}
												quality={90}
											/>
										</div>
									</td>
									<td>
										<span className={styles.name}>
											{product.title}
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
											{product.price} AED
										</span>
									</td>
									<td>
										<span className={styles.quantity}>
											{product.quantity}
										</span>
									</td>
									<td>
										<span className={styles.total}>
											{product.price * product.quantity} AED
										</span>
									</td>
									<td>
										<button
											onClick={() => handleRemoveFromCart(product)}
										>
											X
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className={styles.right}>
					<div className={styles.wrapper}>
						<h2 className={styles.title}>CART TOTAL</h2>
						<div className={styles.totalText}>
							<b className={styles.totalTextTitle}>Total:</b>
							{cart.total} AED
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
												title: 'Cart is empty',
												showConfirmButton: false,
												timer: 3000,
												timerProgressBar: true,
											});
										setCash(true);
									}}
								>
									CASH ON DELIVERY
								</button>
								<CheckoutRedirectButton
									disabled={cart.total === 0}
									amount={cart.total * 100}
									currency='aed'
									cart={cart}
								>
									PAY WITH CREDIT/DEBIT CARD
								</CheckoutRedirectButton>
							</div>
						) : (
							<button
								onClick={() => {
									if (cart.total === 0)
										return Swal.fire({
											position: 'center',
											icon: 'info',
											title: 'Cart is empty',
											showConfirmButton: false,
											timer: 3000,
											timerProgressBar: true,
										});
									setOpen(true);
								}}
								className={styles.button}
							>
								CHECKOUT NOW!
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

	return {
		props: {
			admin,
		},
	};
};

export default Cart;
