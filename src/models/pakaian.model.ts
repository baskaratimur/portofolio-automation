export interface Pakaian {
  id: number;
  nama: string;
  merek: string;
  gender: string;
  ukuran: string[];
  kondisi: string;
  warna: string;
  warna_hex?: string;
  harga: string | number;
  stok: string | number;
}

export interface CreatePakaianDto {
  nama: string;
  merek: string;
  gender: string;
  ukuran: string[];
  kondisi: string;
  warna: string;
  warna_hex?: string;
  harga: string | number;
  stok: string | number;
}

export type UpdatePakaianDto = Partial<CreatePakaianDto>;
