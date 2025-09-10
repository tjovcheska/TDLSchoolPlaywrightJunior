import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { Navigation } from '../pageObjects/Navigation';
import { InventoryPage } from '../pageObjects/InventoryPage';
import users from '../fixtures/users.json';
import inventory from '../fixtures/inventory.json';
import { initializePageObjects } from '../helpers/pageObjectInitializer';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let navigation: Navigation;

test.describe('Inventory page', () => {
  test.beforeEach(async ({ page }) => {
    ({ loginPage, inventoryPage, navigation } = initializePageObjects(page))

    await navigation.goToLoginPage();
    await loginPage.loginWithValidCredentials(users.standard_user);
  });

  test('should count the number of displayed items', async () => {
    await inventoryPage.assertNumberOfItems(inventory.totalNumberOfItems);
  });

  test('should sort inventory items by name from Z to A', async ({ page }) => {
    await inventoryPage.sortItemsBy(inventory.sortingOptions.ZtoA);

    const firstItemText = await inventoryPage.inventoryItemName.first().textContent();
    const lastItemText = await inventoryPage.inventoryItemName.last().textContent();

    expect(firstItemText).toBe('Test.allTheThings() T-Shirt (Red)');
    expect(lastItemText).toBe('Sauce Labs Backpack');

    // await page.locator('[data-test="product-sort-container"]').selectOption('za');
    // await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText(
    //   'Test.allTheThings() T-Shirt (Red)'
    // );
    // await expect(page.locator('[data-test="inventory-item-name"]').last()).toHaveText(
    //   'Sauce Labs Backpack'
    // );
  });

  test('should sort inventory items by price from low to high', async ({ page }) => {
    await inventoryPage.sortItemsBy(inventory.sortingOptions.LowToHigh);

    // // Assert that prices are sorted
    // const priceLocators = await inventoryPage.inventoryItemPrice.allTextContents();
    // const prices = priceLocators.map(text => parseFloat(text.replace('$', '').trim()));
    // const sortedPrices = [...prices].sort((a, b) => a - b);

    // expect(prices).toEqual(sortedPrices);

    await inventoryPage.assertSortedPrices();
  });

  test('should increase the number of items in the cart after clicking add to cart button', async ({ page }) => {
    await inventoryPage.addBikeLightsToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    await inventoryPage.addOnesieToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('2');

    // await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    // await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    // await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    // await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('should decrease the number of items in the cart after clicking add to cart button on an already added item', async ({ page }) => {

    await inventoryPage.addBikeLightsToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    await inventoryPage.addOnesieToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('2');

    await inventoryPage.removeBikeLightFromCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    // await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    // await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    // await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
