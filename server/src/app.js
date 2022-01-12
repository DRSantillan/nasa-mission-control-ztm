import express from 'express';
import cors from 'cors';

//
import planetsRouter from './routes/planets/planets.router.js';

// init express
const app = express();

// middleware
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());

// endpoints
app.use(planetsRouter);

export default app;
