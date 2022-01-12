// BUILT-IN LIBRARIES
import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

// LOCAL IMPORTS
import planetsRouter from './routes/planets/planets.router.js';

// initialize express
const app = express();

// MIDDLEWARE //////
// this is always a must if requesting data from another server.
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(morgan('combined'));
// tell the app that you want to process everything in a json format.
app.use(express.json());
// serving react app public build statically within the server project
app.use(express.static(path.join(path.resolve('public'))));

// ENDPOINTS /////
app.use(planetsRouter);
// give the client the index.html without having to type it in manually
app.get('/', (req, res) => {
	res.sendFile(path.joing(path.resolve('public')), 'index.html');
});

export default app;
