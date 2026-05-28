// useSites — React Query hooks for sites CRUD
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sitesApi } from "@builder/api-client";
import type { CreateSitePayload, UpdateSitePayload } from "@builder/types";

export function useSites() {
  const queryClient = useQueryClient();
  const sitesQuery = useQuery({ queryKey: ["sites"], queryFn: sitesApi.getSites });
  const createSite = useMutation({ mutationFn: (payload: CreateSitePayload) => sitesApi.createSite(payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sites"] }) });
  const deleteSite = useMutation({ mutationFn: (siteId: string) => sitesApi.deleteSite(siteId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sites"] }) });
  return { sites: sitesQuery.data || [], isLoading: sitesQuery.isLoading, error: sitesQuery.error, createSite, deleteSite };
}

export function useSite(siteId: string) {
  return useQuery({ queryKey: ["site", siteId], queryFn: () => sitesApi.getSite(siteId), enabled: !!siteId });
}
