import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';
import Swal from 'sweetalert2';
import { IoClose } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';
import { toArabic } from 'arabic-digits';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Input,
} from '@mui/material';
import areasData from './CityArea.json';

const OrderDetail = ({ total, createOrder, cart, setCash }) => {
	const [customer, setCustomer] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const { t, lang } = useTranslation('common');
	const [area, setArea] = useState('');

	const handleAreaChange = (event) => {
		setArea(event.target.value);
	};

	const handleClick = async () => {
		if (!address) {
			Swal.fire({
				icon: 'error',
				title: lang === 'en' ? 'Oops...' : 'عذرا',
				text: lang === 'en' ? 'Enter address!' : 'ادخل العنوان!',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}

		const shippingCost =
			areasData.areas.find((data) => data.name === area)?.shippingCost || 0;
		const newTotal = total + shippingCost;
		Swal.fire({
			title: 'Shipping Cost',
			text:
				lang === 'en'
					? `The shipping cost is ${shippingCost} AED. The new total is ${newTotal} AED. Confirm order?`
					: `تأكيد الطلب؟ التوصيل هو ${toArabic(
							shippingCost,
					  )} درهم إماراتي المبلغ الجديد الإجمالي هو ${toArabic(
							newTotal,
					  )} درهم أماراتي`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			showLoaderOnConfirm: false,
		}).then((result) => {
			if (result.isConfirmed) {
				const deviceId = localStorage.getItem('deviceId');
				createOrder({
					customer,
					address: address + '-' + area,
					phone: parseInt(phone),
					total: newTotal,
					method: 'Cash on Delivery',
					cart: JSON.stringify(cart.products),
					deviceId: deviceId,
					shippingCost: shippingCost || 0,
				})
					.then(() => {
						Swal.fire({
							icon: 'success',
							title: 'Order created',
							text: 'Your order has been created successfully!',
							showConfirmButton: false,
							timer: 3000,
							timerProgressBar: true,
						});
						setCash(false);
					})
					.catch((error) => {
						Swal.fire({
							icon: 'error',
							title: 'Order failed, please try again',
							text: error,
							showConfirmButton: false,
							timer: 5000,
							timerProgressBar: true,
						});
					});
			} else if (result.isDismissed) {
				Swal.fire({
					icon: 'info',
					title: 'Order cancelled',
					text: 'You have cancelled the order.',
					showConfirmButton: false,
					timer: 5000,
					timerProgressBar: true,
				});
			}
		});
	};

	return (
		<>
			<div className={styles.container}>
				<span
					className={styles.closeButton}
					onClick={() => setCash(false)}
				>
					<IoClose
						size={23}
						color='white'
					/>
				</span>
				<div className={styles.wrapper}>
					<h1
						className={styles.title}
						style={{ color: 'black' }}
					>
						{lang === 'en'
							? `Your total is ${total} AED`
							: 'المبلغ الإجمالي هو ' + toArabic(total) + ' درهم '}
					</h1>
					<div className={styles.item}>
						<label
							className={styles.label}
							style={{ color: 'black' }}
						>
							{lang === 'en' ? 'Full Name' : 'الاسم الكامل'}
						</label>
						<Input
							placeholder={
								lang === 'en' ? 'Enter your name' : 'ادخل اسمك'
							}
							type='text'
							className={styles.input}
							onChange={(e) => setCustomer(e.target.value)}
						/>
					</div>
					<div className={styles.item}>
						<label
							className={styles.label}
							style={{ color: 'black' }}
						>
							{lang === 'en' ? 'Phone Number' : 'رقم الهاتف'}
						</label>
						<PhoneInput
							country='ae'
							value={phone}
							onChange={setPhone}
							autoFormat
							enableSearch
						/>
					</div>
					<div className={styles.item}>
						<label
							className={styles.label}
							style={{ color: 'black' }}
						>
							{lang === 'en' ? 'Area' : 'المنطقة'}
						</label>
						<FormControl>
							<InputLabel
								id='area-label'
								style={{ lineHeight: 0.9 }}
							>
								{lang === 'en' ? 'Select Area' : 'اختر المنطقة'}
							</InputLabel>
							<Select
								labelId='area-label'
								id='area-select'
								value={area}
								onChange={handleAreaChange}
								style={{ padding: '0px', height: 45 }}
							>
								{areasData.areas.map((area) => (
									<MenuItem
										key={area.name}
										value={lang === 'en' ? area.name : area.name_ar}
										style={{
											padding: '5px',
											fontSize: '14px',
										}}
									>
										{lang === 'en' ? area.name : area.name_ar}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div className={styles.item}>
						<label
							className={styles.label}
							style={{ color: 'black' }}
						>
							{lang === 'en' ? 'Address' : 'العنوان'}
						</label>
						<Input
							type='text'
							placeholder={
								lang === 'en'
									? 'Enter your street and building name'
									: 'ادخل الشارع واسم المبنى'
							}
							className={styles.input}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>
					<button
						className={styles.button}
						disabled={!customer || !phone || !address}
						onClick={handleClick}
					>
						{lang === 'en' ? 'Confirm' : 'تأكيد'}
					</button>
				</div>
			</div>
		</>
	);
};

export default OrderDetail;
