import { useState, useCallback, memo } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import MultiSelectDropdown from './MultiSelectDropdown';
import { IoClose } from 'react-icons/io5';

const Add = memo(({ setClose }) => {
	const [product, setProduct] = useState({
		file: null,
		title: null,
		desc: null,
		prices: [],
		extraOptions: [],
		extra: null,
		category: null,
	});

	const changePrice = useCallback((e, index) => {
		setProduct((prevProduct) => {
			const newPrices = [...prevProduct.prices];
			newPrices[index] = e.target.value;
			return { ...prevProduct, prices: newPrices };
		});
	}, []);

	const handleCategoryChange = useCallback((selectedOptions) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			category: selectedOptions.map((option) => option.value),
		}));
	}, []);

	const handleExtraInput = useCallback((e) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			extra: { ...prevProduct.extra, [e.target.name]: e.target.value },
		}));
	}, []);

	const handleExtra = useCallback(() => {
		setProduct((prevProduct) => ({
			...prevProduct,
			extraOptions: [...prevProduct.extraOptions, product.extra],
			extra: null,
		}));
	}, [product.extra]);

	const uploadFile = async (file) => {
		const data = new FormData();
		data.append('file', file);
		const uploadRes = await axios.post(
			`${process.env.API_URL}/api/upload`,
			data,
		);
		return uploadRes.data.files.file[0].url;
	};

	const createProduct = async (product) => {
		await axios.post(`${process.env.API_URL}/api/products`, product);
	};
	const showSuccessMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: message,
			showConfirmButton: false,
		});
	}, []);

	const showErrorMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: message,
			showConfirmButton: false,
		});
	}, []);

	const handleCreate = useCallback(async () => {
		try {
			const url = await uploadFile(product.file);
			const newProduct = {
				title: product.title,
				desc: product.desc,
				prices: product.prices,
				extraOptions: product.extraOptions,
				img: url,
				category: product.category,
			};
			await createProduct(newProduct);
			setClose(true);
			showSuccessMessage('Product Added');
		} catch (err) {
			showErrorMessage('Something went wrong');
		}
	}, [product, setClose, showErrorMessage, showSuccessMessage]);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span
					onClick={() => setClose(true)}
					className={styles.close}
				>
					<IoClose
						size={23}
						color='white'
					/>
				</span>
				<h1>Add a new Product</h1>
				<div className={styles.item}>
					<label className={styles.label}>Choose an image</label>
					<input
						type='file'
						onChange={(e) =>
							setProduct({ ...product, file: e.target.files[0] })
						}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Title</label>
					<input
						className={styles.input}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, title: e.target.value })
						}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Desc</label>
					<textarea
						rows={4}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, desc: e.target.value })
						}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Prices</label>
					<div className={styles.priceContainer}>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder='Small'
							onChange={(e) => changePrice(e, 0)}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder='Medium'
							onChange={(e) => changePrice(e, 1)}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder='Large'
							onChange={(e) => changePrice(e, 2)}
						/>
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Extra</label>
					<div className={styles.extra}>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='text'
							placeholder='Item'
							name='text'
							id='extra'
							onChange={handleExtraInput}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder='Price'
							name='price'
							id='extra2'
							onChange={handleExtraInput}
						/>
						<button
							className={styles.extraButton}
							onClick={handleExtra}
						>
							Add
						</button>
					</div>
					<div className={styles.extraItems}>
						{product.extraOptions.map((option) => (
							<span
								key={option.text}
								className={styles.extraItem}
							>
								{option.text}
							</span>
						))}
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Category</label>
					<MultiSelectDropdown onChange={handleCategoryChange} />
				</div>
				<button
					className={styles.addButton}
					onClick={handleCreate}
				>
					Create
				</button>
			</div>
		</div>
	);
});
Add.displayName = 'Add';
export default Add;
