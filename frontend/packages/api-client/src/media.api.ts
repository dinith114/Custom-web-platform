// Media API — uploadFile(), listMedia(), deleteMedia()

import { apiClient } from "./client";
import type { ApiResponse, MediaFile } from "@builder/types";

export const mediaApi = {
  /** GET /api/sites/:siteId/media — list all media for a site */
  listMedia: async (siteId: string): Promise<MediaFile[]> => {
    const { data } = await apiClient.get<ApiResponse<MediaFile[]>>(`/sites/${siteId}/media`);
    return data.data;
  },

  /** POST /api/sites/:siteId/media/upload — upload a file */
  uploadFile: async (siteId: string, file: File): Promise<MediaFile> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await apiClient.post<ApiResponse<MediaFile>>(
      `/sites/${siteId}/media/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.data;
  },

  /** DELETE /api/sites/:siteId/media/:mediaId — delete a file */
  deleteMedia: async (siteId: string, mediaId: string): Promise<void> => {
    await apiClient.delete(`/sites/${siteId}/media/${mediaId}`);
  },
};
