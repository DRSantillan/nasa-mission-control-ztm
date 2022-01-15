import request from 'supertest';
import app from '../../app.js';
import { MongoDbConnect, MongoDbDisconnect } from '../../services/mongo.js';

describe('Launches API V1', () => {
	//
	beforeAll(async () => {
		await MongoDbConnect();
	});
	//
	afterAll(async () => {
		await MongoDbDisconnect();
	});
	//
	describe('Test GET /v1/launches', () => {
		test('It should respond with 200 success', async () => {
			const response = await request(app)
				.get('/v1/launches')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	//
	describe('Test: POST /v1/launch', () => {
		const testLaunchData = {
			mission: 'TEST_MISSION_234',
			rocket: 'TEST ROCKET IS343',
			target: 'Kepler-62 f',
			launchDate: 'January 22, 2023',
		};
		const testLaunchDataWithNoDate = {
			mission: 'TEST_MISSION_234',
			rocket: 'TEST ROCKET IS343',
			target: 'Kepler-62 f',
		};
		const testLaunchDataWithInvalidDate = {
			mission: 'TEST_MISSION_234',
			rocket: 'TEST ROCKET IS343',
			target: 'Kepler-62 f',
			launchDate: 'test date',
		};

		test('It should respoind with 201 success', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(testLaunchData)
				.expect('Content-Type', /json/)
				.expect(201);

			const requestDate = new Date(testLaunchData.launchDate).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();

			expect(responseDate).toBe(requestDate);
			expect(response.body).toMatchObject(testLaunchDataWithNoDate);
		});
		//
		test('It should catch missing required properties', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(testLaunchDataWithNoDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Missing required launch property.',
			});
		});
		test('It should catch invalid dates', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(testLaunchDataWithInvalidDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Invalid Launch Date.',
			});
		});
	});
});
