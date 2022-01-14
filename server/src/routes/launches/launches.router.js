import express from 'express';
//
import { httpGetAllLaunches, httpAddNewLaunch } from './launches.controller.js';
//
const ROUTE = '/';
//
const launchesRouter = express.Router();
//
launchesRouter.get(ROUTE, httpGetAllLaunches);
launchesRouter.post(ROUTE, httpAddNewLaunch);

export default launchesRouter;
