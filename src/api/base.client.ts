import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export abstract class BaseClient {
  protected axiosInstance: AxiosInstance;

  constructor() {
    const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      // kalau di false, nnti ketika ada error lgsg crash/distop
      validateStatus: () => true,
    });

    this.axiosInstance.interceptors.response.use(
          (response: AxiosResponse) => {
            // console.log(`[LOG SUCCESS] ${response.config.method?.toUpperCase()} ${response.config.url}`);
            // console.log('Response Data:', JSON.stringify(response.data, null, 2));
            return response;
          },
          (error) => {
            if (error.response) {
              console.error(`[LOG ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.response.status}`);
              console.error('Error Detail:', JSON.stringify(error.response.data, null, 2));
            } else {
              console.error('[LOG ERROR] Network Error or Server Down:', error.message);
            }     
            return Promise.reject(error);
          }
      );
  }
}
