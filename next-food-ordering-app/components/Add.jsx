import { useState, useCallback, memo } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import MultiSelectDropdown from './MultiSelectDropdown';
import { IoClose } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { toArabic } from 'arabic-digits';

const Add = memo(({ setClose, productToEdit, onCancel }) => {
	const [product, setProduct] = useState(
		() =>
			productToEdit || {
				file: '',
				title: '',
				desc: '',
				prices: [''],
				extraOptions: [],
				extra: '',
				category: '',
			},
	);

	const [extra, setExtra] = useState({ text: '', text_ar: '', price: '' });
	const { t, lang } = useTranslation('common');

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
		if (
			extra.text.trim() !== '' &&
			extra.text_ar.trim() !== '' &&
			extra.price.trim() !== ''
		) {
			setProduct((prevProduct) => ({
				...prevProduct,
				extraOptions: [...prevProduct.extraOptions, extra],
			}));
			setExtra({ text: '', text_ar: '', price: '' });
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
				title_ar: product.title_ar,
				desc: product.desc,
				desc_ar: product.desc_ar,
				prices: product.prices,
				extraOptions: product.extraOptions,
				img: url,
				category: product.category,
			};
			await createProduct(newProduct);
			setClose(true);
			onCancel();
			showSuccessMessage(lang === 'en' ? 'Product Added' : 'تمت الاضافة');
		} catch (err) {
			showErrorMessage(lang === 'en' ? 'Something went wrong' : 'حدث خطأ');
		}
	}, [
		product,
		setClose,
		showErrorMessage,
		showSuccessMessage,
		onCancel,
		lang,
	]);

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
				title_ar: product.title_ar,
				desc: product.desc,
				desc_ar: product.desc_ar,
				prices: product.prices,
				extraOptions: product.extraOptions,
				img: url,
				category: product.category,
			};
			await axios.put(
				`${process.env.API_URL}/api/products/` + product._id,
				updatedProduct,
			);
			setClose(true);
			onCancel();
			showSuccessMessage(
				lang === 'en' ? 'Product Updated' : 'تم تحديث المنتج',
			);
		} catch (err) {
			showErrorMessage(lang === 'en' ? 'Something went wrong' : 'حدث خطأ');
		}
	}, [
		product,
		setClose,
		showErrorMessage,
		showSuccessMessage,
		onCancel,
		lang,
	]);

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
				{productToEdit ? (
					<h1>{t('Edit Product')}</h1>
				) : (
					<h1>{t('Add Product')}</h1>
				)}
				<div className={styles.item}>
					<label className={styles.label}>{t('Choose an image')}</label>
					<input
						type='file'
						onChange={(e) =>
							setProduct({ ...product, file: e.target.files[0] })
						}
						accept='image/*'
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Title')}</label>
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
					<label className={styles.label}>{t('TitleArabic')}</label>
					<input
						className={styles.input}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, title_ar: e.target.value })
						}
						value={product.title_ar}
						style={{ direction: 'rtl' }}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Desc')}</label>
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
					<label className={styles.label}>{t('DescArabic')}</label>
					<textarea
						rows={4}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, desc_ar: e.target.value })
						}
						value={product.desc_ar}
						style={{ direction: 'rtl' }}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Prices')}</label>
					<div className={styles.priceContainer}>
						{product.prices.map((price, index) => (
							<div key={index}>
								<input
									className={`${styles.input} ${styles.inputSm}`}
									type='number'
									placeholder={lang === 'ar' ? 'السعر' : 'Price'}
									onChange={(e) => changePrice(e, index)}
									value={price}
									name='price'
									min='0'
								/>
								{product.prices.length !== 1 && (
									<button onClick={() => deletePrice(index)}>
										<AiOutlineClose size={17} />
									</button>
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
								className={styles.button2}
							>
								<AiOutlinePlus size={17} />
							</button>
						)}
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Extra')}</label>
					<div className={styles.extra}>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='text'
							placeholder={lang === 'ar' ? 'العنصر بالانجليزية' : 'Item'}
							name='text'
							onChange={handleExtraInput}
							value={extra.text}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='text'
							placeholder={
								lang === 'ar' ? 'العنصر بالعربية' : 'Item (Arabic)'
							}
							name='text_ar'
							onChange={handleExtraInput}
							value={extra.text_ar}
							style={{ direction: 'rtl' }}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type='number'
							placeholder={lang === 'ar' ? 'السعر' : 'Price'}
							name='price'
							onChange={handleExtraInput}
							value={extra.price}
						/>
						<button
							className={styles.extraButton}
							onClick={handleExtra}
						>
							{t('Add option')}
						</button>
					</div>
					<div className={styles.extraItems}>
						{product.extraOptions.map((option, index) => (
							<div
								key={index}
								className={styles.extraItem}
							>
								<span>
									{option.text} | {option.text_ar} |{' '}
									{lang === 'ar'
										? toArabic(option.price)
										: option.price}{' '}
									{t('AED')}
								</span>
								<button
									className={styles.extraItemRemove}
									onClick={() => handleDeleteExtra(option)}
								>
									<AiOutlineClose size={15} />
								</button>
							</div>
						))}
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Category')}</label>
					<MultiSelectDropdown
						onChange={handleCategoryChange}
						value={product.category}
					/>
				</div>
				<button
					className={styles.addButton}
					onClick={productToEdit ? handleUpdate : handleCreate}
				>
					{productToEdit ? t('Update') : t('Create')}
				</button>
			</div>
		</div>
	);
});
Add.displayName = 'Add';
export default Add;
