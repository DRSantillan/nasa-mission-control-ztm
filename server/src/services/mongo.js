import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// MONGO_DB Connection
const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connection.on('open', () => {
	console.log('MongoDB connection is ready...');
});
mongoose.connection.on('error', error => {
	console.error(error);
});

// db connection to atlas mongo db
const MongoDbConnect = async () => {
	await mongoose.connect(MONGO_DB_URL);
};

//
const MongoDbDisconnect = async () => {
	await mongoose.disconnect();
};

export { MongoDbConnect, MongoDbDisconnect };
