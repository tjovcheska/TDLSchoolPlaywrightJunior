import { Page, expect, test } from '@playwright/test';

export class Navigation {
  constructor(
    private readonly page: Page,
    private readonly loginPageUrl = '/',
  ) {
  }

  async goToLoginPage() {
    await test.step('Navigate to the login page', async () => {
      await this.page.goto(this.loginPageUrl);
    });
  }

  async verifyUrlContains(expectedUrl: string) {
    await test.step(`Verify URL contains "${expectedUrl}"`, async () => {
      await expect(this.page).toHaveURL(new RegExp(expectedUrl));
    });
  }
}
