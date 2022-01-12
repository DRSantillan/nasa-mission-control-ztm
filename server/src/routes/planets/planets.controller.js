// local imports
import planets from '../../models/planets.model.js';
//
const getAllPlanets = (req, res) => {
	return res.status(200).json(planets);
};

export { getAllPlanets };
