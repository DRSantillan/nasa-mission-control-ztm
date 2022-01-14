const launches = new Map();
//
let latestFlightNo = 100;
//
const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 23, 2039'),
	target: 'Kepler-442-b',
	customers: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};
//
launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
	return Array.from(launches.values());
};

const addNewLaunch = launch => {
	latestFlightNo++;
	launches.set(
		latestFlightNo,
		Object.assign(launch, {
			flightNumber: latestFlightNo,
			customers: ['Zero To Mastery', 'NASA'],
			upcoming: true,
			success: true,
		})
	);
};

export { getAllLaunches, addNewLaunch };
