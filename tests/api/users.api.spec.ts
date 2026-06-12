import { test, expect } from '@playwright/test';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000/api';

test.describe('Users API', () => {
  test.skip('GET /users returns a json with user data', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toBeDefined();
  });

  test('GET /user:id returns a user', async ({ request }) => {
    let response = await request.get(`${baseURL}/users`);
    let body = await response.json();
    if (body.length === 0) {
      expect((await request.post(`${baseURL}/register`, {data: {name: 'Test User',email: 'test@GETapi.com',phone: '+1234567890'},}))
        .status()).toBe(200);
      response = await request.get(`${baseURL}/users`);
      body = await response.json();
    }
    expect(body[0].id).toBeDefined();
    expect(body[0].name).toBeDefined();
    expect(body[0].email).toBeDefined();
    //expect(body[0].phone).toBeDefined();
  });

  test.skip('PUT /users/:id updates a user', async ({ request }) => {
    const payload = {
      name: 'morpheus',
      job: 'zion resident',
    };

    const response = await request.put(`${baseURL}/users/2`, {
      data: payload,
    });
    expect(response.ok()).toBeTruthy();
    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.updatedAt).toBeDefined();
  });

  test.skip('DELETE /users/:id removes a user', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`);
    expect(response.status()).toBe(204);
  });
});
