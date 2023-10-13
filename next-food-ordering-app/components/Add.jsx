import { useState, useCallback, memo } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import MultiSelectDropdown from './MultiSelectDropdown';
import { IoClose } from 'react-icons/io5';

const Add = memo(({ setClose, productToEdit, onCancel }) => {
	const [product, setProduct] = useState(
		() =>
			productToEdit || {
				file: null,
				title: null,
				desc: null,
				prices: [],
				extraOptions: [],
				extra: null,
				category: null,
			},
	);

	const [extra, setExtra] = useState({ text: '', price: '' });

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
		setExtra((prevExtra) => ({
			...prevExtra,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const handleExtra = useCallback(() => {
		if (extra.text.trim() !== '' && extra.price.trim() !== '') {
			setProduct((prevProduct) => ({
				...prevProduct,
				extraOptions: [...prevProduct.extraOptions, extra],
			}));
			setExtra({ text: '', price: '' });
		}
	}, [extra]);

	// const uploadFile = async (file) => {
	// 	const data = new FormData();
	// 	data.append('file', file);
	// 	const uploadRes = await axios.post(
	// 		'http://31.170.165.239:765/api/upload',
	// 		data,
	// 	);
	// 	return uploadRes.data.files.file[0].url;
	// };
	const uploadFile = async (file) => {
		const data = new FormData();
		data.append('file', file);
		const uploadRes = await axios.post('/api/upload', data);
		return uploadRes.data.data;
	};

	const createProduct = async (product) => {
		await axios.post('http://31.170.165.239:765/api/products', product);
	};
	const showSuccessMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: message,
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});
	}, []);

	const showErrorMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: message,
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
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
			onCancel();
			showSuccessMessage('Product Added');
		} catch (err) {
			showErrorMessage('Something went wrong');
		}
	}, [product, setClose, showErrorMessage, showSuccessMessage, onCancel]);

	const handleUpdate = useCallback(async () => {
		try {
			let url;
			if (product.file) {
				url = await uploadFile(product.file);
			} else {
				url = product.img;
			}
			const updatedProduct = {
				_id: product._id,
				title: product.title,
				desc: product.desc,
				prices: product.prices,
				extraOptions: product.extraOptions,
				img: url,
				category: product.category,
			};
			await axios.put(
				'http://31.170.165.239:765/api/products/' + product._id,
				updatedProduct,
			);
			setClose(true);
			onCancel();
			showSuccessMessage('Product Updated');
		} catch (err) {
			showErrorMessage('Something went wrong');
		}
	}, [product, setClose, showErrorMessage, showSuccessMessage, onCancel]);

	const handleDeleteExtra = useCallback((optionToDelete) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			extraOptions: prevProduct.extraOptions.filter(
				(option) => option !== optionToDelete,
			),
		}));
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span
					onClick={() => {
						setClose(true);
						onCancel();
					}}
					className={styles.close}
				>
					<IoClose
						size={23}
						color='white'
					/>
				</span>
				{productToEdit ? <h1>Edit Product</h1> : <h1>Add Product</h1>}
				<div className={styles.item}>
					<label className={styles.label}>Choose an image</label>
					<input
						type='file'
						onChange={(e) =>
							setProduct({ ...product, file: e.target.files[0] })
						}
						accept='image/*'
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
						value={product.title}
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
						value={product.desc}
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
							value={product.prices[0]}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder='Medium'
							onChange={(e) => changePrice(e, 1)}
							value={product.prices[1]}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder='Large'
							onChange={(e) => changePrice(e, 2)}
							value={product.prices[2]}
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
							value={extra.text}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder='Price'
							name='price'
							id='extra2'
							onChange={handleExtraInput}
							value={extra.price}
						/>
						<button
							className={styles.extraButton}
							onClick={handleExtra}
						>
							Add option
						</button>
					</div>
					<div className={styles.extraItems}>
						{product.extraOptions.map((option, index) => (
							<div
								key={index}
								className={styles.extraItem}
							>
								<span>{option.text}</span>
								<button onClick={() => handleDeleteExtra(option)}>
									X
								</button>
							</div>
						))}
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Category</label>
					<MultiSelectDropdown
						onChange={handleCategoryChange}
						value={product.category}
					/>
				</div>
				<button
					className={styles.addButton}
					onClick={productToEdit ? handleUpdate : handleCreate}
				>
					{productToEdit ? 'Update' : 'Create'}
				</button>
			</div>
		</div>
	);
});
Add.displayName = 'Add';
export default Add;
