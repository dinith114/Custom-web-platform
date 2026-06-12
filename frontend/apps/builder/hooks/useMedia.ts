// useMedia — React Query hooks for upload, list, delete media files
// Uses mock data when backend is unavailable
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { MediaFile } from "@builder/types";
import { MOCK_MEDIA } from "@/lib/mockData";

export function useMedia(siteId: string) {
  const queryClient = useQueryClient();

  const mediaQuery = useQuery({
    queryKey: ["media", siteId],
    queryFn: async (): Promise<MediaFile[]> => {
      const existing = queryClient.getQueryData<MediaFile[]>(["media", siteId]);
      return existing ?? MOCK_MEDIA.filter((m) => m.siteId === siteId);
    },
    initialData: () => MOCK_MEDIA.filter((m) => m.siteId === siteId),
    enabled: !!siteId,
  });

  const uploadFile = useMutation({
    mutationFn: async (file: File): Promise<MediaFile> => {
      await new Promise((r) => setTimeout(r, 500));
      const now = new Date().toISOString();
      const newMedia: MediaFile = {
        _id: `media-${Date.now()}`,
        siteId,
        uploadedBy: "user-001",
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        fileType: file.type,
        fileSize: file.size,
        storageKey: `${siteId}/${file.name}`,
        uploadedAt: now,
      };
      return newMedia;
    },
    onSuccess: (newMedia) => {
      queryClient.setQueryData<MediaFile[]>(["media", siteId], (old) => [...(old || []), newMedia]);
    },
  });

  const deleteMedia = useMutation({
    mutationFn: async (mediaId: string): Promise<string> => {
      await new Promise((r) => setTimeout(r, 300));
      return mediaId;
    },
    onSuccess: (mediaId) => {
      queryClient.setQueryData<MediaFile[]>(["media", siteId], (old) => (old || []).filter((m) => m._id !== mediaId));
    },
  });

  return { media: mediaQuery.data || [], isLoading: mediaQuery.isLoading, uploadFile, deleteMedia };
}

