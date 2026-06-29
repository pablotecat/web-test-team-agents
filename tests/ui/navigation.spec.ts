import { test, expect } from '../pages/base';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
  });

  test('should navigate from Registro to Usuarios page', async ({ 
    formPage,
    usersPage
    }) => {
    await formPage.goto();
    await formPage.navMenu.navigateToUsuarios();
    await expect(usersPage.page).toHaveURL(/.*\/users/);
  });

  test('should navigate from Usuarios to Registro page', async ({ 
    formPage,
    usersPage
    }) => {
    await usersPage.goto();
    await usersPage.navMenu.navigateToRegistro();
    await expect(formPage.page).toHaveURL('/');
  });
});
