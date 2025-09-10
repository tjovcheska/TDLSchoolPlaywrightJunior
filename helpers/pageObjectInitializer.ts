import { type Page } from '@playwright/test'

import { LoginPage } from '../pageObjects/LoginPage'
import { InventoryPage } from '../pageObjects/InventoryPage'
import { CheckoutPage } from '../pageObjects/CheckoutPage'
import { Navigation } from '../pageObjects/Navigation'

export function initializePageObjects(page: Page) {
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)
  const checkoutPage = new CheckoutPage(page)
  const navigation = new Navigation(page)


  return {
    loginPage,
    inventoryPage,
    checkoutPage,
    navigation
  }
}
