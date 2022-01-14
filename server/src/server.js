// built-in libs
import http from 'http';
import app from './app.js';

import { loadPlanetsData } from './models/planets.model.js';



// Port for API
const PORT = process.env.PORT || 8000;

// MONGO_DB Connection
const MONGO_DB_URL =
	'mongodb+srv://nasa-api:5savVYyE98wGfsP@nasacluster.cbrcj.mongodb.net/nasa-db?retryWrites=true&w=majority';
// Create server
const server = http.createServer(app);

const startServer = async () => {
	
	await loadPlanetsData();
	// listening for requests
	server.listen(PORT, () => {
		console.log(`API Server is listening on ${PORT}.....`);
	});
};

startServer();
