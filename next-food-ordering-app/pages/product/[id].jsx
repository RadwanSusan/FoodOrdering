import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
		<div className={styles.container}>
			<div className={styles.left}>
				<div
					className={styles.imgContainer}
					onClick={() => setIsOpen(true)}
				>
					<Image
						src={`http://31.170.165.239:3000/${product.img}`}
						alt='product-image'
						width={600}
						height={400}
						style={{ cursor: 'pointer', objectFit: 'contain' }}
						quality={90}
						placeholder='blur'
						blurDataURL={`http://31.170.165.239:3000/${product.img}`}
						loading='lazy'
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
				<span className={styles.price}>{price} AED</span>
				<p className={styles.desc}>{product.desc}</p>
				<h3 className={styles.choose}>Choose the size</h3>
				<div className={styles.sizes}>
					<div
						className={styles.size}
						onClick={() => handleSize(0)}
					>
						<Image
							src='/img/size.png'
							alt='product-size'
							fill
						/>
						<span className={styles.number}>Small</span>
					</div>
					<div
						className={styles.size}
						onClick={() => handleSize(1)}
					>
						<Image
							src='/img/size.png'
							alt='product-size'
							fill
						/>
						<span className={styles.number}>Medium</span>
					</div>
					<div
						className={styles.size}
						onClick={() => handleSize(2)}
					>
						<Image
							src='/img/size.png'
							alt='product-size'
							fill
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
