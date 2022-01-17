//
const API_URL = 'v1';
const API_END_POINT_PLANETS = `${API_URL}/planets`;
const API_END_POINT_LAUNCHES = `${API_URL}/launches`;
console.log(API_END_POINT_LAUNCHES);

const httpGetPlanets = async () => {
	const response = await fetch(API_END_POINT_PLANETS);
	return await response.json();
};
// Load launches, sort by flight number, and return as JSON.
const httpGetLaunches = async () => {
	const response = await fetch(API_END_POINT_LAUNCHES);
	const sortedLaunches = await response.json();
	return sortedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
};
// Submit given launch data to launch system.
const httpSubmitLaunch = async launch => {
	try {
		return await fetch(API_END_POINT_LAUNCHES, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(launch),
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
};
// Delete launch with given ID.
const httpAbortLaunch = async id => {
	try {
		return await fetch(`${API_END_POINT_LAUNCHES}/${id}`, {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.log(error, 'error');
		return {
			ok: false,
		};
	}
};

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
