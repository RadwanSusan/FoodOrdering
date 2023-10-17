import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import Swal from 'sweetalert2';
import 'yet-another-react-lightbox/styles.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
	ssr: false,
});

const Product = ({ product }) => {
	const [price, setPrice] = useState(product.prices[0]);
	const [size, setSize] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [extras, setExtras] = useState([]);
	const [checkedExtras, setCheckedExtras] = useState({});
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const extrasObj = {};
		product.extraOptions.forEach((option) => {
			extrasObj[option._id] = false;
		});
		setCheckedExtras(extrasObj);
	}, [product]);

	const changePrice = (number) => {
		setPrice((prevPrice) => prevPrice + number);
	};

	const handleSize = (sizeIndex) => {
		const oldPrice = product.prices[size];
		setSize(sizeIndex);
		const newPrice = product.prices[sizeIndex];
		changePrice(newPrice - oldPrice);
	};

	const handleChange = (e, option) => {
		const checked = e.target.checked;
		setCheckedExtras((prev) => ({ ...prev, [option._id]: checked }));
		if (checked) {
			changePrice(option.price);
			setExtras((prev) => [...prev, option]);
		} else {
			changePrice(-option.price);
			setExtras(extras.filter((extra) => extra._id !== option._id));
		}
	};

	const handleClick = () => {
		if (quantity <= 0) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Please select a quantity greater than 0',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
			return;
		}

		if (size === null) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Please select a size',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
			return;
		}

		dispatch(
			addProduct({
				...product,
				extras,
				price,
				category: product.category,
				quantity,
			}),
		);

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Product added',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});

		const resetExtras = { ...checkedExtras };
		Object.keys(resetExtras).forEach((key) => {
			resetExtras[key] = false;
		});
		setCheckedExtras(resetExtras);
		setExtras([]);
		setSize(0);
		setPrice(product.prices[0]);
		setQuantity(1);
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
					<div
						className={styles.imgContainer}
						onClick={() => setIsOpen(true)}
					>
						<Image
							src={`http://31.170.165.239:3000${product.img}`}
							alt='product-image'
							fill
							style={{ cursor: 'pointer', objectFit: 'contain' }}
							quality={90}
							placeholder='blur'
							blurDataURL={`http://31.170.165.239:3000${product.img}`}
							loading='lazy'
						/>
						{isOpen && (
							<Lightbox
								open={isOpen}
								close={() => setIsOpen(false)}
								slides={[
									{ src: 'http://31.170.165.239:3000' + product.img },
								]}
							/>
						)}
					</div>
				</div>
				<div className={styles.right}>
					<h1 className={styles.title}>{product.title}</h1>
					<span className={styles.price}>{price} AED</span>
					<p className={styles.desc}>{product.desc}</p>
					<h3 className={styles.choose}>Choose the size</h3>
					<div className={styles.sizes}>
						{product.prices.map((price, index) => (
							<div
								key={index}
								className={styles.size}
								onClick={() => handleSize(index)}
							>
								<Image
									src='/img/size.png'
									alt='product-size'
									fill
								/>
								<span className={styles.number}>{`${price} AED`}</span>
							</div>
						))}
					</div>
					{product.extraOptions.length > 0 && (
						<h3 className={styles.choose}>
							Choose additional ingredients
						</h3>
					)}
					<div className={styles.ingredients}>
						{product.extraOptions.map((option) => (
							<div
								className={styles.option}
								key={option._id}
							>
								<input
									type='checkbox'
									id={option.text}
									name={option.text}
									className={styles.checkbox}
									checked={checkedExtras[option._id] || false}
									onChange={(e) => handleChange(e, option)}
								/>
								<label htmlFor={option.text}>{option.text}</label>
							</div>
						))}
					</div>
					<div className={styles.add}>
						<input
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value >= 1) {
									setQuantity(value);
								}
							}}
							type='number'
							value={quantity}
							min='1'
							className={styles.quantity}
						/>
						<button
							className={styles.button}
							onClick={handleClick}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(
		`http://31.170.165.239:765/api/products/${params.id}`,
	);
	return {
		props: {
			product: res.data,
		},
	};
};

export default Product;
