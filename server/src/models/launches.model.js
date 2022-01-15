import launchesMongoDB from './launches.schema.js';
import planets from './planets.schema.js';
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
// launches.set(launch.flightNumber, launch);
//


//
const existsLaunchWithId = id => {
	return launches.has(id);
};
//
const abortLaunchById = id => {
	const aborted = launches.get(id);
	aborted.upcoming = false;
	aborted.success = false;

	return aborted;
};
//
const getAllLaunches = async () => {
	//return Array.from(launches.values());
	return await launchesMongoDB.find({}, { '_id': 0, '__v': 0 });
};

//

const saveLaunch = async launch => {
	try {
		const planet = await planets.findOne({},{ 'keplerName': launch.target}).exec()
		console.log(planet)
		if(!planet) {
			throw new Error('No matching planet.')
		}
		
		await launchesMongoDB.updateOne(
			{
				flightNumber: launch.flightNumber,
			},
			launch,
			{ upsert: true }
		);
	} catch (error) {
		console.error(`Could not save launch: ${error}`);
	}
};
//
saveLaunch(launch)
//
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

export { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById };
