import launchesMongoDB from './launches.schema.js';
import planets from './planets.schema.js';

//
const DEFAULT_FLIGHT_NO = 99;
//
// const launch = {
// 	flightNumber: 100,
// 	mission: 'Kepler Exploration X',
// 	rocket: 'Explorer IS1',
// 	launchDate: new Date('December 23, 2039'),
// 	target: 'Kepler-442-b',
// 	customers: ['ZTM', 'NASA'],
// 	upcoming: true,
// 	success: true,
// };

//
const existsLaunchWithId = async id => {
	try {
		return await launchesMongoDB.exists({ flightNumber: id });
	} catch (error) {
		console.error(
			`We were unable to check if the Flight #${id} exists due to the following error: ${error}`
		);
	}
};
//
const abortLaunchById = async id => {
	try {
		const query = { flightNumber: id };
		const update = { success: false, upcoming: false };
		const abortedLaunch = await launchesMongoDB.updateOne(query, update);
		return abortedLaunch.modifiedCount === 1;
	} catch (error) {
		console.error(
			`The Flight #${id} was not aborted due to this error: ${error}`
		);
	}
};
//
const getAllLaunches = async () => {
	try {
		return await launchesMongoDB.find({}, { _id: 0, __v: 0 });
	} catch (error) {
		console.log(
			`We were unable to retrieve a list of upcoming Launches due to this error: ${error}`
		);
	}
};

const getLatestFlightNumber = async () => {
	try {
		const latestLaunchNo = await launchesMongoDB
			.findOne({})
			.sort('-flightNumber');

		if (!latestLaunchNo) return DEFAULT_FLIGHT_NO;
		return latestLaunchNo.flightNumber;
	} catch (error) {
		console.log(
			`There was a problem get the latest Flight Number: ${error}`
		);
	}
};

const saveLaunch = async launch => {
	try {
		const planet = await planets
			.findOne({}, { keplerName: launch.target })
			.exec();

		if (!planet) {
			throw new Error('No matching planet.');
		}

		return await launchesMongoDB.findOneAndUpdate(
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

const scheduleNewLaunch = async launch => {
	try {
		const newFlightNumber = (await getLatestFlightNumber()) + 1;
		const newLaunch = Object.assign(launch, {
			success: true,
			upcoming: true,
			customers: ['Zero To Mastery', 'NASA'],
			flightNumber: newFlightNumber,
		});
		await saveLaunch(newLaunch);
	} catch (error) {
		console.error(
			`We were unable to schedule your new launch: ${launch.mission} 
			due to the following error: ${error}`
		);
	}
};
//

//saveLaunch(launch);
export {
	getAllLaunches,
	existsLaunchWithId,
	abortLaunchById,
	scheduleNewLaunch,
};
