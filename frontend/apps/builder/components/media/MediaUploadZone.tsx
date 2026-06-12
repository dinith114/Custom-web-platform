// MediaUploadZone — drag-drop + click upload area connected to useMedia
"use client";

import { useCallback, useRef } from "react";
import { useMedia } from "@/hooks/useMedia";

interface MediaUploadZoneProps { siteId: string; }

export function MediaUploadZone({ siteId }: MediaUploadZoneProps) {
  const { uploadFile } = useMedia(siteId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      uploadFile.mutate(file);
    });
  }, [uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
      className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-brand-400 hover:bg-brand-50"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="text-center">
        {uploadFile.isPending ? (
          <>
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
            <p className="mt-2 text-sm font-medium text-brand-600">Uploading...</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-600">📁 Drop files here or click to upload</p>
            <p className="mt-1 text-xs text-gray-400">Images, videos, PDFs — max 10MB</p>
          </>
        )}
      </div>
    </div>
  );
}
