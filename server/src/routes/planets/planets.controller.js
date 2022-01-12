// local imports
import {planets} from '../../models/planets.model.js';
//
const getAllPlanets = (req, res) => {
	console.log(planets)
	return res.status(200).json(planets);
};

export { getAllPlanets };
