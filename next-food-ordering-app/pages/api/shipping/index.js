// import * as turf from '@turf/turf';
// import polygons from './polygons.json';

// const downtownPolygon = turf.polygon(polygons.downtownPolygon);
// const BuisnessBayPolygon = turf.polygon(polygons.BuisnessBayPolygon);

// const areaShippingCosts = {
// 	downtown: { polygon: downtownPolygon, cost: 30 },
// 	BusinessBay: { polygon: BuisnessBayPolygon, cost: 50 },
// };

// const getShippingCost = (distance) =>
// 	isNaN(distance) || distance < 0
// 		? 15
// 		: distance <= 5
// 		? 5
// 		: distance <= 10
// 		? 10
// 		: 20;

// export default async function handler(req, res) {
// 	const { customerLocation, restaurantAddress } = req.body;

// 	try {
// 		const point = turf.point([
// 			customerLocation.longitude,
// 			customerLocation.latitude,
// 		]);

// 		let shippingCost;

// 		const area = Object.values(areaShippingCosts).find((area) =>
// 			turf.booleanWithin(point, area.polygon),
// 		);

// 		if (area) {
// 			shippingCost = area.cost;
// 		} else {
// 			const from = turf.point([
// 				restaurantAddress.longitude,
// 				restaurantAddress.latitude,
// 			]);
// 			const to = point;
// 			const options = { units: 'kilometers' };
// 			const dist = turf.distance(from, to, options);
// 			shippingCost = getShippingCost(dist);
// 		}

// 		res.status(200).json({ shippingCost });
// 	} catch (error) {
// 		res.status(500).json({
// 			error: error.message,
// 		});
// 	}
// }
