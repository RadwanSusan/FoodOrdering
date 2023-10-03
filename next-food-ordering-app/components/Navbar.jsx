import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ admin }) => {
	let quantity = useSelector((state) => state.cart?.quantity);
	const router = useRouter();

	if (quantity == undefined) {
		quantity = 0;
	}

	const isActive = (href) => router.pathname === href;

	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className={styles.container}>
			<button
				id='burger'
				className={styles.openMainNav}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className={styles.burger}></span>
			</button>
			<nav
				className={`${styles.mainNav} ${
					isOpen ? styles.mainNavIsOpen : ''
				}`}
				id='main-nav'
			>
				<ul>
					<li>
						<Link href='/'>
							<i>Homepage</i>
						</Link>
					</li>
					<li>
						<Link href='/products'>
							<i>Products</i>
						</Link>
					</li>
					<li>
						<Link href='#menu'>
							<i>Menu</i>
						</Link>
					</li>
					<li>
						<Link href='/contact'>
							<i>Contact</i>
						</Link>
					</li>
				</ul>
			</nav>

			<div className={[styles.item, styles.phone].join(' ')}>
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
						<li
							className={`${styles.listItem} ${
								isActive('/') ? styles.active : ''
							}`}
						>
							Homepage
						</li>
					</Link>
					<Link
						href='/'
						passHref
						aria-label='link to products page'
					>
						<li
							className={`${styles.listItem} ${
								isActive('/products') ? styles.active : ''
							}`}
						>
							Products
						</li>
					</Link>
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
					<Link
						href='#menu'
						passHref
						aria-label='link to menu page'
					>
						<li
							className={`${styles.listItem} ${
								isActive('/menu') ? styles.active : ''
							}`}
						>
							Menu
						</li>
					</Link>
					<Link
						href='/'
						passHref
						aria-label='link to contact page'
					>
						<li
							className={`${styles.listItem} ${
								isActive('/contact') ? styles.active : ''
							}`}
						>
							Contact
						</li>
					</Link>
				</ul>
			</div>
			<Link
				href='/orders'
				passHref
				aria-label='link to orders page'
				style={{ marginLeft: '20px' }}
			>
				<div className={styles.item}>
					<div className={styles.cart}>
						<Image
							src='/img/orders.svg'
							alt='orders'
							width={35}
							height={35}
							priority
						/>
					</div>
				</div>
			</Link>
			{admin && (
				<Link
					href='/admin'
					passHref
					aria-label='link to admin page'
					style={{ marginLeft: '20px' }}
				>
					<div className={styles.item}>
						<div className={styles.cart}>
							<Image
								src='/img/admin.svg'
								alt='admin'
								width={35}
								height={35}
								priority
							/>
						</div>
					</div>
				</Link>
			)}
			<Link
				href='/cart'
				passHref
				aria-label='link to cart page'
				style={{ marginLeft: '20px' }}
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
		</nav>
	);
};

export default Navbar;
