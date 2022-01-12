import express from 'express';

//
import planetsRouter from './routes/planets/planets.router.js';

// init express
const app = express();


// middleware
app.use(express.json());

// endpoints
app.use(planetsRouter);

export default app;
