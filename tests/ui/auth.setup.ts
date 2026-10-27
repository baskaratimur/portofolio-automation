import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import path from 'path';

const authFile = path.resolve(__dirname, '../../.auth/user.json');

setup('Authenticate Admin and Cache StorageState', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin', 'admin');
  await loginPage.assertLoginSuccessful();

  await page.context().storageState({ path: authFile });
});
