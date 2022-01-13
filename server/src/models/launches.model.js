const launches = new Map();
const launch = {
	flightNumber: 234,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 23, 2039'),
	destination: 'Kepler-442-b',
	customer: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
	return Array.from(launches.values());
};

export { getAllLaunches };
