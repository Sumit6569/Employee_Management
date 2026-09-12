import axios from 'axios';
import type { ApiResponse } from '../Types/ApiResponseTypes';
import keycloak from '../config/keycloak';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    try {
      await keycloak.updateToken(30);

      config.headers.Authorization = `Bearer ${keycloak.token}`;
    } catch (error: unknown) {
      console.error('Failed to refresh Keycloak token:', error);

      await keycloak.logout({
        redirectUri: window.location.origin,
      });
    }
  }

  return config;
});

export async function get<T>(url: string): Promise<T> {
  const response = await httpClient.get<ApiResponse<T>>(url);
  return response.data.data;
}

export async function post<T, D>(url: string, body: D) {
  const response = await httpClient.post<ApiResponse<T>>(url, body);
  return response.data.data;
}

export async function put<T, D>(url: string, body: D) {
  const response = await httpClient.put<ApiResponse<T>>(url, body);
  return response.data.data;
}

export async function del(url: string) {
  const response = await httpClient.delete(url);
  return response.data.data;
}

export default httpClient;
