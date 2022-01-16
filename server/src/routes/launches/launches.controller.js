import {
	getAllLaunches,
	scheduleNewLaunch,
	existsLaunchWithId,
	abortLaunchById,
} from '../../models/launches.model.js';

import { getPagination } from '../../services/query.js';
// Retrieve all launches to the client
const httpGetAllLaunches = async (req, res) => {
	console.log(req.query);
	const { skip, limit } = getPagination(req.query);
	const launches = await getAllLaunches(skip, limit);
	return res.status(200).json(launches);
};
// add a user generated launch to the db
const httpAddNewLaunch = async (req, res) => {
	const launch = req.body;

	// Checking to see if the fields have been filled in
	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.launchDate ||
		!launch.target
	) {
		// if not return an error message to the client
		return res
			.status(400)
			.json({ error: 'Missing required launch property.' });
	}
	// Date Validation
	launch.launchDate = new Date(launch.launchDate);
	if (isNaN(launch.launchDate)) {
		return res.status(400).json({ error: 'Invalid Launch Date.' });
	}

	// Everything is good so add the launch to the array and return to client
	await scheduleNewLaunch(launch);
	return res.status(201).json(launch);
};

const httpAbortLaunch = async (req, res) => {
	const launchId = Number(req.params.id);
	const existsLaunch = await existsLaunchWithId(launchId);

	if (!existsLaunch) {
		return res.status(400).json({ error: 'Launch was not found.' });
	}

	const aborted = await abortLaunchById(launchId);
	if (!aborted) {
		return res.status(400).json({ error: 'Launch not aborted' });
	}
	return res.status(201).json({ message: 'Launch has been aborted;-(' });
};

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
