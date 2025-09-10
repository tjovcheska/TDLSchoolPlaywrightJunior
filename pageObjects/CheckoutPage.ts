import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly checkoutPageTitle: Locator;
  readonly checkoutFormFirstName: Locator;
  readonly checkoutFormLastName: Locator;
  readonly checkoutFormPostalCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.locator('[data-test="continue"]');
    this.checkoutPageTitle = page.locator('[data-test="title"]');
    this.checkoutFormFirstName = page.locator('[data-test="firstName"]');
    this.checkoutFormLastName = page.locator('[data-test="lastName"]');
    this.checkoutFormPostalCode = page.locator('[data-test="postalCode"]');
  }

  async fillOutCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await expect(this.checkoutFormFirstName).toBeVisible();
    await this.checkoutFormFirstName.fill(firstName);

    await expect(this.checkoutFormLastName).toBeVisible();
    await this.checkoutFormLastName.fill(lastName);

    await expect(this.checkoutFormPostalCode).toBeVisible();
    await this.checkoutFormPostalCode.fill(postalCode);
  }

  async submitCheckoutForm() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }
}
