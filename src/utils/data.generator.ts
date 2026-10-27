import { CreateKaryawanDto } from '../models/karyawan.model';
import { CreateMakananDto } from '../models/makanan.model';
import { CreatePakaianDto } from '../models/pakaian.model';

/**
 * DataGenerator provides dynamic, randomized payloads for atomic & isolated test execution.
 * Prevents test data collisions when tests run concurrently across multiple workers.
 */
export class DataGenerator {
  public static randomId(prefix = ''): string {
    const rand = Math.random().toString(36).substring(2, 8);
    const time = Date.now().toString().slice(-4);
    return prefix ? `${prefix}_${time}_${rand}` : `${time}_${rand}`;
  }

  public static randomNik(): string {
    return `327${Math.floor(100000 + Math.random() * 900000)}`;
  }

  public static randomPrice(min = 10000, max = 250000): string {
    const val = Math.floor(Math.random() * ((max - min) / 1000) + min / 1000) * 1000;
    return val.toString();
  }

  public static randomStock(min = 1, max = 100): string {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  public static generateKaryawan(override?: Partial<CreateKaryawanDto>): CreateKaryawanDto {
    const unique = this.randomId();
    return {
      nama: `Karyawan ${unique}`,
      nik: this.randomNik(),
      jabatan: 'QA Automation Specialist',
      departemen: 'IT & Engineering',
      bergabung: new Date().toISOString().split('T')[0],
      status: 'Aktif',
      ...override,
    };
  }

  public static generateMakanan(override?: Partial<CreateMakananDto>): CreateMakananDto {
    const unique = this.randomId();
    return {
      nama: `Menu Kuliner ${unique}`,
      kategori: 'Makanan Berat',
      harga: this.randomPrice(15000, 75000),
      stok: this.randomStock(5, 50),
      kalori: (Math.floor(Math.random() * 400) + 200).toString(),
      deskripsi: `Deskripsi otomatis kuliner ${unique}`,
      tersedia: 'Tersedia',
      ...override,
    };
  }

  public static generatePakaian(override?: Partial<CreatePakaianDto>): CreatePakaianDto {
    const unique = this.randomId();
    const sizes = ['S', 'M', 'L', 'XL'];
    const chosenSize = sizes[Math.floor(Math.random() * sizes.length)];
    return {
      nama: `Outfit ${unique}`,
      merek: `Brand-${unique.slice(-4).toUpperCase()}`,
      gender: 'Pria',
      ukuran: [chosenSize],
      kondisi: 'Baru',
      warna: 'Navy Black',
      warna_hex: '#1e293b',
      harga: this.randomPrice(50000, 350000),
      stok: this.randomStock(1, 30),
      ...override,
    };
  }
}
