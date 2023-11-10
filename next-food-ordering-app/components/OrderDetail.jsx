import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';
import Swal from 'sweetalert2';
import { IoClose } from 'react-icons/io5';
import * as turf from '@turf/turf';
import polygons from '../pages/api/shipping/polygons.json';
import useTranslation from 'next-translate/useTranslation';
import { toArabic } from 'arabic-digits';

const OrderDetail = ({ total, createOrder, cart, setCash }) => {
	const [customer, setCustomer] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [userLocation, setUserLocation] = useState(null);
	const { t, lang } = useTranslation('common');

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

		Swal.fire({
			title: lang === 'en' ? 'Loading...' : 'جاري التحميل...',
			icon: 'info',
			allowOutsideClick: false,
			showConfirmButton: false,
			showCancelButton: false,
			showLoaderOnConfirm: true,
			timerProgressBar: true,
			timer: 3000,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		let customerLocation = userLocation;
		const response = await fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
				address,
			)}&key=22102cdb72574035a4eeb1d0b732733b`,
		).catch(() => {
			Swal.fire({
				icon: 'error',
				title: lang === 'en' ? 'Oops...' : 'عذرا',
				text:
					lang === 'en' ? 'Failed to fetch location!' : 'فشل جلب العنوان!',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
		});

		if (!response.ok) {
			Swal.fire({
				icon: 'error',
				title: lang === 'en' ? 'Oops...' : 'عذرا',
				text:
					lang === 'en' ? 'Invalid location entered!' : 'ادخل موقع صحيح!',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}

		const data = await response.json();

		if (data.results.length === 0) {
			Swal.fire({
				icon: 'error',
				title: lang === 'en' ? 'Oops...' : 'عذرا',
				text:
					lang === 'en' ? 'Invalid location entered!' : 'ادخل موقع صحيح!',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}

		if (
			data.results[0].components._type === 'city' ||
			data.results[0].components._type === 'town'
		) {
			Swal.fire({
				icon: 'info',
				title: lang === 'en' ? 'Oops...' : 'عذرا',
				text:
					lang === 'en'
						? 'Please enter a specific location, not just a general area!'
						: 'الرجاء إدخال موقع محدد، وليس فقط منطقة عامة!',
				showConfirmButton: true,
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}

		customerLocation = data.results[0].geometry;

		const dubaiPolygon = turf.polygon(polygons.dubaiPolygon);

		const point = turf.point([customerLocation.lng, customerLocation.lat]);

		if (!turf.booleanWithin(point, dubaiPolygon)) {
			Swal.fire({
				icon: 'error',
				title: lang === 'en' ? 'Delivery unavailable' : 'التوصيل غير متوفر',
				text:
					lang === 'en'
						? 'We cannot deliver to your address.'
						: 'لا يمكن توصيل لعنوانك.',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}

		const response2 = await fetch('/api/shipping', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				customerLocation: {
					latitude: customerLocation.lat,
					longitude: customerLocation.lng,
				},
				restaurantAddress: {
					latitude: 25.17284825914021,
					longitude: 55.33018138630277,
				},
			}),
		}).catch(() =>
			Swal.fire({
				icon: 'error',
				title: lang === 'en' ? 'Oops...' : 'عذرا',
				text:
					lang === 'en' ? 'Failed to fetch shipping!' : 'فشل جلب التوصيل!',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			}),
		);

		const data2 = await response2.json();
		const { shippingCost } = data2;

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
			showLoaderOnConfirm: true,
		}).then((result) => {
			if (result.isConfirmed) {
				const deviceId = localStorage.getItem('deviceId');
				createOrder({
					customer,
					address,
					phone,
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

	const getLocation = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					setUserLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					const response = await fetch(
						`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=22102cdb72574035a4eeb1d0b732733b`,
					);
					const data = await response.json();
					setAddress(data.results[0].formatted);
				},
				(error) => {
					Swal.fire({
						icon: 'error',
						title: lang === 'en' ? 'Oops...' : 'عذرا',
						text:
							lang === 'en'
								? 'It seems like you have denied location permissions. Please allow location permissions to automatically get your location.'
								: 'يبدو أنك رفضت أذونات الموقع. يرجى السماح لأذونات الموقع بالحصول على موقعك تلقائيًا.',
						showConfirmButton: false,
						timer: 5000,
						timerProgressBar: true,
					});
				},
			);
		} else {
			Swal.fire({
				icon: 'error',
				title: lang === 'en' ? 'Oops...' : 'عذرا',
				text:
					lang === 'en'
						? 'Geolocation is not supported by this browser.'
						: 'تحديد الموقع الجغرافي غير مدعوم من هذا المتصفح.',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
		}
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
						<input
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
						<input
							type='text'
							placeholder={
								lang === 'en'
									? '+971(50)0000000'
									: 'رقم الهاتف الخاص بك'
							}
							className={styles.input}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className={styles.item}>
						<label
							className={styles.label}
							style={{ color: 'black' }}
						>
							{lang === 'en' ? 'Address' : 'العنوان'}
						</label>
						<textarea
							rows={5}
							placeholder={
								lang === 'en' ? 'Enter your address' : 'ادخل عنوانك'
							}
							type='text'
							className={styles.textarea}
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>
					<div className={styles.item}>
						<button
							className={styles.button}
							onClick={() => getLocation()}
						>
							{lang === 'en' ? 'Get Location' : 'الحصول على موقع'}
						</button>
						<br />
						<button
							className={styles.button}
							disabled={
								!customer && (!address || !userLocation) && !phone
							}
							onClick={handleClick}
						>
							{lang === 'en' ? 'Confirm' : 'تأكيد'}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderDetail;
