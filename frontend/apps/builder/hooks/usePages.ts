// usePages — React Query hooks for pages CRUD
// Uses mock data when backend is unavailable
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreatePagePayload, Page } from "@builder/types";
import { MOCK_PAGES } from "@/lib/mockData";

export function usePages(siteId: string) {
  const queryClient = useQueryClient();

  const pagesQuery = useQuery({
    queryKey: ["pages", siteId],
    queryFn: async (): Promise<Page[]> => {
      const existing = queryClient.getQueryData<Page[]>(["pages", siteId]);
      return existing ?? [...(MOCK_PAGES[siteId] || [])];
    },
    initialData: () => [...(MOCK_PAGES[siteId] || [])],
    enabled: !!siteId,
  });

  const createPage = useMutation({
    mutationFn: async (payload: CreatePagePayload): Promise<Page> => {
      await new Promise((r) => setTimeout(r, 400));
      const now = new Date().toISOString();
      const newPage: Page = {
        _id: `page-${Date.now()}`,
        siteId,
        title: payload.title,
        slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        isHomePage: payload.isHomePage || false,
        status: "draft",
        draftContent: { sections: [] },
        publishedContent: null,
        seoTitle: payload.title,
        seoDescription: "",
        createdAt: now,
        updatedAt: now,
      };
      return newPage;
    },
    onSuccess: (newPage) => {
      queryClient.setQueryData<Page[]>(["pages", siteId], (old) => [...(old || []), newPage]);
    },
  });

  const deletePage = useMutation({
    mutationFn: async (pageId: string): Promise<string> => {
      await new Promise((r) => setTimeout(r, 300));
      return pageId;
    },
    onSuccess: (pageId) => {
      queryClient.setQueryData<Page[]>(["pages", siteId], (old) => (old || []).filter((p) => p._id !== pageId));
    },
  });

  return { pages: pagesQuery.data || [], isLoading: pagesQuery.isLoading, createPage, deletePage };
}

export function usePage(siteId: string, pageId: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["page", siteId, pageId],
    queryFn: async (): Promise<Page> => {
      const pages = queryClient.getQueryData<Page[]>(["pages", siteId]) || MOCK_PAGES[siteId] || [];
      const page = pages.find((p) => p._id === pageId);
      if (!page) throw new Error("Page not found");
      return page;
    },
    enabled: !!siteId && !!pageId,
  });
}

