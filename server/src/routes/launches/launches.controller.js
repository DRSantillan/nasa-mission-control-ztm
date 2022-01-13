import { launches } from '../../models/launches.model.js';

const getAllLaunches = (req, res) => {
	console.log(launches);
	return res.status(200).json(Array.from(launches.values()));
};

export { getAllLaunches };
