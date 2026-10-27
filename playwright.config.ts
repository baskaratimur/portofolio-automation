import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = 3000;
const BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}`;
const AUTH_FILE = path.resolve(__dirname, '.auth/user.json');

/**
 * Enterprise Playwright Configuration for API and UI Automation
 * Implements Auth Setup dependency & cached StorageState as defined in ARCHITECTURE.md.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    // 1. Standalone API Project
    {
      name: 'api',
      testDir: './tests/api',
    },

    // 2. Auth Setup Project: Runs once before UI specs, stores .auth/user.json
    {
      name: 'auth-setup',
      testMatch: /auth\.setup\.ts/,
    },

    // 3. UI Project: Inherits auth-setup session via storageState
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      testIgnore: /auth\.setup\.ts/,
      dependencies: ['auth-setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },
  ],

  /* Automatically boot the local QA demo server if not running */
  webServer: {
    command: 'node ../web-coba-qa/server.js',
    url: `${BASE_URL}/api/karyawan`,
    reuseExistingServer: true,
    timeout: 30000,
  },
});
