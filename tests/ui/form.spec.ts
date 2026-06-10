import { test, expect } from '../pages/base';

test.describe('Form UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('should submit the form successfully', async ({ 
    formPage,
    browserName
   }) => {
    await formPage.fillName(`John Doe ${browserName}`); 
    await formPage.fillEmail(`john.doe@${browserName}.com`);
    await formPage.fillPhone('1234567890');
    await formPage.submitForm();

    await expect(formPage.successMessage).toBeVisible();
  });

  test('should show validation errors when required fields are empty', async ({ 
    formPage
   }) => {
    await formPage.submitForm();

    await expect(formPage.nameError).toBeVisible();
    await expect(formPage.emailError).toBeVisible();
  });
});
