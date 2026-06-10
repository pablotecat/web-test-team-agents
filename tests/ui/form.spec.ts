import { test, expect } from '../pages/base';

test.describe('Form UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should submit the form successfully', async ({ 
    formPage
   }) => {
    await formPage.fillName('John Doe');
    await formPage.fillEmail('john.doe@example.com');
    await formPage.fillPhone('1234567890');
    await formPage.submitForm();

    await expect(formPage.successMessage).toBeVisible();
  });

  test('should show validation errors when required fields are empty', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });
});
