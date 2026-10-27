import { test, expect } from './fixtures/api.fixture';
import { DataGenerator } from '../../src/utils/data.generator';

test.describe('Pakaian API Endpoints (Atomic & Independent CRUD)', () => {
  test('GET /api/pakaian should return list of pakaian', async ({ pakaianClient }) => {
    const response = await pakaianClient.getAll();

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  test('POST /api/pakaian should create new pakaian with dynamic data', async ({ pakaianClient }) => {
    const payload = DataGenerator.generatePakaian();
    const response = await pakaianClient.create(payload);

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Data berhasil ditambahkan.');
    expect(response.data.data.id).toBeDefined();
    expect(response.data.data.nama).toBe(payload.nama);
    expect(response.data.data.merek).toBe(payload.merek);
  });

  test('GET /api/pakaian/:id should retrieve specific pakaian independently', async ({ pakaianClient }) => {
    const payload = DataGenerator.generatePakaian();
    const createRes = await pakaianClient.create(payload);
    const createdId = createRes.data.data.id;

    const response = await pakaianClient.getById(createdId);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(createdId);
    expect(response.data.data.nama).toBe(payload.nama);
  });

  test('PUT /api/pakaian/:id should update existing pakaian independently', async ({ pakaianClient }) => {
    const payload = DataGenerator.generatePakaian();
    const createRes = await pakaianClient.create(payload);
    const createdId = createRes.data.data.id;

    const updatePayload = {
      harga: DataGenerator.randomPrice(150000, 450000),
      stok: '25',
    };

    const response = await pakaianClient.update(createdId, updatePayload);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Data berhasil diperbarui.');
    expect(response.data.data.id).toBe(createdId);
    expect(response.data.data.harga).toBe(updatePayload.harga);
    expect(response.data.data.stok).toBe(updatePayload.stok);
  });

  test('DELETE /api/pakaian/:id should remove pakaian independently', async ({ pakaianClient }) => {
    const payload = DataGenerator.generatePakaian();
    const createRes = await pakaianClient.create(payload);
    const createdId = createRes.data.data.id;

    const deleteRes = await pakaianClient.delete(createdId);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.data.success).toBe(true);
    expect(deleteRes.data.message).toBe('Data berhasil dihapus.');

    const verifyRes = await pakaianClient.getById(createdId);
    expect(verifyRes.status).toBe(404);
    expect(verifyRes.data.success).toBe(false);
  });

  test('GET /api/pakaian/:id should return 404 for non-existent ID', async ({ pakaianClient }) => {
    const nonExistentId = 9999900000 + Math.floor(Math.random() * 10000);
    const response = await pakaianClient.getById(nonExistentId);

    expect(response.status).toBe(404);
    expect(response.data.success).toBe(false);
  });
});
