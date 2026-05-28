// Media library page — uses mock data for UI preview
"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_MEDIA } from "@/lib/mockData";

export default function MediaPage() {
  const params = useParams();
  const siteId = params.siteId as string;

  return (
    <div>
      <PageHeader title="Media Library" />
      {/* Upload zone */}
      <div className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-brand-400 hover:bg-brand-50">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">📁 Drop files here or click to upload</p>
          <p className="mt-1 text-xs text-gray-400">Images, videos, PDFs — max 10MB</p>
        </div>
      </div>
      {/* Media grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {MOCK_MEDIA.map((file) => (
          <div key={file._id} className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all">
            <div className="aspect-square bg-gray-100">
              <img src={file.fileUrl} alt={file.fileName} className="h-full w-full object-cover" />
            </div>
            <div className="p-2 bg-white">
              <p className="truncate text-xs text-gray-600">{file.fileName}</p>
              <p className="text-[10px] text-gray-400">{(file.fileSize / 1024).toFixed(0)} KB</p>
            </div>
            <button className="absolute right-1 top-1 hidden rounded-full bg-red-500 p-1 text-[10px] text-white group-hover:block shadow-sm">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
