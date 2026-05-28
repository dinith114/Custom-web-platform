// Zod schemas for form validation — login, register, site, page
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createSiteSchema = z.object({
  name: z.string().min(1, "Site name is required").max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
});

export const createPageSchema = z.object({
  title: z.string().min(1, "Page title is required").max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
  isHomePage: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateSiteFormData = z.infer<typeof createSiteSchema>;
export type CreatePageFormData = z.infer<typeof createPageSchema>;
