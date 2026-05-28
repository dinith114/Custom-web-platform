// useDraftSave — auto-save draft content every 30 seconds
"use client";
import { useEffect, useRef } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { pagesApi } from "@builder/api-client";
import { serialize } from "@/lib/serializer";

export function useDraftSave(siteId: string, pageId: string) {
  const sections = useBuilderStore((s) => s.sections);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const serialized = JSON.stringify(serialize(sections));
      if (serialized !== lastSavedRef.current && siteId && pageId) {
        try {
          await pagesApi.saveDraft(siteId, pageId, { draftContent: { sections } });
          lastSavedRef.current = serialized;
          console.log("[DraftSave] Auto-saved at", new Date().toLocaleTimeString());
        } catch (err) {
          console.error("[DraftSave] Failed to auto-save:", err);
        }
      }
    }, 30000); // Every 30 seconds

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [sections, siteId, pageId]);
}
