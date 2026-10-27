import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/login.page';
import { KaryawanPage } from '../../../src/pages/karyawan.page';
import { KaryawanClient } from '../../../src/api/karyawan.client';

/**
 * UI Fixtures for Dependency Injection of Page Object Model instances
 * and API Clients for atomic data seeding.
 */
export type UiFixtures = {
  loginPage: LoginPage;
  karyawanPage: KaryawanPage;
  karyawanClient: KaryawanClient;
};

export const test = baseTest.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  karyawanPage: async ({ page }, use) => {
    await use(new KaryawanPage(page));
  },
  karyawanClient: async ({}, use) => {
    await use(new KaryawanClient());
  },
});

export { expect };
