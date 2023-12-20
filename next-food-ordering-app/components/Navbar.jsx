import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import englishFlag from '../public/img/en.svg';
import arabicFlag from '../public/img/ar.svg';
const Navbar = ({ admin }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	let quantity = useSelector((state) => state.cart?.quantity);
	const { t, lang } = useTranslation('common');

	if (quantity == undefined) {
		quantity = 0;
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<nav className={styles.container}>
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
					<div className={styles.text}>{t('orderNow')}</div>
					<a
						href='tel:+971(04) 280 1585'
						className={styles.text}>
						{t('phoneNumber')}
					</a>
				</div>
			</div>
			<div className={styles.item}>
				<div className={styles.list}>
					<Link
						href='/'
						passHref
						aria-label='link to homepage'>
						<Image
							src='/img/lahmahAndFahmah/logo.png'
							alt='restaurant logo'
							width={80}
							height={80}
							className={styles.DocumentLogo}
							priority
						/>
					</Link>
				</div>
			</div>
			<div className={styles.item}>
				<Button
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleClick}
					startIcon={
						<Image
							src={lang === 'en' ? englishFlag : arabicFlag}
							alt={lang.toUpperCase()}
							width={25}
							height={25}
						/>
					}
					sx={{
						color: 'black',
					}}>
					{lang.toUpperCase()}
				</Button>
				<Menu
					id='simple-menu'
					aria-labelledby='simple-menu'
					role='menu'
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								left: 'calc(100% - 93px)',
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}>
					<MenuItem onClick={handleClose}>
						<div
							style={{ display: 'flex', alignItems: 'center' }}
							onClick={async () => await setLanguage('en')}>
							<Image
								className='flag'
								src={englishFlag}
								alt='English'
								width={30}
								height={30}
								style={{ marginRight: '10px' }}
							/>
							English
						</div>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
							onClick={async () => await setLanguage('ar')}>
							<Image
								className='flag'
								src={arabicFlag}
								alt='Arabic'
								width={30}
								height={30}
								style={{ marginRight: '10px' }}
							/>
							العربية
						</div>
					</MenuItem>
				</Menu>
			</div>
			<div className={styles.item}>
				<Link
					href='/orders'
					passHref
					aria-label='link to orders page'
					className={styles.cartItem}>
					<div className={styles.cart}>
						<Image
							src='/img/pastOrders.svg'
							alt='orders'
							width={35}
							height={35}
							priority
						/>
					</div>
				</Link>
			</div>
			<div className={styles.item}>
				<Link
					href='/cart'
					passHref
					aria-label='link to cart page'
					className='cartItem'>
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
				</Link>
			</div>
			{admin && (
				<div className={styles.item}>
					<Link
						href='/admin'
						passHref
						aria-label='link to admin page'
						style={{ marginLeft: '20px' }}>
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
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
