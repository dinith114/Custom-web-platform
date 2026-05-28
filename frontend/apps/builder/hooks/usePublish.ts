// usePublish — publish page/site mutation with status tracking
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pagesApi, sitesApi } from "@builder/api-client";

export function usePublish(siteId: string) {
  const queryClient = useQueryClient();

  const publishPage = useMutation({
    mutationFn: (pageId: string) => pagesApi.publishPage(siteId, pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages", siteId] });
      queryClient.invalidateQueries({ queryKey: ["site", siteId] });
    },
  });

  const publishSite = useMutation({
    mutationFn: () => sitesApi.publishSite(siteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      queryClient.invalidateQueries({ queryKey: ["site", siteId] });
    },
  });

  return { publishPage, publishSite };
}
