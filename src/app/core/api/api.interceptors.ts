import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from './api-error';

// We avoid injecting Angular services directly here to prevent circular dependencies.
// For auth tokens, we can read from localStorage directly or expose a setter from the AuthService.

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
}

/**
 * Configures the request and response interceptors on the provided Axios instance.
 */
export function setupInterceptors(instance: AxiosInstance): void {
  
  // ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
      
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // 1. Handle Request Cancellation
      if (axios.isCancel(error)) {
        return Promise.reject(
          new ApiError({
            message: 'Request was cancelled',
            userMessage: 'The request was cancelled by the user.',
            code: 'CANCELLED',
          })
        );
      }

      // 2. Handle 401 Unauthorized (Token Refresh)
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        // Prevent infinite loops by marking the request
        originalRequest._retry = true;

        if (isRefreshing) {
          // If already refreshing, queue the request and wait
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;

        try {
          // Manually call refresh endpoint using raw axios to avoid circular dependencies
          // with ApiClient/AuthService
          const refreshResponse = await axios.post('/api/v1/auth/refresh');
          const newToken = refreshResponse.data.accessToken;

          localStorage.setItem('access_token', newToken);
          processQueue(null, newToken);
          
          originalRequest.headers.Authorization = 'Bearer ' + newToken;
          return instance(originalRequest);

        } catch (refreshError) {
          processQueue(refreshError, null);
          // If refresh fails, clear the local token
          localStorage.removeItem('access_token');
          // In a real app we might redirect to /login here, 
          // but we leave that to the AuthService/Router
          return Promise.reject(normalizeAxiosError(error));
        } finally {
          isRefreshing = false;
        }
      }

      // 3. Normalize to ApiError
      return Promise.reject(normalizeAxiosError(error));
    }
  );
}

/**
 * Normalizes an AxiosError into our standardized ApiError.
 */
function normalizeAxiosError(error: AxiosError<any>): ApiError {
  const status = error.response?.status;
  const data = error.response?.data;
  
  // Default fallback message
  let userMessage = 'An unexpected error occurred. Please try again later.';
  let message = error.message;
  let code = error.code;
  let details: Record<string, string[]> | undefined = undefined;

  if (error.response) {
    // The request was made and the server responded with a status code outside of 2xx
    
    // Use server-provided message if available (following ApiErrorResponse format)
    if (data && typeof data === 'object') {
      if (data.message) {
        userMessage = data.message;
      }
      if (data.details) {
        details = data.details;
      }
    } else {
      // Fallback based on HTTP status code
      switch (status) {
        case 400:
          userMessage = 'Invalid request. Please check your inputs.';
          break;
        case 401:
          userMessage = 'You must be logged in to access this resource.';
          break;
        case 403:
          userMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          userMessage = 'The requested resource could not be found.';
          break;
        case 409:
          userMessage = 'There was a conflict with your request. This item might already exist.';
          break;
        case 500:
          userMessage = 'The server encountered an error. Our team has been notified.';
          break;
      }
    }
  } else if (error.request) {
    // The request was made but no response was received (Network error, timeout, CORS)
    userMessage = 'Unable to connect to the server. Please check your internet connection.';
    message = 'No response received from server.';
    code = 'NETWORK_ERROR';
  }

  return new ApiError({
    message,
    userMessage,
    status,
    code,
    details
  });
}
