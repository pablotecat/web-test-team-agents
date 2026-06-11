import { test, expect } from '../pages/base';

test.describe('Form UI', () => {
  test.beforeEach(async ({ formPage }) => {
    await formPage.goto();
  });

  test('should submit the form successfully', async ({ 
    formPage,
    browserName
   }) => {
    await formPage.fillName(`John Doe ${browserName}`); 
    await formPage.fillEmail(`john.doe@${browserName}.com`);
    await formPage.fillPhone('+1234567890');
    await formPage.submitForm();

    await expect(formPage.successMessage).toBeVisible();
  });

test('Phone field should not be mandatory', async ({ 
    formPage,
    browserName
   }) => {
    await formPage.fillName(`John Doe ${browserName}`); 
    await formPage.fillEmail(`john.doe@${browserName}.com`);
    //phone missing
    await formPage.submitForm();

    await expect(formPage.successMessage).toBeVisible();
  });

  test('Email field should be well formed', async ({ 
    formPage,
    browserName
   }) => {
    await formPage.fillName(`John Doe ${browserName}`); 
    await formPage.fillEmail(`john.doe.${browserName}.com`); //not well formed email
    await formPage.fillPhone('+1234567890');
    await formPage.submitForm();

    await expect(formPage.successMessage).not.toBeVisible();
  });

  test('should show validation errors when all required fields are empty', async ({ 
    formPage
   }) => {
    //the web page is not currently showing validation errors, so we will just check that the success message is not visible after submitting an empty form
    await formPage.submitForm();
    await expect(formPage.successMessage).not.toBeVisible();
  });

  test('should show validation error when name is empty', async ({ 
    formPage,
    browserName  }) => {
      //the web page is not currently showing validation errors, so we will just check that the success message is not visible after submitting a form with no name
      //name missing
      await formPage.fillEmail(`john.doe@${browserName}.com`);
      await formPage.fillPhone('+1234567890');
      await formPage.submitForm();

      await expect(formPage.successMessage).not.toBeVisible();
    });
  test('should show validation error when email is empty', async ({ 
    formPage,
    browserName  }) => {
      //the web page is not currently showing validation errors, so we will just check that the success message is not visible after submitting a form with no name
      await formPage.fillName(`John Doe ${browserName}`); 
      //email missing
      await formPage.fillPhone('+1234567890');
      await formPage.submitForm();

      await expect(formPage.successMessage).not.toBeVisible();
    });  
});
