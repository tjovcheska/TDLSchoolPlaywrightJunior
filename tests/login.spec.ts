import { test, expect } from '@playwright/test';
import users from '../fixtures/users.json';

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
      await page.locator('[data-test="username"]').fill(users.standard_user.username);
      await page.locator('[data-test="password"]').fill(users.standard_user.password);
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('should login with valid credentials as problem_user', async ({ page }) => {
      await page.locator('[data-test="username"]').fill(users.problem_user.username);
      await page.locator('[data-test="password"]').fill(users.problem_user.password);
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('should login with valid credentials as visual_user', async ({ page }) => {
      await page.locator('[data-test="username"]').fill(users.visual_user.username);
      await page.locator('[data-test="password"]').fill(users.visual_user.password);
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/.*inventory.html/);
    });

    test.skip('should logout after login', async ({ page }) => {
      await page.locator('[data-test="username"]').fill(users.standard_user.username);
      await page.locator('[data-test="password"]').fill(users.standard_user.password);
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
      await page.locator('[data-test="username"]').fill(users.locked_out_user.username);
      await page.locator('[data-test="password"]').fill(users.locked_out_user.password);
      await page.locator('[data-test="login-button"]').click();

      const error = page.locator('[data-test="error"]');
      await expect(error).toBeVisible();
      await expect(error).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
      );
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });
});
