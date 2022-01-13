// built-in imports
import express from 'express';
// local imports
import { httpGetAllPlanets } from './planets.controller.js';

// initialize router
const planetsRouter = express.Router();

// GET
planetsRouter.get('/planets', httpGetAllPlanets);

export default planetsRouter;
