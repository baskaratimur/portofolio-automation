export interface Makanan {
  id: number;
  nama: string;
  kategori: string;
  harga: string | number;
  stok: string | number;
  kalori?: string | number;
  deskripsi?: string;
  tersedia: string;
}

export interface CreateMakananDto {
  nama: string;
  kategori: string;
  harga: string | number;
  stok: string | number;
  kalori?: string | number;
  deskripsi?: string;
  tersedia: string;
}

export type UpdateMakananDto = Partial<CreateMakananDto>;
