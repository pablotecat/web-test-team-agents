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
    //Setup
    const setupResponse = await request.post(`${baseURL}/register`, {
      data: { name: 'Test User', email: 'test@GETapi.com', phone: '+1234567890' },
    });
    expect(setupResponse.status()).toBe(200);
    const createdUsr = await setupResponse.json();
    const createdUsrId = createdUsr.user.id;
    //Test
    const response = await request.get(`${baseURL}/users/${createdUsrId}`);
    const body = await response.json();
    expect(body.id).toBe(createdUsrId);
    expect(body.name).toBe('Test User');
    expect(body.email).toBe('test@GETapi.com');
    expect(body.phone).toBe('+1234567890');
    //Cleanup
    //const delResp = await request.delete(`${baseURL}/users/${createdUsrId}`);
    //expect([200, 204]).toContain(delResp.status());
  });

  test('PUT /users/:id updates a user', async ({ request }) => {
    // Setup
    const createResp = await request.post(`${baseURL}/register`, {
      data: { name: 'User To Update', email: 'update@test.com', phone: '+100000000' },
    });
    expect(createResp.status()).toBe(200);
    const createdUsr = await createResp.json();
    const CreatedUsrId = createdUsr.user.id;
    // Test
    const response = await request.put(`${baseURL}/users/${CreatedUsrId}`, { 
      data: { name: 'EDITED', email: 'test@EDITED.com', phone: '+1234567890' } 
    });
    expect(response.ok()).toBeTruthy();
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.user.name).toBe('EDITED');
    expect(body.user.email).toBe('test@EDITED.com');
    expect(body.user.phone).toBe('+1234567890');
    // Cleanup: remove the created user
    //const remove = await request.delete(`${baseURL}/users/${CreatedUsrId}`);
    //expect([200, 204]).toContain(remove.status());
  });

  test.skip('DELETE /users/:id removes a user', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`);
    expect(response.status()).toBe(204);
  });
});
