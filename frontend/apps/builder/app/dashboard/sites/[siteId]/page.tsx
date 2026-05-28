// Site overview — uses mock data for UI preview
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_SITES, MOCK_PAGES } from "@/lib/mockData";

export default function SiteOverviewPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const site = MOCK_SITES.find((s) => s._id === siteId) || MOCK_SITES[0];
  const pages = MOCK_PAGES[siteId] || [];

  return (
    <div>
      <PageHeader title={site.name} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Pages</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{pages.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <p className="mt-2">
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${site.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {site.status}
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
          <p className="mt-2 text-lg font-semibold text-gray-900">{new Date(site.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href={`/sites/${siteId}/pages/new`} className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-brand-300 hover:shadow-sm transition-all">📄 Create New Page</Link>
          <Link href={`/sites/${siteId}/media`} className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-brand-300 hover:shadow-sm transition-all">📁 Upload Media</Link>
          <Link href={`/sites/${siteId}/navigation`} className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-brand-300 hover:shadow-sm transition-all">🔗 Navigation</Link>
          <Link href={`/sites/${siteId}/settings`} className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-brand-300 hover:shadow-sm transition-all">⚙️ Settings</Link>
        </div>
      </div>
    </div>
  );
}
