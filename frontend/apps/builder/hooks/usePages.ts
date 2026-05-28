// usePages — React Query hooks for pages CRUD
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pagesApi } from "@builder/api-client";
import type { CreatePagePayload, UpdatePagePayload } from "@builder/types";

export function usePages(siteId: string) {
  const queryClient = useQueryClient();
  const pagesQuery = useQuery({ queryKey: ["pages", siteId], queryFn: () => pagesApi.getPages(siteId), enabled: !!siteId });
  const createPage = useMutation({ mutationFn: (payload: CreatePagePayload) => pagesApi.createPage(siteId, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages", siteId] }) });
  const deletePage = useMutation({ mutationFn: (pageId: string) => pagesApi.deletePage(siteId, pageId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages", siteId] }) });
  return { pages: pagesQuery.data || [], isLoading: pagesQuery.isLoading, createPage, deletePage };
}

export function usePage(siteId: string, pageId: string) {
  return useQuery({ queryKey: ["page", siteId, pageId], queryFn: () => pagesApi.getPage(siteId, pageId), enabled: !!siteId && !!pageId });
}
