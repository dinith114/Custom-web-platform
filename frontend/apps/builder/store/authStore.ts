// authStore — auto-authenticates with mock user in dev mode
import { create } from "zustand";
import type { User } from "@builder/types";
import { MOCK_USER } from "@/lib/mockData";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USER as any,
  token: "mock-jwt-token-dev",
  isAuthenticated: true,
  setAuth: (user, token) => {
    if (typeof window !== "undefined") localStorage.setItem("auth_token", token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem("auth_token");
    set({ user: null, token: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    // In dev mode, always authenticated with mock user
    set({ user: MOCK_USER as any, token: "mock-jwt-token-dev", isAuthenticated: true });
  },
}));
