// Site — represents a user's website/project

export type SiteStatus = "draft" | "published";

export interface SiteSettings {
  favicon?: string;
  logo?: string;
  primaryColor?: string;
  fontFamily?: string;
  customCss?: string;
}

export interface Site {
  _id: string;
  ownerId: string;
  name: string;
  slug: string;
  status: SiteStatus;
  subdomain?: string;
  customDomain?: string;
  templateId?: string;
  settings?: SiteSettings;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreateSitePayload {
  name: string;
  slug?: string;
  templateId?: string;
}

export interface UpdateSitePayload {
  name?: string;
  slug?: string;
  settings?: Partial<SiteSettings>;
}
