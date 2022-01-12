// built-in imports
import express from 'express';
// local imports
import { getAllPlanets } from './planets.controller.js';

// initialize router
const planetsRouter = express.Router();

// GET
planetsRouter.get('/planets', getAllPlanets);

export default planetsRouter;
