import Image from 'next/legacy/image';
import styles from '../styles/ProductCard.module.css';
import Link from 'next/link';

const ProductCard = ({ product }) => {
	return (
		<div className={styles.container}>
			<Link
				href={`/product/${product._id}`}
				passHref
				aria-label='link to product'
			>
				<Image
					src={product.img}
					alt=''
					width='500'
					height='500'
				/>
			</Link>
			<h1 className={styles.title}>{product.title}</h1>
			<span className={styles.price}>${product.prices[0]}</span>
			<p className={styles.desc}>{product.desc}</p>
		</div>
	);
};

export default ProductCard;
