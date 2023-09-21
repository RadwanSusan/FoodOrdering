import styles from '../../styles/Product.module.css';
import Image from 'next/legacy/image';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import Swal from 'sweetalert2';
import 'yet-another-react-lightbox/styles.css';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
	ssr: false,
});

const Product = ({ product }) => {
	const [price, setPrice] = useState(product.prices[0]);
	const [size, setSize] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [extras, setExtras] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const changePrice = (number) => {
		setPrice(price + number);
	};

	const handleSize = (sizeIndex) => {
		const difference = product.prices[sizeIndex] - product.prices[size];
		setSize(sizeIndex);
		changePrice(difference);
	};

	const handleChange = (e, option) => {
		const checked = e.target.checked;
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
			});
			return;
		}

		if (size === null) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Please select a size',
				showConfirmButton: false,
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
		});

		setExtras([]);
		setSize(null);
		setPrice(product.prices[0]);
		setQuantity(1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div
					className={styles.imgContainer}
					onClick={() => setIsOpen(true)}
				>
					<Image
						src={product.img}
						objectFit='contain'
						layout='fill'
						alt='product-image'
						style={{ cursor: 'pointer' }}
						priority
					/>
					{isOpen && (
						<Lightbox
							open={isOpen}
							close={() => setIsOpen(false)}
							slides={[{ src: product.img }]}
						/>
					)}
				</div>
			</div>
			<div className={styles.right}>
				<h1 className={styles.title}>{product.title}</h1>
				<span className={styles.price}>${price}</span>
				<p className={styles.desc}>{product.desc}</p>
				<h3 className={styles.choose}>Choose the size</h3>
				<div className={styles.sizes}>
					<div
						className={styles.size}
						onClick={() => handleSize(0)}
					>
						<Image
							src='/img/size.png'
							layout='fill'
							alt='product-size'
						/>
						<span className={styles.number}>Small</span>
					</div>
					<div
						className={styles.size}
						onClick={() => handleSize(1)}
					>
						<Image
							src='/img/size.png'
							layout='fill'
							alt='product-size'
						/>
						<span className={styles.number}>Medium</span>
					</div>
					<div
						className={styles.size}
						onClick={() => handleSize(2)}
					>
						<Image
							src='/img/size.png'
							layout='fill'
							alt='product-size'
						/>
						<span className={styles.number}>Large</span>
					</div>
				</div>
				{product.extraOptions.length > 0 && (
					<h3 className={styles.choose}>Choose additional ingredients</h3>
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
								onChange={(e) => handleChange(e, option)}
							/>
							<label htmlFor={option.text}>{option.text}</label>
						</div>
					))}
				</div>
				<div className={styles.add}>
					<input
						onChange={(e) => setQuantity(e.target.value)}
						type='number'
						defaultValue={1}
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
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(
		`http://localhost:800/api/products/${params.id}`,
	);
	return {
		props: {
			product: res.data,
		},
	};
};

export default Product;
