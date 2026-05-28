// useDraftSave — auto-save draft content every 30 seconds
// Saves to React Query cache when backend is unavailable
"use client";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useBuilderStore } from "@/store/builderStore";
import { serialize } from "@/lib/serializer";
import type { Page } from "@builder/types";

export function useDraftSave(siteId: string, pageId: string) {
  const sections = useBuilderStore((s) => s.sections);
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const serialized = JSON.stringify(serialize(sections));
      if (serialized !== lastSavedRef.current && siteId && pageId) {
        try {
          // Save to React Query cache (mock persistence)
          queryClient.setQueryData<Page>(["page", siteId, pageId], (old) => {
            if (!old) return old;
            return { ...old, draftContent: { sections }, updatedAt: new Date().toISOString() };
          });
          // Also update the page in the pages list cache
          queryClient.setQueryData<Page[]>(["pages", siteId], (old) =>
            (old || []).map((p) =>
              p._id === pageId ? { ...p, draftContent: { sections }, updatedAt: new Date().toISOString() } : p
            )
          );
          lastSavedRef.current = serialized;
          console.log("[DraftSave] Auto-saved at", new Date().toLocaleTimeString());
        } catch (err) {
          console.error("[DraftSave] Failed to auto-save:", err);
        }
      }
    }, 30000); // Every 30 seconds

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [sections, siteId, pageId, queryClient]);
}

