import { useState } from 'react';
import styles from '../styles/ProductCard.module.css';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
	const [imgSrc, setImgSrc] = useState(
		`${process.env.API_URL_MEDIA}${product.img}`,
	);
	const fallbackImg = `${process.env.API_URL_MEDIA}/images/LF-logo-1k.png`;

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
					quality={100}
					placeholder='blur'
					blurDataURL={imgSrc}
					loading='lazy'
					width={300}
					height={300}
					onError={handleError}
				/>
				<h1 className={styles.title}>{product.title}</h1>
				<span className={styles.price}>{product.prices[0]} AED</span>
			</Link>
			<p className={styles.desc}>{product.desc}</p>
		</div>
	);
};

export default ProductCard;
