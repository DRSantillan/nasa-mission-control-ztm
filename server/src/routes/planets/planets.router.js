// built-in imports
import express from 'express';
// local imports
import { httpGetAllPlanets } from './planets.controller.js';
const ROUTE = '/'
// initialize router
const planetsRouter = express.Router();

// GET
planetsRouter.get(ROUTE, httpGetAllPlanets);

export default planetsRouter;
