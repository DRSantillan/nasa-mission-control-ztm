import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import planets from './planets.schema.js';

// init an array to hold our results
//const habitablePlanets = [];

// filter only confirmed planets
const isHabitablePlanet = planet =>
	planet['koi_disposition'] === 'CONFIRMED' &&
	planet['koi_insol'] > 0.36 &&
	planet['koi_insol'] < 1.11 &&
	planet['koi_prad'] < 1.6;

const loadPlanetsData = () => {
	const __dirname = path.resolve('data');
	const pathToDataFile = path.join(__dirname, 'kepler_data.csv');
	// create a stream to read the csv file on the hd.
	// provides us with an event emitter.
	const keplerStreamData = fs.createReadStream(pathToDataFile);

	// init the event emitter
	return new Promise((resolve, reject) => {
		keplerStreamData
			// piping takes a readable stream and gives it a function that is able to write
			.pipe(
				parse({
					comment: '#',
					columns: true,
				})
			)
			// data is the event we use to get the data
			// filter only planets that are confirmed
			.on('data', async data => {
				if (isHabitablePlanet(data)) {
					savePlanet(data);
				}
			})
			// close the stream I think and tell the use that the processing is
			// finished and then present the data.
			.on('end', async () => {
				const countPlanetsFound = (await getAllPlanets()).length;
				console.log(
					`${countPlanetsFound} habitable planets have been found!`
				);
				resolve();
			})
			.on('error', error => {
				console.log(error);
				reject();
			});
	});
};

const getAllPlanets = async () => {
	return await planets.find({}, { _id: 0, __v: 0 });
};

const savePlanet = async planet => {
	try {
		return await planets.updateOne(
			{
				keplerName: planet.kepler_name,
			},
			{
				keplerName: planet.kepler_name,
			},
			{ upsert: true }
		);
	} catch (error) {
		console.log(`Could not save planet: ${error}`);
	}
};

export { getAllPlanets, loadPlanetsData };
