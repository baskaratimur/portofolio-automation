export interface Karyawan {
  id: number;
  nama: string;
  nik: string;
  jabatan: string;
  departemen: string;
  bergabung: string;
  status: 'Aktif' | 'Non-Aktif' | string;
}

export interface CreateKaryawanDto {
  nama: string;
  nik: string;
  jabatan: string;
  departemen: string;
  bergabung: string;
  status: string;
}

export type UpdateKaryawanDto = Partial<CreateKaryawanDto>;
