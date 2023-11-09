import { useState } from 'react';
import styles from '../styles/ProductCard.module.css';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { toArabic } from 'arabic-digits';

const ProductCard = ({ product }) => {
	const [imgSrc, setImgSrc] = useState(
		`${process.env.API_URL_MEDIA}${product.img}`,
	);
	const fallbackImg = `${process.env.API_URL_MEDIA}/images/LF-logo-1k.png`;
	const { t, lang } = useTranslation('common');

	const handleError = () => {
		setImgSrc(fallbackImg);
	};

	return (
		<div className={styles.container}>
			<Link
				href={`/product/${product._id}`}
				passHref
				aria-label='link to product'
				style={{ textAlign: 'center' }}
			>
				<Image
					className={styles.productsImage}
					src={imgSrc}
					alt='product-image'
					style={{ borderRadius: '8px', objectFit: 'cover' }}
					quality={88}
					placeholder='blur'
					blurDataURL={imgSrc}
					loading='lazy'
					width={300}
					height={300}
					onError={handleError}
				/>
				<h1 className={styles.title}>
					{lang === 'ar' ? product.title_ar : product.title}
				</h1>
				<span className={styles.price}>
					{lang === 'ar' ? toArabic(product.prices[0]) : product.prices[0]}{' '}
					{t('AED')}
				</span>
			</Link>
			<p className={styles.desc}>
				{lang === 'ar' ? product.desc_ar : product.desc}
			</p>
		</div>
	);
};

export default ProductCard;
