// Template — starter template for new sites

export type TemplateCategory = "business" | "portfolio" | "ecommerce" | "blog" | "landing";

export interface Template {
  _id: string;
  name: string;
  thumbnail?: string;
  category: TemplateCategory;
  defaultPages: unknown[];
  defaultNavigation: unknown;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
