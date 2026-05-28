// Pages list — uses mock data for UI preview
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_PAGES } from "@/lib/mockData";

export default function SitePagesPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const pages = MOCK_PAGES[siteId] || [];

  return (
    <div>
      <PageHeader title="Pages" action={{ label: "+ New Page", onClick: () => router.push(`/sites/${siteId}/pages/new`) }} />
      {pages.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
          <span className="text-3xl">📄</span>
          <p className="mt-3">No pages yet.</p>
          <Link href={`/sites/${siteId}/pages/new`} className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700">Create Page</Link>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden">
          {pages.map((page) => (
            <div key={page._id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 text-sm">{page.title}</p>
                  {page.isHomePage && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">HOME</span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">/{page.slug} · Updated {new Date(page.updatedAt).toLocaleDateString("en-US")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${page.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{page.status}</span>
                <Link href={`/editor/${siteId}/${page._id}`} className="rounded-lg px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 transition-colors">✏️ Edit</Link>
                <button className="rounded-lg px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 transition-colors">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
