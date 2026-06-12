// CreateSiteModal — modal with name/slug form, connected to useSites().createSite
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSites } from "@/hooks/useSites";

interface CreateSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSiteModal({ isOpen, onClose }: CreateSiteModalProps) {
  const router = useRouter();
  const { createSite } = useSites();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");

  const generateSlug = (value: string) => {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Site name is required"); return; }
    if (!slug.trim()) { setError("URL slug is required"); return; }
    setError("");
    try {
      const site = await createSite.mutateAsync({ name: name.trim(), slug: slug.trim() });
      onClose();
      setName("");
      setSlug("");
      router.push(`/sites/${site._id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create site");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-gray-900">Create New Website</h2>
        <p className="mt-1 text-sm text-gray-500">Give your website a name to get started</p>
        {error && (
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website Name</label>
            <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="My Awesome Website" autoFocus className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
            <div className="mt-1 flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
              <span className="flex items-center bg-gray-50 px-3 text-sm text-gray-500 border-r border-gray-300">site/</span>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" disabled={createSite.isPending} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 transition-colors flex items-center gap-2">
              {createSite.isPending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
              {createSite.isPending ? "Creating..." : "Create Website"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
