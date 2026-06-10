import { test, expect, request } from '@playwright/test';

// Scaffolding de tests para endpoint PUT /register

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

test.describe('API: POST /register', () => {
	test('should update user registration successfully (200)', async ({ request }) => {
		const payload = {
			name: 'Eve Holt',
            email: 'eve.holt@reqres.in',
			phone: '+123456789',
		};

		const response = await request.post(`${BASE_URL}/register`, {
			data: payload,
		});

		expect(response.status()).toBe(200);
	});

	test('should return 400 when required fields are missing', async ({ request }) => {
		const payload = {
			name: 'Eve Holt',
            //email missing
            //phone not required
		};

		const response = await request.post(`${BASE_URL}/register`, {
			data: payload,
		});

		expect(response.status()).toBe(400);
		const body = await response.json();
		expect(body).toHaveProperty('error');
	});

	test('should validate response time and headers', async ({ request }) => {
		const payload = { name: 'Eve Holt', email: 'eve.holt@reqres.in', phone: '+123456789' };
		const start = Date.now();
		const response = await request.post(`${BASE_URL}/register`, { data: payload });
		const elapsed = Date.now() - start;

		expect(response.status()).toBe(200);
		expect(elapsed).toBeLessThan(2000);
		expect(response.headers()['content-type']).toContain('application/json');
	});
});
