import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Login Page (/index.html).
 * Encapsulates accessibility locators and login interactions.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Masuk ke Dashboard' });
    this.errorMessage = page.locator('#login-error');
  }

  async goto(): Promise<void> {
    await this.page.goto('/index.html');
  }

  async login(username: string = 'admin', password: string = 'admin'): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertLoginSuccessful(): Promise<void> {
    await expect(this.page).toHaveURL(/.*karyawan/);
  }
}
