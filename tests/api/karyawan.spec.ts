import { test, expect } from './fixtures/api.fixture';
import { DataGenerator } from '../../src/utils/data.generator';

test.describe('Karyawan API Endpoints (Atomic & Independent CRUD)', () => {
  test('GET /api/karyawan should return list of karyawan', async ({ karyawanClient }) => {
    const response = await karyawanClient.getAll();

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  test('POST /api/karyawan should successfully create a new karyawan with dynamic data', async ({ karyawanClient }) => {
    const payload = DataGenerator.generateKaryawan();
    const response = await karyawanClient.create(payload);

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Data berhasil ditambahkan.');
    expect(response.data.data.id).toBeDefined();
    expect(response.data.data.nama).toBe(payload.nama);
    expect(response.data.data.nik).toBe(payload.nik);
    expect(response.data.data.jabatan).toBe(payload.jabatan);
  });

  test('GET /api/karyawan/:id should retrieve specific karyawan independently', async ({ karyawanClient }) => {
    // Self-contained: Create entity first to ensure isolation
    const payload = DataGenerator.generateKaryawan();
    const createRes = await karyawanClient.create(payload);
    const createdId = createRes.data.data.id;
    
    const response = await karyawanClient.getById(createdId);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(createdId);
    expect(response.data.data.nama).toBe(payload.nama);
    expect(response.data.data.nik).toBe(payload.nik);
  });

  test('PUT /api/karyawan/:id should update existing karyawan independently', async ({ karyawanClient }) => {
    // Self-contained: Create entity first
    const payload = DataGenerator.generateKaryawan();
    const createRes = await karyawanClient.create(payload);
    const createdId = createRes.data.data.id;

    const updatePayload = {
      jabatan: 'Principal QA Lead ' + DataGenerator.randomId(),
      status: 'Aktif',
    };

    const response = await karyawanClient.update(createdId, updatePayload);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Data berhasil diperbarui.');
    expect(response.data.data.id).toBe(createdId);
    expect(response.data.data.jabatan).toBe(updatePayload.jabatan);
  });

  test('DELETE /api/karyawan/:id should delete karyawan independently', async ({ karyawanClient }) => {
    // Self-contained: Create entity first
    const payload = DataGenerator.generateKaryawan();
    const createRes = await karyawanClient.create(payload);
    const createdId = createRes.data.data.id;

    const deleteRes = await karyawanClient.delete(createdId);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.data.success).toBe(true);
    expect(deleteRes.data.message).toBe('Data berhasil dihapus.');

    // Verify entity no longer exists
    const verifyRes = await karyawanClient.getById(createdId);
    expect(verifyRes.status).toBe(404);
    expect(verifyRes.data.success).toBe(false);
  });

  test('GET /api/karyawan/:id should return 404 for non-existent ID', async ({ karyawanClient }) => {
    const nonExistentId = 9999900000 + Math.floor(Math.random() * 10000);
    const response = await karyawanClient.getById(nonExistentId);

    expect(response.status).toBe(404);
    expect(response.data.success).toBe(false);
    expect(response.data.message).toBe('Data tidak ditemukan.');
  });

  test('DELETE /api/karyawan/:id should return 404 when deleting non-existent ID', async ({ karyawanClient }) => {
    const nonExistentId = 9999900000 + Math.floor(Math.random() * 10000);
    const response = await karyawanClient.delete(nonExistentId);

    expect(response.status).toBe(404);
    expect(response.data.success).toBe(false);
    expect(response.data.message).toBe('Data tidak ditemukan.');
  });
});
