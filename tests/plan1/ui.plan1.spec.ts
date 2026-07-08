import { test, expect } from '../pages/base';

test.describe('Plan 1 UI Automation', () => {
  test('PLN-UI-001 | bloquea envio cuando faltan campos obligatorios', async ({ formPage, page }) => {
    await formPage.goto();

    let registerCalls = 0;
    page.on('request', (request) => {
      if (request.method() === 'POST' && request.url().includes('/api/register')) {
        registerCalls += 1;
      }
    });

    await formPage.fillEmail('required-check@example.com');
    await formPage.submitForm();
    await expect(formPage.successMessage).toHaveText('');

    await formPage.fillName('Required Check');
    await formPage.emailInput.fill('');
    await formPage.submitForm();
    await expect(formPage.successMessage).toHaveText('');

    expect(registerCalls).toBe(0);
  });

  test('PLN-UI-002 | rechaza email invalido en UI', async ({ formPage, page }) => {
    await formPage.goto();

    let registerCalls = 0;
    page.on('request', (request) => {
      if (request.method() === 'POST' && request.url().includes('/api/register')) {
        registerCalls += 1;
      }
    });

    await formPage.fillName('Invalid Email User');

    await formPage.fillEmail('invalido@');
    await formPage.submitForm();
    await expect(formPage.successMessage).toHaveText('');

    await formPage.fillEmail('invalido.com');
    await formPage.submitForm();
    await expect(formPage.successMessage).toHaveText('');

    expect(registerCalls).toBe(0);
  });

  test('PLN-UI-003 | muestra feedback de registro exitoso y limpia formulario', async ({ formPage, page, browserName }) => {
    await formPage.goto();

    const uniqueEmail = `pln-ui-003-${browserName}-${Date.now()}@example.com`;
    let observedPayload: Record<string, unknown> | null = null;

    await page.route('**/api/register', async (route) => {
      const request = route.request();
      observedPayload = request.postDataJSON() as Record<string, unknown>;
      await route.continue();
    });

    await formPage.fillName('Success User');
    await formPage.fillEmail(uniqueEmail);
    await formPage.fillPhone('+111111111');
    await formPage.submitForm();

    await expect(formPage.successMessage).toContainText('Registro exitoso');
    expect(observedPayload).not.toBeNull();
    expect(observedPayload?.name).toBe('Success User');
    expect(observedPayload?.email).toBe(uniqueEmail);

    await expect(formPage.nameInput).toHaveValue('');
    await expect(formPage.emailInput).toHaveValue('');
    await expect(formPage.phoneInput).toHaveValue('');

    await expect(formPage.successMessage).toContainText('Registro exitoso');
    await expect(formPage.successMessage).toHaveText('', { timeout: 4000 });
  });

  test('PLN-NAV-001 | navega entre Registro y Usuarios con estado activo correcto', async ({ formPage, usersPage }) => {
    await formPage.goto();

    await expect(formPage.navMenu.RegistroBtn).toHaveClass(/active/);
    await expect(formPage.navMenu.UsuariosBtn).not.toHaveClass(/active/);

    await formPage.navMenu.navigateToUsuarios();
    await expect(usersPage.page).toHaveURL(/\/users$/);
    await expect(usersPage.navMenu.UsuariosBtn).toHaveClass(/active/);
    await expect(usersPage.navMenu.RegistroBtn).not.toHaveClass(/active/);

    await usersPage.navMenu.navigateToRegistro();
    await expect(formPage.page).toHaveURL('/');
    await expect(formPage.navMenu.RegistroBtn).toHaveClass(/active/);
  });

  test('PLN-UI-004 | listado de usuarios renderiza, edita y elimina', async ({ usersPage, request, page }) => {
    const unique = Date.now();
    const originalName = `Plan1 User ${unique}`;
    const originalEmail = `plan1-ui-004-${unique}@example.com`;
    const updatedName = `${originalName} Updated`;
    const updatedEmail = `plan1-ui-004-updated-${unique}@example.com`;

    const createResponse = await request.post('/api/register', {
      data: { name: originalName, email: originalEmail, phone: '+123456789' },
    });
    expect(createResponse.status()).toBe(200);

    await usersPage.goto();

    const usersGet = page.waitForResponse((response) =>
      response.url().includes('/api/users') && response.request().method() === 'GET'
    );
    await usersGet;

    const row = usersPage.page.locator('#usersBody tr', { hasText: originalEmail });
    await expect(row).toBeVisible();

    await row.locator('.btn-edit').click();
    await expect(usersPage.page.locator('#editModal')).toBeVisible();

    await usersPage.page.locator('#editName').fill(updatedName);
    await usersPage.page.locator('#editEmail').fill(updatedEmail);

    const updateResponsePromise = usersPage.page.waitForResponse((response) =>
      response.url().includes('/api/users/') && response.request().method() === 'PUT'
    );

    const dialogOnce = usersPage.page.waitForEvent('dialog');
    await usersPage.page.locator('#editForm button[type="submit"]').click();

    const updateResponse = await updateResponsePromise;
    expect(updateResponse.status()).toBe(200);

    const updateDialog = await dialogOnce;
    expect(updateDialog.message()).toContain('Usuario actualizado exitosamente');
    await updateDialog.accept();

    const updatedRow = usersPage.page.locator('#usersBody tr', { hasText: updatedEmail });
    await expect(updatedRow).toBeVisible();

    const confirmPromise = usersPage.page.waitForEvent('dialog');
    await updatedRow.locator('.btn-delete').click();
    const confirmDialog = await confirmPromise;
    expect(confirmDialog.type()).toBe('confirm');
    await confirmDialog.accept();

    const deleteResponsePromise = usersPage.page.waitForResponse((response) =>
      response.url().includes('/api/users/') && response.request().method() === 'DELETE'
    );
    const deleteResponse = await deleteResponsePromise;
    expect(deleteResponse.status()).toBe(200);

    const alertPromise = usersPage.page.waitForEvent('dialog');
    const deleteAlert = await alertPromise;
    expect(deleteAlert.message()).toContain('Usuario eliminado exitosamente');
    await deleteAlert.accept();

    await expect(updatedRow).toHaveCount(0);
  });
});
