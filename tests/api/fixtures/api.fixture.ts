import { test as baseTest, expect } from '@playwright/test';
import { KaryawanClient } from '../../../src/api/karyawan.client';
import { MakananClient } from '../../../src/api/makanan.client';
import { PakaianClient } from '../../../src/api/pakaian.client';

export type ApiFixtures = {
  karyawanClient: KaryawanClient;
  makananClient: MakananClient;
  pakaianClient: PakaianClient;
};

export const test = baseTest.extend<ApiFixtures>({
  karyawanClient: async ({}, use) => {
    const client = new KaryawanClient();
    await use(client);
  },

  makananClient: async ({}, use) => {
    const client = new MakananClient();
    await use(client);
  },

  pakaianClient: async ({}, use) => {
    const client = new PakaianClient();
    await use(client);
  },
});

export { expect };
