// Pages API — createPage(), getPages(), getPage(), saveDraft(), publishPage()

import { apiClient } from "./client";
import type {
  ApiResponse,
  Page,
  CreatePagePayload,
  UpdatePagePayload,
} from "@builder/types";

export const pagesApi = {
  /** GET /api/sites/:siteId/pages — list all pages for a site */
  getPages: async (siteId: string): Promise<Page[]> => {
    const { data } = await apiClient.get<ApiResponse<Page[]>>(`/sites/${siteId}/pages`);
    return data.data;
  },

  /** POST /api/sites/:siteId/pages — create a new page */
  createPage: async (siteId: string, payload: CreatePagePayload): Promise<Page> => {
    const { data } = await apiClient.post<ApiResponse<Page>>(`/sites/${siteId}/pages`, payload);
    return data.data;
  },

  /** GET /api/sites/:siteId/pages/:pageId — get a page (draft content) */
  getPage: async (siteId: string, pageId: string): Promise<Page> => {
    const { data } = await apiClient.get<ApiResponse<Page>>(`/sites/${siteId}/pages/${pageId}`);
    return data.data;
  },

  /** PUT /api/sites/:siteId/pages/:pageId — save/update draft content */
  saveDraft: async (siteId: string, pageId: string, payload: UpdatePagePayload): Promise<Page> => {
    const { data } = await apiClient.put<ApiResponse<Page>>(
      `/sites/${siteId}/pages/${pageId}`,
      payload
    );
    return data.data;
  },

  /** DELETE /api/sites/:siteId/pages/:pageId — delete page */
  deletePage: async (siteId: string, pageId: string): Promise<void> => {
    await apiClient.delete(`/sites/${siteId}/pages/${pageId}`);
  },

  /** POST /api/sites/:siteId/pages/:pageId/publish — publish page (copy draft → published) */
  publishPage: async (siteId: string, pageId: string): Promise<Page> => {
    const { data } = await apiClient.post<ApiResponse<Page>>(
      `/sites/${siteId}/pages/${pageId}/publish`
    );
    return data.data;
  },
};
