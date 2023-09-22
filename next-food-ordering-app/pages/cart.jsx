import styles from '../styles/Cart.module.css';
import Image from 'next/legacy/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
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
			};
			const res = await axios.post(
				'http://localhost:800/api/orders',
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
				});
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Order Failed',
					showConfirmButton: false,
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
										<Image
											src={product.img}
											layout='fill'
											objectFit='cover'
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
										${product.price}
									</span>
								</td>
								<td>
									<span className={styles.quantity}>
										{product.quantity}
									</span>
								</td>
								<td>
									<span className={styles.total}>
										${product.price * product.quantity}
									</span>
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
						<b className={styles.totalTextTitle}>Subtotal:</b>$
						{cart.total}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount:</b>$0.00
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Total:</b>${cart.total}
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
								PAY WITH STRIPE
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

export default Cart;
