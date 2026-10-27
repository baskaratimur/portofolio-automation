import { test, expect } from './fixtures/api.fixture';
import { DataGenerator } from '../../src/utils/data.generator';

test.describe('Makanan API Endpoints (Atomic & Independent CRUD)', () => {
  test('GET /api/makanan should return list of makanan', async ({ makananClient }) => {
    const response = await makananClient.getAll();

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  test('POST /api/makanan should create new makanan with dynamic data', async ({ makananClient }) => {
    const payload = DataGenerator.generateMakanan();
    const response = await makananClient.create(payload);

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Data berhasil ditambahkan.');
    expect(response.data.data.id).toBeDefined();
    expect(response.data.data.nama).toBe(payload.nama);
    expect(response.data.data.harga).toBe(payload.harga);
  });

  test('GET /api/makanan/:id should retrieve specific makanan independently', async ({ makananClient }) => {
    const payload = DataGenerator.generateMakanan();
    const createRes = await makananClient.create(payload);
    const createdId = createRes.data.data.id;

    const response = await makananClient.getById(createdId);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).toBe(createdId);
    expect(response.data.data.nama).toBe(payload.nama);
  });

  test('PUT /api/makanan/:id should update existing makanan independently', async ({ makananClient }) => {
    const payload = DataGenerator.generateMakanan();
    const createRes = await makananClient.create(payload);
    const createdId = createRes.data.data.id;

    const updatePayload = {
      harga: DataGenerator.randomPrice(80000, 120000),
      stok: '99',
    };

    const response = await makananClient.update(createdId, updatePayload);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Data berhasil diperbarui.');
    expect(response.data.data.id).toBe(createdId);
    expect(response.data.data.harga).toBe(updatePayload.harga);
    expect(response.data.data.stok).toBe(updatePayload.stok);
  });

  test('DELETE /api/makanan/:id should remove makanan independently', async ({ makananClient }) => {
    const payload = DataGenerator.generateMakanan();
    const createRes = await makananClient.create(payload);
    const createdId = createRes.data.data.id;

    const deleteRes = await makananClient.delete(createdId);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.data.success).toBe(true);
    expect(deleteRes.data.message).toBe('Data berhasil dihapus.');

    const verifyRes = await makananClient.getById(createdId);
    expect(verifyRes.status).toBe(404);
    expect(verifyRes.data.success).toBe(false);
  });

  test('GET /api/makanan/:id should return 404 for non-existent ID', async ({ makananClient }) => {
    const nonExistentId = 9999900000 + Math.floor(Math.random() * 10000);
    const response = await makananClient.getById(nonExistentId);

    expect(response.status).toBe(404);
    expect(response.data.success).toBe(false);
  });
});
