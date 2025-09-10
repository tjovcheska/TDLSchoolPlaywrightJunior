import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Positive test cases', () => {

    test.afterEach(async ({ page }) => {
      await page.getByText('Open Menu').click();
      await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
      await page.locator('[data-test="logout-sidebar-link"]').click();
    });

    test('should login with valid credentials as standard_user', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('should login with valid credentials as problem_user', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('problem_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('should login with valid credentials as visual_user', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('visual_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/.*inventory.html/);
    });

    test.skip('should logout after login', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/.*inventory.html/);

      await page.getByText('Open Menu').click();
      await page.locator('[data-test="logout-sidebar-link"]').click();
    });
  });

  test.describe('Negative test cases', () => {

    test('should login with invalid credentials', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('Teodora');
      await page.locator('[data-test="password"]').fill('1234');
      await page.locator('[data-test="login-button"]').click();

      await expect(page.locator('[data-test="error"]')).toBeVisible();
      await expect(page.locator('[data-test="error"]')).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
      );
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('should prevent login with locked out user', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('locked_out_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      await expect(page.locator('[data-test="error"]')).toBeVisible();
      await expect(page.locator('[data-test="error"]')).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
      );
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });
});
