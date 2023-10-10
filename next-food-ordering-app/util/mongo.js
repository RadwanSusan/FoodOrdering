import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
	throw new Error(
		'Please define the MONGO_URL environment variable inside .env.local',
	);
}

let cachedConnection = null;
let connectionPromise = null;

async function dbConnect() {
	if (cachedConnection) {
		console.log('Using cached database connection');
		return cachedConnection;
	}

	if (connectionPromise) {
		console.log('Waiting for existing database connection');
		await connectionPromise;
		console.log('Using existing database connection');
		return cachedConnection;
	}

	console.log('Creating new database connection');
	const connectionOptions = {
		bufferCommands: false,
	};

	connectionPromise = mongoose.connect(mongoUrl, connectionOptions);
	cachedConnection = await connectionPromise;
	connectionPromise = null;

	return cachedConnection;
}

export default dbConnect;
