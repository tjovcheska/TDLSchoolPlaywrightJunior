import { test, expect } from '@playwright/test';

test('should appear in Playwright test runner', async () => {
  // Example placeholder test
});

test('should navigate to saucedemo page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\//);

  const loginLogo = page.locator('.login_logo');
  const root = page.locator('#root');

  await expect(loginLogo).toBeVisible();
  await expect(root).toBeVisible();
  await expect(root).toContainText('Swag Labs');
  await expect(loginLogo).toHaveText('Swag Labs');
  await expect(page.getByText('Swag Labs')).toBeVisible();
});
