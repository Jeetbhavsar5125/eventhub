import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './api.interceptors';

/**
 * The unified Axios instance for the entire application.
 * Components and feature services should NOT use this directly,
 * but should instead use the ApiClient service.
 */
export const axiosInstance: AxiosInstance = axios.create({
  // In a real app, this might come from environment.ts
  // e.g. environment.apiUrl
  baseURL: '/api/v1',
  
  // Set a default timeout (e.g. 15 seconds)
  timeout: 15000,
  
  // Common headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Attach interceptors to the instance
setupInterceptors(axiosInstance);
