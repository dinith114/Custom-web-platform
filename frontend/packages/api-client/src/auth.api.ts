// Auth API — login(), register(), getProfile(), updateProfile()

import { apiClient } from "./client";
import type {
  ApiResponse,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@builder/types";

export const authApi = {
  /** POST /api/auth/login — authenticate and return JWT */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", payload);
    return data.data;
  },

  /** POST /api/auth/register — create new user account */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", payload);
    return data.data;
  },

  /** GET /api/auth/profile — get current user profile */
  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>("/auth/profile");
    return data.data;
  },

  /** PUT /api/auth/profile — update display name, avatar, etc. */
  updateProfile: async (payload: Partial<User>): Promise<User> => {
    const { data } = await apiClient.put<ApiResponse<User>>("/auth/profile", payload);
    return data.data;
  },

  /** POST /api/auth/logout — invalidate session (client-side token removal) */
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
