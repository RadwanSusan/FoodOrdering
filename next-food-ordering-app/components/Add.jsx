import { useState, useCallback, memo } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import MultiSelectDropdown from './MultiSelectDropdown';
import { IoClose } from 'react-icons/io5';
import useSWR, { mutate } from 'swr';

const Add = memo(({ setClose, productToEdit, onCancel }) => {
	const [product, setProduct] = useState(
		() =>
			productToEdit || {
				file: null,
				title: null,
				desc: null,
				prices: [null],
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

	const uploadFile = async (file) => {
		const data = new FormData();
		data.append('file', file);
		const uploadRes = await axios.post('/api/upload', data);
		return uploadRes.data.data;
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
				`${process.env.API_URL}/api/products/` + product._id,
				updatedProduct,
			);
			mutate(`${process.env.API_URL}/api/products`);
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

	const deletePrice = useCallback((index) => {
		setProduct((prevProduct) => {
			const newPrices = [...prevProduct.prices];
			newPrices.splice(index, 1);
			return { ...prevProduct, prices: newPrices };
		});
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
						{product.prices.map((price, index) => (
							<div key={index}>
								<input
									className={`${styles.input} ${styles.inputSm}`}
									type='number'
									placeholder={`Price ${index + 1}`}
									onChange={(e) => changePrice(e, index)}
									value={price}
								/>
								{product.prices.length !== 1 && (
									<button onClick={() => deletePrice(index)}>X</button>
								)}
							</div>
						))}
						{product.prices.length < 3 && (
							<button
								onClick={() =>
									setProduct((prevProduct) => ({
										...prevProduct,
										prices: [...prevProduct.prices, null],
									}))
								}
							>
								+
							</button>
						)}
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
