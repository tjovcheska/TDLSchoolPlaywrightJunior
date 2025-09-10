import { Page, expect, test } from '@playwright/test';

export class LoginPage {
  constructor(
    private readonly page: Page,
    private readonly usernameInput = page.getByTestId('username'),
    private readonly passwordInput = page.getByTestId('password'),
    private readonly loginButton = page.getByTestId('login-button')
  ) {
  }

  async fillUsername(username: string) {
    await test.step(`Fill username: ${username}`, async () => {
      await expect(this.usernameInput).toBeVisible();
      await this.usernameInput.fill(username);
    });
  }

  async fillPassword(password: string) {
    await test.step(`Fill password`, async () => {
      await expect(this.passwordInput).toBeVisible();
      await this.passwordInput.fill(password);
    });
  }

  async clickLoginButton() {
    await test.step('Click login button', async () => {
      await expect(this.loginButton).toBeVisible();
      await this.loginButton.click();
    });
  }

  async loginWithValidCredentials(user: { username: string; password: string }) {
    await test.step(`Login with valid credentials for ${user.username}`, async () => {
      await this.fillUsername(user.username);
      await this.fillPassword(user.password);
      await this.clickLoginButton();
    });
  }
}
