// Media library page — consistent design with SVG icons
"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_MEDIA } from "@/lib/mockData";
import { IconUpload, IconClose } from "@/components/shared/Icons";

export default function MediaPage() {
  const params = useParams();
  const siteId = params.siteId as string;

  return (
    <div>
      <PageHeader title="Media Library" subtitle="Upload and manage your media files." />

      {/* Upload zone */}
      <div className="flex h-36 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 transition-colors hover:border-brand-400 hover:bg-brand-50">
        <div className="text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <IconUpload className="w-5 h-5 text-gray-400" />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-600">Drop files here or click to upload</p>
          <p className="mt-1 text-xs text-gray-400">Images, videos, PDFs — max 10MB</p>
        </div>
      </div>

      {/* Media grid */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {MOCK_MEDIA.map((file) => (
          <div key={file._id} className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all">
            <div className="aspect-square bg-gray-100">
              <img src={file.fileUrl} alt={file.fileName} className="h-full w-full object-cover" />
            </div>
            <div className="p-2.5 bg-white">
              <p className="truncate text-xs font-medium text-gray-700">{file.fileName}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{(file.fileSize / 1024).toFixed(0)} KB</p>
            </div>
            <button className="absolute right-1.5 top-1.5 hidden rounded-full bg-red-500 p-1 text-white group-hover:flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors">
              <IconClose className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
