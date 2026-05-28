// Public API — fetchPublicSite(), fetchPublicPage(), fetchPublicNav()
// No authentication required — serves only published content

import { apiClient } from "./client";
import type { ApiResponse, Site, Page, NavTree } from "@builder/types";

export const publicApi = {
  /** GET /api/public/sites/:siteSlug — load published site info + homepage */
  fetchPublicSite: async (siteSlug: string): Promise<Site> => {
    const { data } = await apiClient.get<ApiResponse<Site>>(`/public/sites/${siteSlug}`);
    return data.data;
  },

  /** GET /api/public/sites/:siteSlug/pages/:pageSlug — load a specific published page */
  fetchPublicPage: async (siteSlug: string, pageSlug: string): Promise<Page> => {
    const { data } = await apiClient.get<ApiResponse<Page>>(
      `/public/sites/${siteSlug}/pages/${pageSlug}`
    );
    return data.data;
  },

  /** GET /api/public/sites/:siteSlug/navigation — load published navigation */
  fetchPublicNav: async (siteSlug: string): Promise<NavTree> => {
    const { data } = await apiClient.get<ApiResponse<NavTree>>(
      `/public/sites/${siteSlug}/navigation`
    );
    return data.data;
  },
};
