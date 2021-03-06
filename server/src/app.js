// BUILT-IN LIBRARIES
import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import routerV1 from './routes/api.v1.js';

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
app.use(express.static('public'));

// API EndPoint versioned
app.use('/v1', routerV1);

// give the client the index.html without having to type it in manually
app.get('/*', (req, res) => {
	return res.sendFile(path.join(path.resolve('public'), 'index.html'));
});

export default app;
