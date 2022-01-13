import { getAllLaunches } from '../../models/launches.model.js';

const httpGetAllLaunches = (req, res) => {
	
	return res.status(200).json(getAllLaunches);
};

export { httpGetAllLaunches };
