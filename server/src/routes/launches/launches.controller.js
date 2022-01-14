import { getAllLaunches, addNewLaunch } from '../../models/launches.model.js';
// Retrieve all launches to the client
const httpGetAllLaunches = (req, res) => {
	return res.status(200).json(getAllLaunches());
};
// add a user generated launch to the db
const httpAddNewLaunch = (req, res) => {
	let launch = req.body;

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
	addNewLaunch(launch);
	return res.status(201).json(launch);
};

export { httpGetAllLaunches, httpAddNewLaunch };
