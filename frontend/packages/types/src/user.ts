// User — represents a platform user

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "suspended";
export type SiteRole = "owner" | "editor" | "viewer";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SiteMember {
  _id: string;
  userId: string;
  siteId: string;
  role: SiteRole;
  invitedAt: string;
  user?: User;
}
