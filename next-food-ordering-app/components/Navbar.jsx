import Image from 'next/legacy/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
	let quantity = useSelector((state) => state.cart?.quantity);
	if (quantity == undefined) {
		quantity = 0;
	}
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<div className={styles.callButton}>
					<Image
						src='/img/phone.svg'
						alt='phone'
						width='32'
						height='32'
						priority
					/>
				</div>
				<div className={styles.texts}>
					<div className={styles.text}>ORDER NOW!</div>
					<a
						href='tel:+971(4)8811784'
						className={styles.text}
					>
						+971(4)8811784
					</a>
				</div>
			</div>
			<div className={styles.item}>
				<ul className={styles.list}>
					<Link
						href='/'
						passHref
						aria-label='link to homepage'
					>
						<li className={styles.listItem}>Homepage</li>
					</Link>
					<li className={styles.listItem}>Products</li>
					<Link
						href='/'
						passHref
						aria-label='link to homepage'
					>
						<Image
							src='/img/pme-svg-logo.svg'
							alt='restaurant logo'
							width={80}
							height={80}
							className={styles.DocumentLogo}
							priority
						/>
					</Link>
					<a
						href='#menu'
						className={styles.listItem}
					>
						Menu
					</a>
					<li className={styles.listItem}>Contact</li>
				</ul>
			</div>
			<Link
				href='/cart'
				passHref
				aria-label='link to cart page'
			>
				<div className={styles.item}>
					<div className={styles.cart}>
						<Image
							src='/img/cart.svg'
							alt='cart'
							width={30}
							height={30}
							priority
						/>
						<div className={styles.counter}>{quantity}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
