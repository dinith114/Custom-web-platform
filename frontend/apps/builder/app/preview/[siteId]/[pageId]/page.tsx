// Preview page — renders draftContent JSON in an isolated view

"use client";

import { useParams } from "next/navigation";

export default function PreviewPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const pageId = params.pageId as string;

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
        <span className="text-sm font-medium text-gray-600">Preview Mode</span>
        <button
          onClick={() => window.close()}
          className="rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
        >
          Close Preview
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {/* Draft content will be rendered here using PageRenderer */}
        <div className="mx-auto max-w-5xl p-8">
          <p className="text-gray-400">Loading preview for page {pageId}...</p>
        </div>
      </div>
    </div>
  );
}
