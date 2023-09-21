import * as turf from '@turf/turf';
import distance from '@turf/distance';

const downtownPolygon = turf.polygon([
	[
		[55.27769447651647, 25.185299891700865],
		[55.27984815494111, 25.187708465661203],
		[55.281270395410104, 25.189390761976142],
		[55.28354597984011, 25.192304852371436],
		[55.28605545206321, 25.193425197379],
		[55.288625643768114, 25.194831642995794],
		[55.273490770555384, 25.20287724033362],
		[55.27097137315289, 25.202675020685263],
		[55.26878513127488, 25.20177341767662],
		[55.265827458676426, 25.198200355278487],
		[55.26715490012225, 25.194496402787024],
		[55.26813226756482, 25.19257560643014],
		[55.268972192711345, 25.190972616497362],
		[55.27248460695867, 25.18859573052741],
		[55.27769447651647, 25.185299891700865],
	],
]);

const BuisnessBayPolygon = turf.polygon([
	[
		[55.264807660969325, 25.19645400474603],
		[55.25374495986986, 25.184251055928982],
		[55.26788596345895, 25.17610243086304],
		[55.271066775156754, 25.17671962938067],
		[55.271684831353724, 25.17415620105234],
		[55.278189130111684, 25.17920605665779],
		[55.28420144988675, 25.182485545520507],
		[55.29186192395784, 25.183609770709097],
		[55.293516367145514, 25.18432887186266],
		[55.29351321220153, 25.18918610081643],
		[55.29258572108182, 25.192467920510254],
		[55.289192696976926, 25.194510876688028],
		[55.28554770798087, 25.192631925046555],
		[55.28427787073662, 25.192598748522585],
		[55.2811541471597, 25.18911801791144],
		[55.27752176138253, 25.185078773202903],
		[55.26826300682018, 25.191834664208812],
		[55.267518301637494, 25.19437668123885],
		[55.265825744098294, 25.195593313791676],
		[55.264807660969325, 25.19645400474603],
	],
]);

// const areaShippingCosts = {
// 	downtown: 30,
// 	BusinessBay: 50,
// };

// function getShippingCost(distance) {
// 	console.log(`🚀  file: shipping.js:132  distance =>`, distance);
// 	if (isNaN(distance) || distance < 0) {
// 		return 15;
// 	}
// 	if (distance <= 5) {
// 		return 5;
// 	}
// 	if (distance <= 10) {
// 		return 10;
// 	} else {
// 		return 20;
// 	}
// }

// export default async function handler(req, res) {
// 	const { customerLocation, restaurantAddress } = req.body;

// 	try {
// 		const point = turf.point([
// 			customerLocation.longitude,
// 			customerLocation.latitude,
// 		]);

// 		let shippingCost;

// 		if (turf.booleanWithin(point, downtownPolygon)) {
// 			shippingCost = areaShippingCosts.downtown;
// 		} else if (turf.booleanWithin(point, BuisnessBayPolygon)) {
// 			shippingCost = areaShippingCosts.BusinessBay;
// 		} else {
// 			const from = turf.point([
// 				restaurantAddress.longitude,
// 				restaurantAddress.latitude,
// 			]);
// 			const to = turf.point([
// 				customerLocation.longitude,
// 				customerLocation.latitude,
// 			]);
// 			const options = { units: 'kilometers' };
// 			const dist = distance(from, to, options);
// 			shippingCost = getShippingCost(dist);
// 		}

// 		res.status(200).json({ shippingCost });
// 	} catch (error) {
// 		res.status(500).json({
// 			error: error.message,
// 		});
// 	}
// }

const areaShippingCosts = {
	downtown: { polygon: downtownPolygon, cost: 30 },
	BusinessBay: { polygon: BuisnessBayPolygon, cost: 50 },
};

const getShippingCost = (distance) =>
	isNaN(distance) || distance < 0
		? 15
		: distance <= 5
		? 5
		: distance <= 10
		? 10
		: 20;

export default async function handler(req, res) {
	const { customerLocation, restaurantAddress } = req.body;

	try {
		const point = turf.point([
			customerLocation.longitude,
			customerLocation.latitude,
		]);

		let shippingCost;

		const area = Object.values(areaShippingCosts).find((area) =>
			turf.booleanWithin(point, area.polygon),
		);

		if (area) {
			shippingCost = area.cost;
		} else {
			const from = turf.point([
				restaurantAddress.longitude,
				restaurantAddress.latitude,
			]);
			const to = point;
			const options = { units: 'kilometers' };
			const dist = turf.distance(from, to, options);
			shippingCost = getShippingCost(dist);
		}

		res.status(200).json({ shippingCost });
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
}
