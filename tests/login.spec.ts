import { test, expect, devices } from '@playwright/test';

test.describe('Login functionality', () => {

  test.describe('Positive test cases', () => {
    test('should login with valid credentials as standard_user', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('[data-test="username"]')).toBeVisible();
      await page.fill('[data-test="username"]', 'standard_user');

      await expect(page.locator('[data-test="password"]')).toBeVisible();
      await page.fill('[data-test="password"]', 'secret_sauce');

      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
      await page.click('[data-test="login-button"]');

      await expect(page).toHaveURL(/.*inventory\.html/);
    });

    test('should login with valid credentials as standard_user on mobile', async ({ page, browser }) => {
      // Launch a new browser context with iPhone 6 viewport
      const context = await browser.newContext({
        ...devices['iPhone 6'],
      });
      const mobilePage = await context.newPage();

      await mobilePage.goto('/');
      await expect(mobilePage.locator('[data-test="username"]')).toBeVisible();
      await mobilePage.fill('[data-test="username"]', 'standard_user');

      await expect(mobilePage.locator('[data-test="password"]')).toBeVisible();
      await mobilePage.fill('[data-test="password"]', 'secret_sauce');

      await expect(mobilePage.locator('[data-test="login-button"]')).toBeVisible();
      await mobilePage.click('[data-test="login-button"]');

      await expect(mobilePage).toHaveURL(/.*inventory\.html/);

      await context.close();
    });
  });

  test.describe('Negative test cases', () => {
    test('should login with invalid credentials', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('[data-test="username"]')).toBeVisible();
      await page.fill('[data-test="username"]', 'Teodora');

      await expect(page.locator('[data-test="password"]')).toBeVisible();
      await page.fill('[data-test="password"]', '1234');

      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
      await page.click('[data-test="login-button"]');

      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
      );

      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });
});
