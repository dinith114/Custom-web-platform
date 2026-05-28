// BuilderToolbar — top bar with Save, Preview, Publish buttons + save status
"use client";
import { UndoRedoButtons } from "./UndoRedoButtons";
import { DeviceToggle } from "./DeviceToggle";
import { useBuilderStore } from "@/store/builderStore";
import { usePublish } from "@/hooks/usePublish";
import { pagesApi } from "@builder/api-client";
import { serialize } from "@/lib/serializer";
import { useState } from "react";
import Link from "next/link";

interface BuilderToolbarProps { siteId: string; pageId: string; }

export function BuilderToolbar({ siteId, pageId }: BuilderToolbarProps) {
  const { sections, isDirty, markClean } = useBuilderStore();
  const { publishPage } = usePublish(siteId);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await pagesApi.saveDraft(siteId, pageId, { draftContent: { sections } });
      markClean();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("idle");
    }
  };

  const handlePublish = async () => {
    await handleSave();
    await publishPage.mutateAsync(pageId);
  };

  return (
    <div className="flex h-12 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Link href={`/sites/${siteId}`} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">← Back</Link>
        <div className="h-5 w-px bg-gray-200" />
        <UndoRedoButtons />
        {isDirty && <span className="text-xs text-amber-500 font-medium">● Unsaved</span>}
        {saveStatus === "saved" && <span className="text-xs text-green-500 font-medium">✓ Saved</span>}
      </div>
      <DeviceToggle />
      <div className="flex items-center gap-2">
        <button onClick={handleSave} disabled={saveStatus === "saving"} className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-1.5">
          {saveStatus === "saving" && <span className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />}
          {saveStatus === "saving" ? "Saving..." : "Save Draft"}
        </button>
        <Link href={`/preview/${siteId}/${pageId}`} target="_blank" className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
          👁 Preview
        </Link>
        <button onClick={handlePublish} disabled={publishPage.isPending} className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors disabled:opacity-50 flex items-center gap-1.5">
          {publishPage.isPending && <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
          {publishPage.isPending ? "Publishing..." : "🚀 Publish"}
        </button>
      </div>
    </div>
  );
}
