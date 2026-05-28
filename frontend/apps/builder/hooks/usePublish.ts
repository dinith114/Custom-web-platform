// usePublish — publish page/site mutation with status tracking
// Uses mock data when backend is unavailable
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Page, Site } from "@builder/types";

export function usePublish(siteId: string) {
  const queryClient = useQueryClient();

  const publishPage = useMutation({
    mutationFn: async (pageId: string): Promise<Page> => {
      await new Promise((r) => setTimeout(r, 500));
      const pages = queryClient.getQueryData<Page[]>(["pages", siteId]) || [];
      const page = pages.find((p) => p._id === pageId);
      if (!page) throw new Error("Page not found");
      return {
        ...page,
        status: "published",
        publishedContent: page.draftContent,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
    onSuccess: (publishedPage) => {
      queryClient.setQueryData<Page[]>(["pages", siteId], (old) =>
        (old || []).map((p) => (p._id === publishedPage._id ? publishedPage : p))
      );
      queryClient.setQueryData<Page>(["page", siteId, publishedPage._id], publishedPage);
    },
  });

  const publishSite = useMutation({
    mutationFn: async (): Promise<Site> => {
      await new Promise((r) => setTimeout(r, 700));
      const sites = queryClient.getQueryData<Site[]>(["sites"]) || [];
      const site = sites.find((s) => s._id === siteId);
      if (!site) throw new Error("Site not found");
      // Also publish all pages
      const pages = queryClient.getQueryData<Page[]>(["pages", siteId]) || [];
      const publishedPages = pages.map((p) => ({
        ...p,
        status: "published" as const,
        publishedContent: p.draftContent,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      queryClient.setQueryData<Page[]>(["pages", siteId], publishedPages);
      return { ...site, status: "published", updatedAt: new Date().toISOString() };
    },
    onSuccess: (publishedSite) => {
      queryClient.setQueryData<Site[]>(["sites"], (old) =>
        (old || []).map((s) => (s._id === publishedSite._id ? publishedSite : s))
      );
      queryClient.setQueryData<Site>(["site", siteId], publishedSite);
    },
  });

  return { publishPage, publishSite };
}

