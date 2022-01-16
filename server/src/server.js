// built-in libs
import http from 'http';
import dotenv from 'dotenv';

import app from './app.js';
dotenv.config();

import { MongoDbConnect } from './services/mongo.js';
//
import { loadPlanetsData } from './models/planets.model.js';
import { loadLaunchData } from './models/launches.model.js';

// Port for API
const PORT = process.env.PORT || 8000;

// Create server
const server = http.createServer(app);

// let the games begin ;-)
const startServer = async () => {
	await MongoDbConnect();
	// load planets data to use with app.
	await loadPlanetsData();
	// load spacex launch data
	await loadLaunchData();
	// listening for requests
	server.listen(PORT, () => {
		console.log(`API Server is listening on ${PORT}.....`);
	});
};
// Initialize the server.
startServer();
