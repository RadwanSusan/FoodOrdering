import styles from '../styles/ProductCard.module.css';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
	return (
		<div className={styles.container}>
			<Link
				href={`/product/${product._id}`}
				passHref
				aria-label='link to product'
				style={{ textAlign: 'center' }}
			>
				<Image
					src={`http://31.170.165.239:3000${product.img}`}
					alt='product-image'
					width='250'
					height='250'
					style={{ borderRadius: '8px', objectFit: 'cover' }}
					quality={90}
					placeholder='blur'
					blurDataURL={product.img}
					loading='lazy'
				/>
				<h1 className={styles.title}>{product.title}</h1>
				<span className={styles.price}>{product.prices[0]} AED</span>
			</Link>
			<p className={styles.desc}>{product.desc}</p>
		</div>
	);
};

export default ProductCard;
