import { test, expect } from './fixtures/ui.fixture';
import { DataGenerator } from '../../src/utils/data.generator';

test.describe('Karyawan UI Automation (Atomic & Hybrid API Seeding)', () => {
  test('UI-01: Should access Karyawan page directly without re-login', async ({ karyawanPage, page }) => {
    await karyawanPage.goto();

    await expect(page).toHaveTitle(/Karyawan/i);
    await expect(page.getByRole('heading', { name: /data karyawan/i })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
  });

  test('UI-02: Should successfully create a new karyawan via UI', async ({ karyawanPage }) => {
    await karyawanPage.goto();

    const data = DataGenerator.generateKaryawan({
      nama: `Baskara ${DataGenerator.randomId('UI')}`,
      nik: DataGenerator.randomNik(),
      jabatan: 'Staff',
      departemen: 'IT & Engineering',
      bergabung: '2026-02-15',
      status: 'Aktif',
    });

    await karyawanPage.tambahKaryawan({
      nama: data.nama,
      nik: data.nik,
      jabatan: 'Staff',
      departemen: data.departemen,
      bergabung: data.bergabung,
      status: 'Aktif',
    });

    await karyawanPage.verifyToast('Karyawan berhasil ditambahkan.');
    await karyawanPage.verifyKaryawanVisible(data.nama);
  });

  test('UI-03: Should search karyawan by name (API Seed ➔ UI Search)', async ({ karyawanPage, karyawanClient }) => {
    // 1. Seed data via API to isolate search feature
    const targetPayload = DataGenerator.generateKaryawan({
      nama: `SearchTarget ${DataGenerator.randomId()}`,
      jabatan: 'Supervisor',
      departemen: 'Marketing',
      status: 'Aktif',
    });
    const seedRes = await karyawanClient.create(targetPayload);
    expect(seedRes.status).toBe(201);

    // 2. Open UI and verify search
    await karyawanPage.goto();
    await karyawanPage.cari(targetPayload.nama);
    await karyawanPage.verifyKaryawanVisible(targetPayload.nama);

    // 3. Clear search filter
    await karyawanPage.bersihkanPencarian();
    await expect(karyawanPage.searchInput).toHaveValue('');
  });

  test('UI-04: Should edit existing karyawan details (API Seed ➔ UI Edit)', async ({ karyawanPage, karyawanClient }) => {
    // 1. Seed data via API (no dependency on Tambah UI modal)
    const initialPayload = DataGenerator.generateKaryawan({
      nama: `EditTarget ${DataGenerator.randomId()}`,
      jabatan: 'Staff',
      departemen: 'IT & Engineering',
      status: 'Aktif',
    });
    const seedRes = await karyawanClient.create(initialPayload);
    expect(seedRes.status).toBe(201);

    // 2. Open UI and perform Edit
    await karyawanPage.goto();
    await karyawanPage.editKaryawan(initialPayload.nama, {
      nama: initialPayload.nama,
      nik: initialPayload.nik,
      jabatan: 'Manager',
      departemen: 'Finance & Accounting',
    });

    // 3. Verify update outcome
    await karyawanPage.verifyToast('Data berhasil diperbarui.');
    const updatedRow = karyawanPage.getRowByName(initialPayload.nama);
    await expect(updatedRow).toContainText('Manager');
  });

  test('UI-05: Should delete karyawan with confirmation dialog (API Seed ➔ UI Delete)', async ({ karyawanPage, karyawanClient }) => {
    // 1. Seed data via API specifically for delete testing
    const delPayload = DataGenerator.generateKaryawan({
      nama: `DeleteTarget ${DataGenerator.randomId()}`,
      jabatan: 'Staff',
      departemen: 'Operations',
      status: 'Aktif',
    });
    const seedRes = await karyawanClient.create(delPayload);
    expect(seedRes.status).toBe(201);

    // 2. Open UI and perform Delete
    await karyawanPage.goto();
    await karyawanPage.verifyKaryawanVisible(delPayload.nama);
    await karyawanPage.hapusKaryawan(delPayload.nama);

    // 3. Verify deletion
    await karyawanPage.verifyToast('Karyawan berhasil dihapus.');
    await karyawanPage.verifyKaryawanNotVisible(delPayload.nama);
  });
});
