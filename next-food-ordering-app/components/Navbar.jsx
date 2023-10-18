// import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useInstallPrompt from './useInstallPrompt';

const Navbar = ({ admin }) => {
	let quantity = useSelector((state) => state.cart?.quantity);
	const { prompt } = useInstallPrompt();

	if (quantity == undefined) {
		quantity = 0;
	}

	const handleInstallClick = () => {
		console.log(prompt);
		if (!prompt) return;
		prompt.prompt();
		prompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the install prompt');
			} else {
				console.log('User dismissed the install prompt');
			}
		});
	};

	// const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className={styles.container}>
			{/* The Burger Menu Button */}
			{/* <button
				id='burger'
				className={styles.openMainNav}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className={styles.burger}></span>
			</button> */}
			{/* <nav
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
			</nav> */}
			<div className={[styles.item, styles.phone].join(' ')}>
				<div className={styles.callButton}>
					<Image
						src='/img/phone-white.svg'
						alt='phone'
						width='32'
						height='32'
						priority
					/>
				</div>
				<div className={styles.texts}>
					<div className={styles.text}>ORDER NOW!</div>
					<a
						href='tel:+971(04) 280 1585'
						className={styles.text}
					>
						+971(04)2801585
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
						<Image
							src='/img/lahmahAndFahmah/logo.png'
							alt='restaurant logo'
							width={80}
							height={80}
							className={styles.DocumentLogo}
							priority
						/>
					</Link>
				</ul>
			</div>
			<Link
				href='/orders'
				passHref
				aria-label='link to orders page'
				className={styles.cartItem}
				style={{ marginLeft: '20px' }}
			>
				<div className={styles.item}>
					<div className={styles.cart}>
						<Image
							src='/img/pastOrders.svg'
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
								style={{ filter: 'invert(1)' }}
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
							src='/img/cart-black.svg'
							alt='cart'
							width={30}
							height={30}
							priority
						/>
						<div className={styles.counter}>{quantity}</div>
					</div>
				</div>
			</Link>
			<div className={styles.item}>
				<button onClick={handleInstallClick}>Install App</button>
			</div>
		</nav>
	);
};

export default Navbar;
