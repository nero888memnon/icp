import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Base API URL - fallback to localhost if not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Allows cookies and credentials to be sent
  timeout: 10000, // Optional: Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Default header
  },
});

// Request Interceptor - Attach Authorization Token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle Responses and Errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Handle HTTP errors (e.g., 401 Unauthorized, 500 Server Error)
      if (error.response.status === 401) {
        console.warn('Unauthorized - Redirecting to login');
        localStorage.removeItem('auth-token'); // Optional: Clear invalid tokens
        window.location.href = '/ic-connect'; // Redirect to login page
      } else {
        console.error(`Error ${error.response.status}:`, error.response.data);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
