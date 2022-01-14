import express from 'express';
//
import {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbortLaunch,
} from './launches.controller.js';
//
const ROUTE = '/';
//
const launchesRouter = express.Router();
//
launchesRouter.get(ROUTE, httpGetAllLaunches);
launchesRouter.post(ROUTE, httpAddNewLaunch);
launchesRouter.delete(`${ROUTE}:id`, httpAbortLaunch);

export default launchesRouter;
