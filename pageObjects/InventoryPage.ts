import { Page, expect, test } from '@playwright/test';

export class InventoryPage {
  constructor(
    private readonly page: Page,
    private readonly inventoryItems = page.getByTestId('inventory-item'),
    private readonly itemsSortingDropdown = page.getByTestId('product-sort-container'),
    readonly inventoryItemName = page.getByTestId('inventory-item-name'),
    private readonly bikeLightsItem = page.getByTestId('add-to-cart-sauce-labs-bike-light'),
    private readonly onesieItem = page.getByTestId('add-to-cart-sauce-labs-onesie'),
    readonly shoppingCartBadge = page.getByTestId('shopping-cart-badge'),
    private readonly removeBikeLightButton = page.getByTestId('remove-sauce-labs-bike-light'),
    private readonly inventoryItemPrice = page.getByTestId('inventory-item-price'),
    private readonly shoppingCartLink = page.getByTestId('shopping-cart-link'),
    private readonly checkoutButton = page.getByTestId('checkout')
  ) {
  }

  async assertNumberOfItems(expectedNumber: number) {
    await test.step(`Assert number of inventory items is ${expectedNumber}`, async () => {
      await expect(this.inventoryItems).toHaveCount(expectedNumber);
    });
  }

  async sortItemsBy(option: string) {
    await test.step(`Sort items by ${option}`, async () => {
      await expect(this.itemsSortingDropdown).toBeVisible();
      await this.itemsSortingDropdown.selectOption(option);
    });
  }

  getSortedCopyOfArray(array: number[]) {
    return [...array].sort((a, b) => a - b);
  }

  async assertSortedPrices() {
    await test.step('Assert that inventory item prices are sorted', async () => {
      const pricesText = await this.inventoryItemPrice.allTextContents();
      const prices = pricesText.map((text) => parseFloat(text.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });
  }

  async addBikeLightsToCart() {
    await test.step('Add Sauce Labs Bike Light to cart', async () => {
      await this.bikeLightsItem.click();
    });
  }

  async addOnesieToCart() {
    await test.step('Add Sauce Labs Onesie to cart', async () => {
      await this.onesieItem.click();
    });
  }

  async removeBikeLightFromCart() {
    await test.step('Remove Bike Light from cart', async () => {
      await this.removeBikeLightButton.click();
    });
  }

  async goToShoppingCart() {
    await test.step('Navigate to shopping cart', async () => {
      await this.shoppingCartLink.click();
    });
  }

  async checkout() {
    await test.step('Click checkout button', async () => {
      await this.checkoutButton.click();
    });
  }
}
