//
import axios from 'axios';
import launchesMongoDB from './launches.schema.js';
import planets from './planets.schema.js';

//
const DEFAULT_FLIGHT_NO = 99;

// SpaceX API Url
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const populateSpaceXLaunches = async () => {
	const response = await axios.post(SPACEX_API_URL, {
		query: {},
		options: {
			pagination: false,
			populate: [
				{
					path: 'rocket',
					select: { name: 1 },
				},
				{
					path: 'payloads',
					select: { customers: 1 },
				},
			],
		},
	});

	if (response.status !== 200) {
		console.log('There was a problem downloading launch data...');
		throw new Error('Launch data download failed...');
	}
	//
	const launchDocs = response.data.docs;

	for (const launchDoc of launchDocs) {
		const payloads = launchDoc['payloads'];

		const customers = payloads.flatMap(payload => {
			return payload.customers;
		});

		const launch = {
			flightNumber: launchDoc['flight_number'],
			mission: launchDoc['name'],
			rocket: launchDoc['rocket']['name'],
			launchDate: launchDoc['date_local'],
			upcoming: launchDoc['upcoming'],
			success: launchDoc['success'],
			customers,
		};

		console.log(`${launch.flightNumber} ${launch.mission}`);

		await saveLaunch(launch);
	}
};
const loadLaunchData = async () => {
	try {
		console.log('Downloading data from the Space X');

		const alreadyDownloadedData = await findLaunch({
			flightNumber: 1,
			rocket: 'Falcon 1',
			mission: 'FalconSat',
		});

		if (alreadyDownloadedData) {
			console.log('Launch Data has already been downloaded...');
		} else {
			await populateSpaceXLaunches();
		}
	} catch (error) {
		console.error(`The was a problem trying to load the launch data from
		SpaceX Database due to the following error: ${error}
			`);
	}
};

//
const findLaunch = async filter => {
	return await launchesMongoDB.findOne(filter);
};

//
const existsLaunchWithId = async id => {
	try {
		return await findLaunch({ flightNumber: id });
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
const getAllLaunches = async (skip, limit) => {
	try {
		return await launchesMongoDB
			.find({}, { _id: 0, __v: 0 })
			.sort({ flightNumber: 1 })
			.skip(skip)
			.limit(limit);
	} catch (error) {
		console.log(
			`We were unable to retrieve a list of upcoming Launches due to this error: ${error}`
		);
	}
};

//
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

//
const saveLaunch = async launch => {
	console.log(launch.flightNumber);
	try {
		await launchesMongoDB.findOneAndUpdate(
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
		const planet = await planets
			.findOne({}, { keplerName: launch.target })
			.exec();

		if (!planet) {
			throw new Error('No matching planet.');
		}
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

//saveLaunch(launch);
export {
	getAllLaunches,
	existsLaunchWithId,
	abortLaunchById,
	scheduleNewLaunch,
	loadLaunchData,
};
