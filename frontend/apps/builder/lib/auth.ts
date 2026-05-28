// Token storage helpers — get/set/remove from cookies and localStorage
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
  document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
};

export const removeToken = (): void => {
  localStorage.removeItem("auth_token");
  document.cookie = "auth_token=; path=/; max-age=0";
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
