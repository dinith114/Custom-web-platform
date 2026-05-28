// useAuth — login, logout, token refresh, auth state hook
"use client";
import { useAuthStore } from "@/store/authStore";
import { authApi, setAuthToken } from "@builder/api-client";
import type { LoginPayload, RegisterPayload } from "@builder/types";

export function useAuth() {
  const { user, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore();

  const login = async (payload: LoginPayload) => {
    const result = await authApi.login(payload);
    setAuthToken(result.token);
    setAuth(result.user, result.token);
    return result;
  };

  const register = async (payload: RegisterPayload) => {
    const result = await authApi.register(payload);
    setAuthToken(result.token);
    setAuth(result.user, result.token);
    return result;
  };

  const logout = () => {
    setAuthToken(null);
    storeLogout();
  };

  return { user, isAuthenticated, login, register, logout };
}
