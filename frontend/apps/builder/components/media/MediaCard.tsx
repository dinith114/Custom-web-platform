// MediaCard — thumbnail card with preview, filename, delete
import type { MediaFile } from "@builder/types";

interface MediaCardProps { media: MediaFile; onDelete?: (id: string) => void; onSelect?: (media: MediaFile) => void; }

export function MediaCard({ media, onDelete, onSelect }: MediaCardProps) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-200" onClick={() => onSelect?.(media)}>
      <div className="aspect-square bg-gray-100">
        {media.fileType.startsWith("image/") ? <img src={media.fileUrl} alt={media.fileName} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-2xl">📄</div>}
      </div>
      <div className="p-2">
        <p className="truncate text-xs text-gray-600">{media.fileName}</p>
      </div>
      {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(media._id); }} className="absolute right-1 top-1 hidden rounded bg-red-500 p-1 text-xs text-white group-hover:block">✕</button>}
    </div>
  );
}
