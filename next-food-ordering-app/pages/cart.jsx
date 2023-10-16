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
										<img
											src={product.img}
											width={200}
											height={150}
											style={{ objectFit: 'contain' }}
											alt='product-image'
										/>
									</div>
								</td>
								<td>
									<span className={styles.name}>{product.title}</span>
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
