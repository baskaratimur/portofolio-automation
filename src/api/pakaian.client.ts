import { AxiosResponse } from 'axios';
import { BaseClient } from './base.client';
import { ApiResponse } from '../models/api.model';
import { Pakaian, CreatePakaianDto, UpdatePakaianDto } from '../models/pakaian.model';

export class PakaianClient extends BaseClient {
  private readonly endpoint = '/api/pakaian';

  public async getAll(): Promise<AxiosResponse<ApiResponse<Pakaian[]>>> {
    return this.axiosInstance.get<ApiResponse<Pakaian[]>>(this.endpoint);
  }

  public async getById(id: number | string): Promise<AxiosResponse<ApiResponse<Pakaian>>> {
    return this.axiosInstance.get<ApiResponse<Pakaian>>(`${this.endpoint}/${id}`);
  }

  public async create(payload: CreatePakaianDto): Promise<AxiosResponse<ApiResponse<Pakaian>>> {
    return this.axiosInstance.post<ApiResponse<Pakaian>>(this.endpoint, payload);
  }

  public async update(id: number | string, payload: UpdatePakaianDto): Promise<AxiosResponse<ApiResponse<Pakaian>>> {
    return this.axiosInstance.put<ApiResponse<Pakaian>>(`${this.endpoint}/${id}`, payload);
  }

  public async delete(id: number | string): Promise<AxiosResponse<ApiResponse<Pakaian>>> {
    return this.axiosInstance.delete<ApiResponse<Pakaian>>(`${this.endpoint}/${id}`);
  }
}
