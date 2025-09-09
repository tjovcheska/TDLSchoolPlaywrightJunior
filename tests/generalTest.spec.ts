import { test, expect } from '@playwright/test';

// Example of a simple test
test('should appear in Playwright test runner', async ({ page }) => {
  // This test is intentionally empty
});

// Test: Navigate to Saucedemo page
test('should navigate to saucedemo page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  await expect(page).toHaveURL('/');
  await expect(page.locator('.login_logo')).toBeVisible();
  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
  await expect(page.locator('text=Swag Labs')).toBeVisible();
});

// Test: Login with valid credentials as standard_user
test('should login with valid credentials as standard_user', async ({ page }) => {
  await page.goto('/');
  
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('should login with invalid credentials', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('Teodora');
  await page.locator('[data-test="password"]').fill('1234');

  await page.locator('[data-test="login-button"]').click();

  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toHaveText('Epic sadface: Username and password do not match any user in this service');

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('should login with valid credentials as standard_user on mobile', async ({ page, browser }) => {
  // Emulate iPhone 6 viewport
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
  });
  const mobilePage = await context.newPage();

  await mobilePage.goto('/');

  await mobilePage.locator('[data-test="username"]').fill('standard_user');
  await mobilePage.locator('[data-test="password"]').fill('secret_sauce');

  await mobilePage.locator('[data-test="login-button"]').click();

  await expect(mobilePage).toHaveURL(/\/inventory.html/);

  await context.close();
});
