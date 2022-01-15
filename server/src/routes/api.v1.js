import express from 'express';
// LOCAL IMPORTS
import planetsRouter from './planets/planets.router.js';
import launchesRouter from './launches/launches.router.js';

const routerV1 = express.Router();

// ENDPOINTS /////
routerV1.use('/planets', planetsRouter);
routerV1.use('/launches', launchesRouter);

export default routerV1;
