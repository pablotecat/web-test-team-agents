import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto('/');
  });

  test('should navigate from home to about page', async ({ page }) => {
    // TODO: Add navigation to about page
    // await page.click('a[href="/about"]');
    // await expect(page).toHaveURL('/about');
  });

  test('should navigate from home to contact page', async ({ page }) => {
    // TODO: Add navigation to contact page
    // await page.click('a[href="/contact"]');
    // await expect(page).toHaveURL('/contact');
  });

  test('should navigate back using browser back button', async ({ page }) => {
    // TODO: Add navigation and back button test
    // await page.click('a[href="/about"]');
    // await page.goBack();
    // await expect(page).toHaveURL('/');
  });

  test('should navigate forward using browser forward button', async ({ page }) => {
    // TODO: Add navigation forward test
    // await page.click('a[href="/about"]');
    // await page.goBack();
    // await page.goForward();
    // await expect(page).toHaveURL('/about');
  });
});
