import request from 'supertest';
import app from '../../app.js';
import { MongoDbConnect, MongoDbDisconnect } from '../../services/mongo.js';

describe('Launches API', () => {
	//
	beforeAll(async () => {
		await MongoDbConnect();
	});
	//
	afterAll(async () => {
		await MongoDbDisconnect();
	});
	//
	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			const response = await request(app)
				.get('/launches')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	//
	describe('Test: POST /launch', () => {
		const testLaunchData = {
			mission: 'TEST_MISSION_234',
			rocket: 'TEST ROCKET IS343',
			target: 'KEPLER',
			launchDate: 'January 22, 2023',
		};
		const testLaunchDataWithNoDate = {
			mission: 'TEST_MISSION_234',
			rocket: 'TEST ROCKET IS343',
			target: 'KEPLER',
		};
		const testLaunchDataWithInvalidDate = {
			mission: 'TEST_MISSION_234',
			rocket: 'TEST ROCKET IS343',
			target: 'KEPLER',
			launchDate: 'test date',
		};

		test('It should respoind with 200 success', async () => {
			const response = await request(app)
				.post('/launches')
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
				.post('/launches')
				.send(testLaunchDataWithNoDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Missing required launch property.',
			});
		});
		test('It should catch invalid dates', async () => {
			const response = await request(app)
				.post('/launches')
				.send(testLaunchDataWithInvalidDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Invalid Launch Date.',
			});
		});
	});
});
