// Base Axios instance — config, auth interceptor, error transform
// All API calls go through this client

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "@builder/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach JWT token to all requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token retrieval is handled by the consuming app
    // This is a placeholder — apps should set the token via setAuthToken()
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — transform errors to consistent format
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      }
    }
    const message = error.response?.data?.error || error.message || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

// Helper to set auth token programmatically
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_token");
  }
};
