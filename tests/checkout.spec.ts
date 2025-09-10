import { test, expect } from '@playwright/test';

import { initializePageObjects } from '../helpers/pageObjectInitializer';
import { LoginPage } from '../pageObjects/LoginPage';
import { InventoryPage } from '../pageObjects/InventoryPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
import { Navigation } from '../pageObjects/Navigation';

import users from '../fixtures/users.json';
import shoppers from '../fixtures/shoppers.json';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;
let navigation: Navigation;

test.describe('Checkout page', () => {

  test.beforeEach(async ({ page }) => {
    ({ loginPage, inventoryPage, checkoutPage, navigation } = initializePageObjects(page))

    await navigation.goToLoginPage();

    await loginPage.loginWithValidCredentials(users.standard_user);
  });

  test('should show the same items in the cart as added', async ({ page }) => {
    await inventoryPage.bikeLightsItem.click();
    await inventoryPage.onesieItem.click();

    await inventoryPage.shoppingCartLink.click();

    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);

    const itemNames = page.locator('[data-test="inventory-item-name"]');
    await expect(itemNames.first()).toHaveText('Sauce Labs Bike Light');
    await expect(itemNames.last()).toHaveText('Sauce Labs Onesie');
  });

  test('should navigate back to inventory page from cart page', async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="continue-shopping"]').click();

    await navigation.verifyUrlContains('/inventory.html');
  });

  test('should successfully fill out checkout form', async ({ page }) => {
    await inventoryPage.bikeLightsItem.click();
    await inventoryPage.shoppingCartLink.click();
    await inventoryPage.checkoutButton.click();

    await checkoutPage.fillOutCheckoutForm(shoppers.shoppers.firstName, shoppers.shoppers.lastName, shoppers.shoppers.postalCode);
    await checkoutPage.submitCheckoutForm();
  });
});