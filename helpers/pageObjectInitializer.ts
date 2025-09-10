import { type Page } from '@playwright/test'

import { LoginPage } from '../pageObjects/LoginPage'
import { InventoryPage } from '../pageObjects/InventoryPage'
import { Navigation } from '../pageObjects/Navigation'

export function initializePageObjects(page: Page) {
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)
  const navigation = new Navigation(page)


  return {
    loginPage,
    inventoryPage,
    navigation
  }
}
