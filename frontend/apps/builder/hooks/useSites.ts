// useSites — React Query hooks for sites CRUD
// Uses mock data when backend is unavailable (no server at localhost:5000)
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSitePayload, Site } from "@builder/types";
import { MOCK_SITES } from "@/lib/mockData";

export function useSites() {
  const queryClient = useQueryClient();

  const sitesQuery = useQuery({
    queryKey: ["sites"],
    queryFn: async (): Promise<Site[]> => {
      // Return cached data if it exists, otherwise seed with mock data
      const existing = queryClient.getQueryData<Site[]>(["sites"]);
      return existing ?? [...MOCK_SITES];
    },
    initialData: [...MOCK_SITES],
  });

  const createSite = useMutation({
    mutationFn: async (payload: CreateSitePayload): Promise<Site> => {
      // Simulate API delay
      await new Promise((r) => setTimeout(r, 400));
      const now = new Date().toISOString();
      const newSite: Site = {
        _id: `site-${Date.now()}`,
        name: payload.name,
        slug: payload.slug || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        ownerId: "user-001",
        status: "draft",
        settings: { favicon: "" },
        createdAt: now,
        updatedAt: now,
      };
      return newSite;
    },
    onSuccess: (newSite) => {
      queryClient.setQueryData<Site[]>(["sites"], (old) => [...(old || []), newSite]);
    },
  });

  const deleteSite = useMutation({
    mutationFn: async (siteId: string): Promise<string> => {
      await new Promise((r) => setTimeout(r, 300));
      return siteId;
    },
    onSuccess: (siteId) => {
      queryClient.setQueryData<Site[]>(["sites"], (old) => (old || []).filter((s) => s._id !== siteId));
    },
  });

  return { sites: sitesQuery.data || [], isLoading: sitesQuery.isLoading, error: sitesQuery.error, createSite, deleteSite };
}

export function useSite(siteId: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["site", siteId],
    queryFn: async (): Promise<Site> => {
      const sites = queryClient.getQueryData<Site[]>(["sites"]) || MOCK_SITES;
      const site = sites.find((s) => s._id === siteId);
      if (!site) throw new Error("Site not found");
      return site;
    },
    enabled: !!siteId,
  });
}
