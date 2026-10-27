import { AxiosResponse } from 'axios';
import { BaseClient } from './base.client';
import { ApiResponse } from '../models/api.model';
import { Makanan, CreateMakananDto, UpdateMakananDto } from '../models/makanan.model';

export class MakananClient extends BaseClient {
  private readonly endpoint = '/api/makanan';

  public async getAll(): Promise<AxiosResponse<ApiResponse<Makanan[]>>> {
    return this.axiosInstance.get<ApiResponse<Makanan[]>>(this.endpoint);
  }

  public async getById(id: number | string): Promise<AxiosResponse<ApiResponse<Makanan>>> {
    return this.axiosInstance.get<ApiResponse<Makanan>>(`${this.endpoint}/${id}`);
  }

  public async create(payload: CreateMakananDto): Promise<AxiosResponse<ApiResponse<Makanan>>> {
    return this.axiosInstance.post<ApiResponse<Makanan>>(this.endpoint, payload);
  }

  public async update(id: number | string, payload: UpdateMakananDto): Promise<AxiosResponse<ApiResponse<Makanan>>> {
    return this.axiosInstance.put<ApiResponse<Makanan>>(`${this.endpoint}/${id}`, payload);
  }

  public async delete(id: number | string): Promise<AxiosResponse<ApiResponse<Makanan>>> {
    return this.axiosInstance.delete<ApiResponse<Makanan>>(`${this.endpoint}/${id}`);
  }
}
