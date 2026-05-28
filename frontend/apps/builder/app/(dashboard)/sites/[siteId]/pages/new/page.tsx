// Create new page form — connected to usePages hook
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { usePages } from "@/hooks/usePages";

export default function NewPagePage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const { createPage } = usePages(siteId);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isHomePage, setIsHomePage] = useState(false);
  const [error, setError] = useState("");

  const generateSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("Page title is required"); return; }
    if (!slug.trim()) { setError("URL slug is required"); return; }
    setError("");
    try {
      const page = await createPage.mutateAsync({ title: title.trim(), slug: slug.trim(), isHomePage });
      router.push(`/editor/${siteId}/${page._id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create page");
    }
  };

  return (
    <div>
      <PageHeader title="Create New Page" />
      <div className="mx-auto max-w-lg rounded-lg border border-gray-200 bg-white p-6">
        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Page Title</label>
            <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. About Us" autoFocus className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
            <div className="mt-1 flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
              <span className="flex items-center bg-gray-50 px-3 text-sm text-gray-500 border-r border-gray-300">/</span>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="about-us" className="flex-1 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isHomePage" checked={isHomePage} onChange={(e) => setIsHomePage(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
            <label htmlFor="isHomePage" className="text-sm text-gray-700">Set as homepage</label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => router.back()} className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
            <button type="submit" disabled={createPage.isPending} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 flex items-center gap-2">
              {createPage.isPending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
              {createPage.isPending ? "Creating..." : "Create & Open Editor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
