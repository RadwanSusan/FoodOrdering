import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
	throw new Error(
		'Please define the MONGO_URL environment variable inside .env.local',
	);
}

let cachedConnection = null;

async function dbConnect() {
	if (cachedConnection) {
		console.log('Using cached database connection');
		return cachedConnection;
	}

	console.log('Creating new database connection');
	const connectionOptions = {
		bufferCommands: false,
	};

	cachedConnection = mongoose
		.connect(mongoUrl, connectionOptions)
		.then(() => mongoose);

	return cachedConnection;
}

export default dbConnect;
