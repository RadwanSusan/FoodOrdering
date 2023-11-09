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
import useTranslation from 'next-translate/useTranslation';
import { toArabic } from 'arabic-digits';
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
	const [imgSrc, setImgSrc] = useState(
		`${process.env.API_URL_MEDIA}${product.img}`,
	);
	const fallbackImg = `${process.env.API_URL_MEDIA}/images/LF-logo-1k.png`;
	const dispatch = useDispatch();
	const { t, lang } = useTranslation('common');

	useEffect(() => {
		const extrasObj = {};
		product.extraOptions.forEach((option) => {
			extrasObj[option._id] = false;
		});
		setCheckedExtras(extrasObj);
	}, [product]);

	const handleError = () => {
		setImgSrc(fallbackImg);
	};

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
				title:
					lang === 'en'
						? 'Please select a quantity greater than 0'
						: 'الرجاء تحديد الكمية الكافية أو أكبر من صفر',
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
				title:
					lang === 'en' ? 'Please select a size' : 'الرجاء تحديد الحجم',
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
			title:
				lang === 'en' ? 'Product added successfully' : 'تمت الاضافة بنجاح',
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
	const justifyContentStyle =
		product.prices.length === 1
			? { justifyContent: 'flex-start ' }
			: { justifyContent: 'space-around' };

	return (
		<>
			<Head>
				<title>
					{t('Lahmah&Fahmah')} |{' '}
					{lang === 'ar' ? product.title_ar : product.title}
				</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.left}>
					<div
						className={styles.imgContainer}
						onClick={() => setIsOpen(true)}
					>
						<Image
							src={imgSrc}
							alt='product-image'
							fill
							style={{ cursor: 'pointer', objectFit: 'contain' }}
							quality={85}
							priority
							onError={handleError}
						/>
						{isOpen && (
							<Lightbox
								open={isOpen}
								close={() => setIsOpen(false)}
								slides={[
									{
										src: `${process.env.API_URL_MEDIA}${product.img}`,
										alt: 'product-image',
									},
								]}
							/>
						)}
					</div>
				</div>
				<div className={styles.right}>
					<h1 className={styles.title}>
						{lang === 'ar' ? product.title_ar : product.title}
					</h1>
					<span className={styles.price}>
						{lang === 'ar' ? toArabic(price) : price} {t('AEDLONG')}
					</span>

					<p className={styles.desc}>
						{lang === 'ar' ? product.desc_ar : product.desc}
					</p>
					<h3 className={styles.choose}>{t('Choose the size')}</h3>
					<div
						className={styles.sizes}
						style={justifyContentStyle}
					>
						{product.prices.map((price, index) => (
							<div
								key={index}
								className={styles.size}
								onClick={() => handleSize(index)}
							>
								<Image
									src='/img/size.svg'
									alt='product-size'
									fill
								/>
								<span className={styles.number}>
									{lang === 'ar' ? toArabic(price) : price} {t('AED')}
								</span>
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
									id={lang === 'ar' ? option.text_ar : option.text}
									name={lang === 'ar' ? option.text_ar : option.text}
									className={styles.checkbox}
									checked={checkedExtras[option._id] || false}
									onChange={(e) => handleChange(e, option)}
								/>
								<label
									htmlFor={
										lang === 'ar' ? option.text_ar : option.text
									}
								>
									{lang === 'ar' ? option.text_ar : option.text}
								</label>
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
							{t('Add to Cart')}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const res = await axios.get(
		`${process.env.API_URL}/api/products/${params.id}`,
	);

	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59',
	);

	return {
		props: {
			product: res.data,
		},
	};
};

export default Product;
