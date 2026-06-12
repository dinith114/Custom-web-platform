// Navigation API — getNavigation(), updateNavigation()

import { apiClient } from "./client";
import type { ApiResponse, NavTree, UpdateNavPayload } from "@builder/types";

export const navigationApi = {
  /** GET /api/sites/:siteId/navigation — get full navigation structure */
  getNavigation: async (siteId: string): Promise<NavTree> => {
    const { data } = await apiClient.get<ApiResponse<NavTree>>(`/sites/${siteId}/navigation`);
    return data.data;
  },

  /** PUT /api/sites/:siteId/navigation — save/update navigation (replace full structure) */
  updateNavigation: async (siteId: string, payload: UpdateNavPayload): Promise<NavTree> => {
    const { data } = await apiClient.put<ApiResponse<NavTree>>(
      `/sites/${siteId}/navigation`,
      payload
    );
    return data.data;
  },
};
