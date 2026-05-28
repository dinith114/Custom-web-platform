// useNavigation — React Query hooks for read/write navigation tree
// Uses mock data when backend is unavailable
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavItem, UpdateNavPayload } from "@builder/types";
import { MOCK_NAV_ITEMS } from "@/lib/mockData";

export function useNavigation(siteId: string) {
  const queryClient = useQueryClient();

  const navQuery = useQuery({
    queryKey: ["navigation", siteId],
    queryFn: async (): Promise<NavItem[]> => {
      const existing = queryClient.getQueryData<NavItem[]>(["navigation", siteId]);
      return existing ?? [...MOCK_NAV_ITEMS];
    },
    initialData: [...MOCK_NAV_ITEMS],
    enabled: !!siteId,
  });

  const updateNav = useMutation({
    mutationFn: async (payload: UpdateNavPayload): Promise<NavItem[]> => {
      await new Promise((r) => setTimeout(r, 300));
      return payload.items;
    },
    onSuccess: (items) => {
      queryClient.setQueryData<NavItem[]>(["navigation", siteId], items);
    },
  });

  return { navigation: navQuery.data, isLoading: navQuery.isLoading, updateNav };
}

