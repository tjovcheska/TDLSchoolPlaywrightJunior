import { test, expect } from '@playwright/test';

// Example of a simple test
test('should appear in Playwright test runner', async ({ page }) => {
  // This test is intentionally empty
});

// Functions examples (can be used in tests or helpers)
const doSomething = () => console.log('Something');

const addition = (a: number, b: number) => {
  console.log(a + b);
  return a + b;
};

const testFunction = (name: string, callback: Function) => {
  console.log(name);
  callback();
};

testFunction('should appear in Playwright test runner', () => addition(2, 3));

// Test: Navigate to Saucedemo page
test('should navigate to saucedemo page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('.login_logo')).toBeVisible();
  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
  await expect(page.locator('text=Swag Labs')).toBeVisible();
});

// Test: Login with valid credentials as standard_user
test('should login with valid credentials as standard_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/.*inventory.html/);
});
