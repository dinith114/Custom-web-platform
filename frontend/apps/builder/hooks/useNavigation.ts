// useNavigation — React Query hooks for read/write navigation tree
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { navigationApi } from "@builder/api-client";
import type { UpdateNavPayload } from "@builder/types";

export function useNavigation(siteId: string) {
  const queryClient = useQueryClient();
  const navQuery = useQuery({ queryKey: ["navigation", siteId], queryFn: () => navigationApi.getNavigation(siteId), enabled: !!siteId });
  const updateNav = useMutation({ mutationFn: (payload: UpdateNavPayload) => navigationApi.updateNavigation(siteId, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["navigation", siteId] }) });
  return { navigation: navQuery.data, isLoading: navQuery.isLoading, updateNav };
}
