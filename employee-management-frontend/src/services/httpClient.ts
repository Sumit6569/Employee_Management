import axios from "axios";
import type { ApiResponse } from "../Types/ApiResponseTypes";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function get<T>(url:string):Promise<T>{
    const response = await httpClient.get<ApiResponse<T>>(url);
    return response.data.data;
}
export async function post<T,D>(url:string,body:D) {
    const response = await httpClient.post<ApiResponse<T>>(url,body);
    return response.data.data;
}
export async function put<T,D>(url:string,body:D) {
    const response = await httpClient.get<ApiResponse<T>>(url,body);
    return response.data.data;
}

export default httpClient;