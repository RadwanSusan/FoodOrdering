import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';
import Swal from 'sweetalert2';
import { IoClose } from 'react-icons/io5';
import * as turf from '@turf/turf';

const OrderDetail = ({ total, createOrder, cart, setCash }) => {
	const [customer, setCustomer] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [userLocation, setUserLocation] = useState(null);

	const handleClick = async () => {
		if (!address) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Please enter a location!',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}

		Swal.fire({
			title: 'Processing your order...',
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
				title: 'Oops...',
				text: 'Failed to fetch location!',
				showConfirmButton: false,
				timer: 5000,
				timerProgressBar: true,
			});
		});

		if (!response.ok) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Invalid location entered!',
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
				title: 'Oops...',
				text: 'Invalid location entered!',
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
				title: 'Oops...',
				text: 'Please enter a specific location, not just a general area!',
				showConfirmButton: true,
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}

		customerLocation = data.results[0].geometry;

		const dubaiPolygon = turf.polygon([
			[
				[54.89837411806178, 24.91100310065002],
				[55.024901931415, 24.86888299092834],
				[55.07702925325094, 24.791962093860946],
				[55.165808169337765, 24.851336140525532],
				[55.21073752112906, 24.899124983592586],
				[55.22817909584677, 24.931214235726657],
				[55.2421226877822, 24.982014915775707],
				[55.25529130568037, 24.998631659585953],
				[55.32139426004116, 25.05922906478395],
				[55.33321337079235, 25.022519625353524],
				[55.343266048365564, 24.98775979799663],
				[55.36642190734179, 24.950267354293672],
				[55.38905781895937, 24.95248082390046],
				[55.40664455802525, 24.963238532333378],
				[55.415755760192525, 24.97553190496474],
				[55.40092357061809, 24.98782404912707],
				[55.400287905350496, 24.9981945898939],
				[55.44711524672098, 25.02776502818797],
				[55.39160032806231, 25.087268281583675],
				[55.467215497578195, 25.14040731328224],
				[55.49767999405921, 25.16700269661662],
				[55.543352640876776, 25.20065486359836],
				[55.554596702510906, 25.213455656788057],
				[55.56614548261015, 25.238942718027772],
				[55.38630045825528, 25.302983199802966],
				[55.37699756011983, 25.298013327406238],
				[55.36769466198575, 25.2969938412144],
				[55.36149272989496, 25.300052274066616],
				[55.352450128442, 25.297863355730343],
				[55.3480164099108, 25.306005384870204],
				[55.34783572703725, 25.31431558322673],
				[55.353585705755705, 25.321830301365537],
				[55.35476341224114, 25.327841740128093],
				[55.34887487981675, 25.32615105314406],
				[55.292072143124386, 25.3587335024247],
				[55.1265908138042, 25.25261503362593],
				[54.87828762129854, 24.94756651286953],
				[54.89837411806178, 24.91100310065002],
			],
		]);

		const point = turf.point([customerLocation.lng, customerLocation.lat]);

		if (!turf.booleanWithin(point, dubaiPolygon)) {
			Swal.fire({
				icon: 'error',
				title: 'Delivery unavailable',
				text: 'We cannot deliver to your address.',
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
		}).catch((error) => console.error('Failed to fetch shipping:', error));

		const data2 = await response2.json();
		const { shippingCost } = data2;

		const newTotal = total + shippingCost;

		Swal.fire({
			title: 'Shipping Cost',
			text: `The shipping cost is $${shippingCost}. The new total is $${newTotal}. Confirm order?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			showLoaderOnConfirm: true,
		}).then((result) => {
			if (result.isConfirmed) {
				createOrder({
					customer,
					address,
					phone,
					total: newTotal,
					method: 'Cash on Delivery',
					cart: JSON.stringify(cart.products),
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
					console.error(
						'Error Code = ' + error.code + ' - ' + error.message,
					);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'It seems like you have denied location permissions. Please allow location permissions to automatically get your location.',
						showConfirmButton: false,
						timer: 5000,
						timerProgressBar: true,
					});
				},
			);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Geolocation is not supported by this browser.',
			});
		}
	};

	return (
		<>
			{setCash && (
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
						<h1 className={styles.title}>Your total is ${total}</h1>
						<div className={styles.item}>
							<label className={styles.label}>Name Surname</label>
							<input
								placeholder='Full Name'
								type='text'
								className={styles.input}
								onChange={(e) => setCustomer(e.target.value)}
							/>
						</div>
						<div className={styles.item}>
							<label className={styles.label}>Phone Number</label>
							<input
								type='text'
								placeholder='+971(50)0000000'
								className={styles.input}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<div className={styles.item}>
							<label className={styles.label}>Address</label>
							<textarea
								rows={5}
								placeholder='Po Box 17918 Jebel Ali Free Zone, Dubai, UAE'
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
								Get My Location
							</button>
							<br />
							<button
								className={styles.button}
								disabled={
									!customer && (!address || !userLocation) && !phone
								}
								onClick={handleClick}
							>
								Order
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OrderDetail;
