import { test, expect, request } from '@playwright/test';

// Scaffolding de tests para endpoint PUT /register

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

test.describe('API: POST /register', () => {
	test('should create user successfully (200)', async ({ request }) => {
		const response = await request.post(`${BASE_URL}/register`, {
            data:{
                name: 'Eve Holt',
                email: 'eve.holt@reqres.in',
                phone: '+123456789'
            }
		});
		expect(response.status()).toBe(200);
	});

    test('should create user successfully with only required fields (200)', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data:{
                name: 'Eve Holt',
                email: 'eve.holt@reqres.in',
                //phone not required
            }
        });
        expect(response.status()).toBe(200);
    });

    test.skip('should return 400 when email is invalid', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: {
                name: 'Eve Holt',
                email: 'invalid-email',
                phone: '+123456789'
            }
        });
        expect(response.status()).toBe(400);
    });

    test.skip('should return 400 when phone number is invalid', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: {
                name: 'Eve Holt',
                email: 'eve.holt@reqres.in',
                phone: 'invalid-phone'
            }
        });
        expect(response.status()).toBe(400);
    });

    test.skip('should return 400 when name is empty', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: {
                name: '',
                email: 'eve.holt@reqres.in',
                phone: '+123456789'
            }
        });
        expect(response.status()).toBe(400);
    });

    test.skip('should return 400 when name is missing', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: {
                //name missing
                email: 'eve.holt@reqres.in',
                phone: '+123456789'
            }
        });
        expect(response.status()).toBe(400);
    });

        test.skip('should return 400 when email is empty', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: {
                name: 'Eve Holt',
                email: '',
                phone: '+123456789'
            }
        });
        expect(response.status()).toBe(400);
    });

    test.skip('should return 400 when email is missing', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: {
                name: 'Eve Holt',
                //email missing
                phone: '+123456789'
            }
        });
        expect(response.status()).toBe(400);
    });

    test('header should contain content-type application/json', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/register`, {
            data: {
                name: 'Eve Holt',
                email: 'eve.holt@reqres.in',
                phone: '+123456789'
            }
        });
        expect(response.headers()['content-type']).toContain('application/json');
    });

	test('response time should not be more than 2 seconds', async ({ request }) => {
		const start = Date.now();
		const response = await request.post(`${BASE_URL}/register`, { 
            data: { 
                name: 'Eve Holt', 
                email: 'eve.holt@reqres.in', 
                phone: '+123456789' }} );     
		const elapsed = Date.now() - start;
		expect(elapsed).toBeLessThan(2000);
	});
});
