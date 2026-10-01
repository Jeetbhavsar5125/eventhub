import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from './axios-instance';

/**
 * ApiClient Service
 * 
 * An Angular service wrapper around the centralized Axios instance.
 * Converts Axios Promises to RxJS Observables, preventing components
 * from interacting with Axios directly.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  /**
   * Generic GET request
   */
  get<T>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return from(
      axiosInstance.get<T>(url, config).then((response: AxiosResponse<T>) => response.data)
    );
  }

  /**
   * Generic POST request
   */
  post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Observable<T> {
    return from(
      axiosInstance.post<T>(url, data, config).then((response: AxiosResponse<T>) => response.data)
    );
  }

  /**
   * Generic PUT request
   */
  put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Observable<T> {
    return from(
      axiosInstance.put<T>(url, data, config).then((response: AxiosResponse<T>) => response.data)
    );
  }

  /**
   * Generic PATCH request
   */
  patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Observable<T> {
    return from(
      axiosInstance.patch<T>(url, data, config).then((response: AxiosResponse<T>) => response.data)
    );
  }

  /**
   * Generic DELETE request
   */
  delete<T>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return from(
      axiosInstance.delete<T>(url, config).then((response: AxiosResponse<T>) => response.data)
    );
  }
}
