// MediaLibrary — grid of uploaded files using useMedia hook
"use client";

import { useMedia } from "@/hooks/useMedia";
import { MediaCard } from "./MediaCard";

interface MediaLibraryProps { siteId: string; }

export function MediaLibrary({ siteId }: MediaLibraryProps) {
  const { media, isLoading, deleteMedia } = useMedia(siteId);

  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    );
  }

  if (!media || media.length === 0) {
    return (
      <div className="mt-4 flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-sm text-gray-400">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {media.map((file) => (
        <MediaCard key={file._id} media={file} onDelete={(id) => deleteMedia.mutate(id)} />
      ))}
    </div>
  );
}
