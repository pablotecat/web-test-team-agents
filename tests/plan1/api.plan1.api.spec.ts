import { test, expect } from '@playwright/test';

const apiBaseURL = (process.env.API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '');

test.describe('Plan 1 API Automation', () => {
  test('PLN-API-REG-001 | POST /api/register crea usuario con contrato esperado', async ({ request }) => {
    const unique = Date.now();
    const email = `pln-api-reg-001-${unique}@example.com`;

    const response = await request.post(`${apiBaseURL}/register`, {
      data: {
        name: `API User ${unique}`,
        email,
      },
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.user.id).toBeDefined();
    expect(body.user.registeredAt).toBeTruthy();

    const usersResponse = await request.get(`${apiBaseURL}/users`);
    expect(usersResponse.status()).toBe(200);
    const users = await usersResponse.json();
    expect(users.some((user: { email: string }) => user.email === email)).toBeTruthy();
  });

  test('PLN-API-REG-002 | POST /api/register rechaza payloads sin requeridos', async ({ request }) => {
    const unique = Date.now();

    const invalidPayloads = [
      { email: `missing-name-${unique}@example.com` },
      { name: `Missing Email ${unique}` },
      { name: '', email: '' },
    ];

    for (const payload of invalidPayloads) {
      const response = await request.post(`${apiBaseURL}/register`, { data: payload });
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('Name and email are required');
    }

    const usersResponse = await request.get(`${apiBaseURL}/users`);
    const users = await usersResponse.json();
    expect(users.some((user: { email: string }) => user.email.includes(`missing-name-${unique}`))).toBeFalsy();
  });

  test('PLN-API-USR-001 | GET /api/users/:id existente e inexistente', async ({ request }) => {
    const unique = Date.now();
    const createResponse = await request.post(`${apiBaseURL}/register`, {
      data: {
        name: `Get User ${unique}`,
        email: `pln-api-usr-001-${unique}@example.com`,
        phone: '+1234567890',
      },
    });
    expect(createResponse.status()).toBe(200);

    const createdUser = await createResponse.json();
    const createdId = createdUser.user.id;

    const foundResponse = await request.get(`${apiBaseURL}/users/${createdId}`);
    expect(foundResponse.status()).toBe(200);
    const foundBody = await foundResponse.json();
    expect(foundBody.id).toBe(createdId);

    const missingResponse = await request.get(`${apiBaseURL}/users/999999999`);
    expect(missingResponse.status()).toBe(404);
    const missingBody = await missingResponse.json();
    expect(missingBody.error).toBe('User not found');
  });

  test('PLN-API-USR-002 | PUT /api/users/:id valida update, 400 y 404', async ({ request }) => {
    const unique = Date.now();
    const createResponse = await request.post(`${apiBaseURL}/register`, {
      data: {
        name: `Put User ${unique}`,
        email: `pln-api-usr-002-${unique}@example.com`,
        phone: '+100000000',
      },
    });
    expect(createResponse.status()).toBe(200);

    const createdUser = await createResponse.json();
    const createdId = createdUser.user.id;

    const updateResponse = await request.put(`${apiBaseURL}/users/${createdId}`, {
      data: {
        name: `Put User Updated ${unique}`,
        email: `pln-api-usr-002-updated-${unique}@example.com`,
        phone: '+200000000',
      },
    });

    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    expect(updateBody.success).toBe(true);

    const invalidResponse = await request.put(`${apiBaseURL}/users/${createdId}`, {
      data: {
        name: '',
        email: '',
      },
    });
    expect(invalidResponse.status()).toBe(400);
    const invalidBody = await invalidResponse.json();
    expect(invalidBody.error).toBe('Name and email are required');

    const missingResponse = await request.put(`${apiBaseURL}/users/999999998`, {
      data: {
        name: 'Ghost',
        email: 'ghost@example.com',
      },
    });
    expect(missingResponse.status()).toBe(404);
    const missingBody = await missingResponse.json();
    expect(missingBody.error).toBe('User not found');
  });

  test('PLN-API-USR-003 | DELETE /api/users/:id existente e inexistente', async ({ request }) => {
    const unique = Date.now();
    const createResponse = await request.post(`${apiBaseURL}/register`, {
      data: {
        name: `Delete User ${unique}`,
        email: `pln-api-usr-003-${unique}@example.com`,
      },
    });
    expect(createResponse.status()).toBe(200);

    const createdUser = await createResponse.json();
    const createdId = createdUser.user.id;

    const deleteResponse = await request.delete(`${apiBaseURL}/users/${createdId}`);
    expect(deleteResponse.status()).toBe(200);
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.success).toBe(true);

    const missingDeleteResponse = await request.delete(`${apiBaseURL}/users/${createdId}`);
    expect(missingDeleteResponse.status()).toBe(404);
    const missingDeleteBody = await missingDeleteResponse.json();
    expect(missingDeleteBody.error).toBe('User not found');

    const getDeletedResponse = await request.get(`${apiBaseURL}/users/${createdId}`);
    expect(getDeletedResponse.status()).toBe(404);
    const getDeletedBody = await getDeletedResponse.json();
    expect(getDeletedBody.error).toBe('User not found');
  });
});
