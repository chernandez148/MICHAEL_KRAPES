// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response.data, // Unwrap data automatically
  (error) => {
    // Expired or invalid admin session: clear it and send the studio back to login.
    if (error.response?.status === 401 && window.location.pathname.startsWith("/admin")
        && !error.config?.url?.endsWith("/admin/login")) {
      localStorage.removeItem('token');
      localStorage.removeItem('token-expires');
      window.location.assign('/admin/login');
    }
    return Promise.reject(error);
  }
);