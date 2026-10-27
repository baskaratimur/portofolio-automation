import { Page, Locator, expect } from '@playwright/test';

export interface KaryawanFormData {
  nama: string;
  nik: string;
  jabatan?: 'Staff' | 'Supervisor' | 'Manager' | 'Direktur';
  departemen?: 'IT & Engineering' | 'Human Resources' | 'Finance & Accounting' | 'Marketing' | 'Operations' | 'Sales' | 'Legal & Compliance' | string;
  bergabung?: string;
  status?: 'Aktif' | 'Nonaktif';
}

/**
 * Page Object Model for Karyawan Management (/karyawan).
 * Implements accessible locator best practices and encapsulated actions.
 */
export class KaryawanPage {
  readonly page: Page;

  // Header & Controls
  readonly btnTambahKaryawan: Locator;
  readonly searchInput: Locator;
  readonly searchClearBtn: Locator;
  readonly tableBody: Locator;
  readonly tableRows: Locator;

  // Modal Form Locators
  readonly modalOverlay: Locator;
  readonly modalTitle: Locator;
  readonly inputNama: Locator;
  readonly inputNik: Locator;
  readonly selectDepartemen: Locator;
  readonly inputTanggalBergabung: Locator;
  readonly btnSimpan: Locator;
  readonly btnBatalModal: Locator;

  // Confirmation Dialog
  readonly confirmOverlay: Locator;
  readonly btnConfirmYes: Locator;
  readonly btnConfirmNo: Locator;

  // Toast Container
  readonly toastContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header & Toolbar
    this.btnTambahKaryawan = page.getByRole('button', { name: /tambah karyawan/i });
    this.searchInput = page.getByTestId('search-input');
    this.searchClearBtn = page.locator('#search-clear');
    this.tableBody = page.locator('#karyawan-tbody');
    this.tableRows = page.locator('#karyawan-tbody tr');

    // Modal
    this.modalOverlay = page.locator('#karyawan-modal');
    this.modalTitle = page.locator('#karyawan-modal-title');
    this.inputNama = page.getByRole('textbox', { name: 'Nama Lengkap *' });
    this.inputNik = page.getByRole('textbox', { name: 'NIK *' });
    this.selectDepartemen = page.locator('#k-departemen');
    this.inputTanggalBergabung = page.getByRole('textbox', { name: 'Tanggal Bergabung *' });
    this.btnSimpan = page.getByRole('button', { name: /simpan/i });
    this.btnBatalModal = page.getByRole('button', { name: 'Batal' }).first();

    // Confirm dialog
    this.confirmOverlay = page.locator('#confirm-overlay');
    this.btnConfirmYes = page.getByRole('button', { name: 'Ya, Lanjutkan' });
    this.btnConfirmNo = page.getByRole('button', { name: 'Batal' }).last();

    // Feedback
    this.toastContainer = page.locator('#toast-container');
  }

  async goto(): Promise<void> {
    await this.page.goto('/karyawan');
    await this.tableBody.waitFor({ state: 'visible' });
  }

  async openModalTambah(): Promise<void> {
    await this.btnTambahKaryawan.click();
    await expect(this.modalOverlay).toBeVisible();
  }

  async fillForm(data: KaryawanFormData): Promise<void> {
    if (data.nama) await this.inputNama.fill(data.nama);
    if (data.nik) await this.inputNik.fill(data.nik);
    if (data.jabatan) {
      await this.page.getByRole('radio', { name: data.jabatan }).check();
    }
    if (data.departemen) {
      await this.selectDepartemen.selectOption(data.departemen);
    }
    if (data.bergabung) {
      await this.inputTanggalBergabung.fill(data.bergabung);
    }
    if (data.status) {
      const radioId = data.status === 'Aktif' ? '#k-status-aktif' : '#k-status-nonaktif';
      await this.page.locator(radioId).check();
    }
  }

  async submitForm(): Promise<void> {
    await this.btnSimpan.click();
  }

  async tambahKaryawan(data: KaryawanFormData): Promise<void> {
    await this.openModalTambah();
    await this.fillForm(data);
    await this.submitForm();
  }

  getRowByName(nama: string): Locator {
    return this.page.locator('#karyawan-tbody tr', { hasText: nama });
  }

  async cari(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async bersihkanPencarian(): Promise<void> {
    await this.searchClearBtn.click();
  }

  async klikEdit(nama: string): Promise<void> {
    const row = this.getRowByName(nama);
    await row.getByRole('button', { name: '✏️' }).click();
    await expect(this.modalOverlay).toBeVisible();
  }

  async editKaryawan(nama: string, updatedData: KaryawanFormData): Promise<void> {
    await this.klikEdit(nama);
    await this.fillForm(updatedData);
    await this.submitForm();
  }

  async hapusKaryawan(nama: string): Promise<void> {
    const row = this.getRowByName(nama);
    await row.getByRole('button', { name: '🗑️' }).click();
    await expect(this.confirmOverlay).toBeVisible();
    await this.btnConfirmYes.click();
  }

  async verifyToast(message: string | RegExp): Promise<void> {
    const toast = this.toastContainer.filter({ hasText: message });
    await expect(toast).toBeVisible();
  }

  async verifyKaryawanVisible(nama: string): Promise<void> {
    await expect(this.getRowByName(nama)).toBeVisible();
  }

  async verifyKaryawanNotVisible(nama: string): Promise<void> {
    await expect(this.getRowByName(nama)).not.toBeVisible();
  }
}
