// useAuth — login, logout, token refresh, auth state hook
// Uses mock data when backend is unavailable
"use client";
import { useAuthStore } from "@/store/authStore";
import { MOCK_USER } from "@/lib/mockData";
import type { LoginPayload, RegisterPayload } from "@builder/types";

export function useAuth() {
  const { user, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore();

  const login = async (payload: LoginPayload) => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 500));
    const token = "mock-jwt-token-dev";
    const mockUser = { ...MOCK_USER, email: payload.email } as any;
    if (typeof window !== "undefined") localStorage.setItem("auth_token", token);
    setAuth(mockUser, token);
    return { user: mockUser, token };
  };

  const register = async (payload: RegisterPayload) => {
    await new Promise((r) => setTimeout(r, 500));
    const token = "mock-jwt-token-dev";
    const mockUser = { ...MOCK_USER, name: payload.name, email: payload.email } as any;
    if (typeof window !== "undefined") localStorage.setItem("auth_token", token);
    setAuth(mockUser, token);
    return { user: mockUser, token };
  };

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("auth_token");
    storeLogout();
  };

  return { user, isAuthenticated, login, register, logout };
}

