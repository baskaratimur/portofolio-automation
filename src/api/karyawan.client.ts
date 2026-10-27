import { AxiosResponse } from 'axios';
import { BaseClient } from './base.client';
import { ApiResponse } from '../models/api.model';
import { Karyawan, CreateKaryawanDto, UpdateKaryawanDto } from '../models/karyawan.model';

export class KaryawanClient extends BaseClient {
  private readonly endpoint = '/api/karyawan';

  public async getAll(): Promise<AxiosResponse<ApiResponse<Karyawan[]>>> {
    return this.axiosInstance.get<ApiResponse<Karyawan[]>>(this.endpoint);
  }

  public async getById(id: number | string): Promise<AxiosResponse<ApiResponse<Karyawan>>> {
    return this.axiosInstance.get<ApiResponse<Karyawan>>(`${this.endpoint}/${id}`);
  }

  public async create(payload: CreateKaryawanDto): Promise<AxiosResponse<ApiResponse<Karyawan>>> {
    return this.axiosInstance.post<ApiResponse<Karyawan>>(this.endpoint, payload);
  }

  public async update(id: number | string, payload: UpdateKaryawanDto): Promise<AxiosResponse<ApiResponse<Karyawan>>> {
    return this.axiosInstance.put<ApiResponse<Karyawan>>(`${this.endpoint}/${id}`, payload);
  }

  public async delete(id: number | string): Promise<AxiosResponse<ApiResponse<Karyawan>>> {
    return this.axiosInstance.delete<ApiResponse<Karyawan>>(`${this.endpoint}/${id}`);
  }
}