// Settings page — site settings form with consistent design
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_SITES } from "@/lib/mockData";

export default function SettingsPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const site = MOCK_SITES.find((s) => s._id === siteId) || MOCK_SITES[0];

  const [name, setName] = useState(site.name);
  const [slug, setSlug] = useState(site.slug);
  const [customDomain, setCustomDomain] = useState(site.customDomain || "");
  const [favicon, setFavicon] = useState(site.settings?.favicon || "");
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "seo" | "danger">("general");

  const [seoTitle, setSeoTitle] = useState(site.name);
  const [seoDesc, setSeoDesc] = useState(`Welcome to ${site.name}`);
  const [ogImage, setOgImage] = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure your site preferences and metadata." />

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1 max-w-md">
        {(["general", "seo", "danger"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "general" ? "General" : tab === "seo" ? "SEO" : "Danger Zone"}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Site Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL Slug</label>
                <div className="mt-1 flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                  <span className="flex items-center bg-gray-50 px-3 text-sm text-gray-500 border-r border-gray-300">site/</span>
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 px-3 py-2.5 text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Custom Domain</label>
                <input type="text" value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} placeholder="www.yourdomain.com" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors" />
                <p className="mt-1 text-xs text-gray-400">Point your domain&apos;s CNAME to builder.example.com</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favicon URL</label>
                <input type="text" value={favicon} onChange={(e) => setFavicon(e.target.value)} placeholder="https://..." className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Global Styles</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Primary Color</label>
                <div className="flex gap-2 items-center">
                  <input type="color" defaultValue="#6366f1" className="h-9 w-12 cursor-pointer rounded-lg border border-gray-200" />
                  <span className="text-xs text-gray-400 font-mono">#6366f1</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Font Family</label>
                <select defaultValue="Inter" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Poppins</option>
                  <option>Open Sans</option>
                  <option>Playfair Display</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors">
              {saved ? "✓ Saved!" : "Save Settings"}
            </button>
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === "seo" && (
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Search Engine Optimization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Default Page Title</label>
                <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors" />
                <p className="mt-1 text-xs text-gray-400">{seoTitle.length}/60 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors" />
                <p className="mt-1 text-xs text-gray-400">{seoDesc.length}/160 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">OG Image URL</label>
                <input type="text" value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors" />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wider">Google Preview</p>
              <div>
                <p className="text-base text-blue-700 hover:underline cursor-pointer">{seoTitle || "Page Title"}</p>
                <p className="text-xs text-green-700 font-mono">https://site/{slug}</p>
                <p className="text-xs text-gray-500 mt-0.5">{seoDesc || "No description set"}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={handleSave} className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors">
              {saved ? "✓ Saved!" : "Save SEO Settings"}
            </button>
          </div>
        </div>
      )}

      {/* Danger Zone Tab */}
      {activeTab === "danger" && (
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
            <h3 className="text-sm font-semibold text-red-700 mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-red-200 bg-white p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Unpublish Site</p>
                  <p className="text-xs text-gray-500 mt-0.5">Take your site offline. Visitors will see a 404 page.</p>
                </div>
                <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">Unpublish</button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-red-200 bg-white p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Transfer Ownership</p>
                  <p className="text-xs text-gray-500 mt-0.5">Transfer this site to another user account.</p>
                </div>
                <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">Transfer</button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-red-300 bg-white p-4">
                <div>
                  <p className="text-sm font-medium text-red-700">Delete Site Permanently</p>
                  <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone. All pages, media, and data will be lost.</p>
                </div>
                <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">Delete Site</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
