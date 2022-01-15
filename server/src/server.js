// built-in libs
import http from 'http';
import app from './app.js';
import mongoose from 'mongoose';

import { loadPlanetsData } from './models/planets.model.js';
import { triggerAsyncId } from 'async_hooks';

// Port for API
const PORT = process.env.PORT || 8000;

// MONGO_DB Connection
const MONGO_DB_URL =
	'mongodb+srv://nasa-api:5savVYyE98wGfsP@nasacluster.cbrcj.mongodb.net/nasa-db?retryWrites=true&w=majority';
mongoose.connection.on('open', () => {
	console.log('MongoDB connection is ready...');
});
mongoose.connection.on('error', error => {
	console.error(error);
});

// Create server
const server = http.createServer(app);

// let the games begin ;-)
const startServer = async () => {
	// db connection to atlas mongo db
	await mongoose.connect(MONGO_DB_URL);
	// load planets data to use with app.
	await loadPlanetsData();
	// listening for requests
	server.listen(PORT, () => {
		console.log(`API Server is listening on ${PORT}.....`);
	});
};
// Initialize the server.
startServer();
