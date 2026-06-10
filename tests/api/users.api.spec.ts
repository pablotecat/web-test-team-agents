import { test, expect } from '@playwright/test';

const baseURL = process.env.API_BASE_URL || 'https://reqres.in/api';

test.describe('Users API', () => {
  test('GET /users returns a list of users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.page).toBeDefined();
    expect(body.per_page).toBeDefined();
  });

  test.fixme('PUT /users/:id updates a user', async ({ request }) => {
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

  test('DELETE /users/:id removes a user', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`);
    expect(response.status()).toBe(204);
  });
});
