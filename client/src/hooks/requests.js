//
const API_URL = 'http://localhost:8000';

const httpGetPlanets = async () => {
	const API_END_POINT = `${API_URL}/planets`;
	
		const response = await fetch(API_END_POINT);
		return await response.json();
};

const httpGetLaunches = async () => {
	// TODO: Once API is ready.
	// Load launches, sort by flight number, and return as JSON.
};

const httpSubmitLaunch = async () => {
	// TODO: Once API is ready.
	// Submit given launch data to launch system.
};

const httpAbortLaunch = async id => {
	// TODO: Once API is ready.
	// Delete launch with given ID.
};

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
