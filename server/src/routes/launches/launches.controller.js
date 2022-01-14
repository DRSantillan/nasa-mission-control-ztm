import { getAllLaunches, addNewLaunch } from '../../models/launches.model.js';

const httpGetAllLaunches = (req, res) => {
	console.log(getAllLaunches());
	return res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
	let launch = req.body;

	//
	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.launchDate ||
		!launch.destination
	) {
		return res
			.status(400)
			.json({ error: 'Missing required launch property.' });
	}

	launch.launchDate = new Date(launch.launchDate);
	if (isNaN(launch.launchDate)) {
		return res.status(400).json({ error: 'Invalid Launch Date.' });
	}

	addNewLaunch(launch);
	return res.status(201).json(launch);
};

export { httpGetAllLaunches, httpAddNewLaunch };
