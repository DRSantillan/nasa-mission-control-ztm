import mongoose from 'mongoose';

// MONGO_DB Connection
const MONGO_DB_URL =
	'mongodb+srv://nasa-api:5savVYyE98wGfsP@nasacluster.cbrcj.mongodb.net/nasa-db?retryWrites=true&w=majority';
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
}

export { MongoDbConnect, MongoDbDisconnect };
