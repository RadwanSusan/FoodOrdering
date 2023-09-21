function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	let R = 6371;
	let dLat = deg2rad(lat2 - lat1);
	let dLon = deg2rad(lon2 - lon1);
	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c;
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

function getShippingCost(distance) {
	if (isNaN(distance) || distance < 0) {
		return 15;
	}
	if (distance <= 5) {
		return 5;
	}
	if (distance <= 10) {
		return 10;
	}
	return 15;
}

const geocode = async (location) => {
	const address = `${location.latitude},${location.longitude}`;
	const response = await fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
			address,
		)}&key=22102cdb72574035a4eeb1d0b732733b`,
	);

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	const data = await response.json();

	return data.results[0].geometry;
};

export default async function handler(req, res) {
	const { customerLocation, restaurantAddress } = req.body;

	try {
		const results = await Promise.all([
			geocode(customerLocation),
			geocode(restaurantAddress),
		]);

		const [customerAddress, restaurantLocation] = results;

		const distance = getDistanceFromLatLonInKm(
			restaurantLocation.lat,
			restaurantLocation.lng,
			customerAddress.lat,
			customerAddress.lng,
		);

		const shippingCost = getShippingCost(distance);

		res.status(200).json({ shippingCost });
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
}
