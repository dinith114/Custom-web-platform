// Sites API — createSite(), getSites(), getSite(), updateSite(), deleteSite()

import { apiClient } from "./client";
import type {
  ApiResponse,
  Site,
  CreateSitePayload,
  UpdateSitePayload,
} from "@builder/types";

export const sitesApi = {
  /** GET /api/sites — list all sites owned by current user */
  getSites: async (): Promise<Site[]> => {
    const { data } = await apiClient.get<ApiResponse<Site[]>>("/sites");
    return data.data;
  },

  /** POST /api/sites — create a new site */
  createSite: async (payload: CreateSitePayload): Promise<Site> => {
    const { data } = await apiClient.post<ApiResponse<Site>>("/sites", payload);
    return data.data;
  },

  /** GET /api/sites/:siteId — get site details */
  getSite: async (siteId: string): Promise<Site> => {
    const { data } = await apiClient.get<ApiResponse<Site>>(`/sites/${siteId}`);
    return data.data;
  },

  /** PUT /api/sites/:siteId — update site settings */
  updateSite: async (siteId: string, payload: UpdateSitePayload): Promise<Site> => {
    const { data } = await apiClient.put<ApiResponse<Site>>(`/sites/${siteId}`, payload);
    return data.data;
  },

  /** DELETE /api/sites/:siteId — delete site (owner only) */
  deleteSite: async (siteId: string): Promise<void> => {
    await apiClient.delete(`/sites/${siteId}`);
  },

  /** POST /api/sites/:siteId/publish — publish all pages at once */
  publishSite: async (siteId: string): Promise<Site> => {
    const { data } = await apiClient.post<ApiResponse<Site>>(`/sites/${siteId}/publish`);
    return data.data;
  },
};
