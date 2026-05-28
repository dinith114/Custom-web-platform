// useMedia — React Query hooks for upload, list, delete media files
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaApi } from "@builder/api-client";

export function useMedia(siteId: string) {
  const queryClient = useQueryClient();
  const mediaQuery = useQuery({ queryKey: ["media", siteId], queryFn: () => mediaApi.listMedia(siteId), enabled: !!siteId });
  const uploadFile = useMutation({ mutationFn: (file: File) => mediaApi.uploadFile(siteId, file), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media", siteId] }) });
  const deleteMedia = useMutation({ mutationFn: (mediaId: string) => mediaApi.deleteMedia(siteId, mediaId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media", siteId] }) });
  return { media: mediaQuery.data || [], isLoading: mediaQuery.isLoading, uploadFile, deleteMedia };
}
