// Pages list — table layout with icons, slugs, status badges, actions
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_PAGES } from "@/lib/mockData";
import { IconHome, IconInfo, IconDocument, IconMail, IconEdit, IconMoreDots } from "@/components/shared/Icons";

const pageIconMap: Record<string, typeof IconHome> = {
  home: IconHome,
  about: IconInfo,
  contact: IconMail,
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Last edited just now";
  if (hours < 24) return `Last edited ${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Last edited 1 day ago";
  if (days < 7) return `Last edited ${days} days ago`;
  if (days < 30) return `Last edited ${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  return `Last edited ${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
}

export default function SitePagesPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const pages = MOCK_PAGES[siteId] || [];

  return (
    <div>
      <PageHeader
        title="Pages"
        subtitle="Manage the structure and content of your website."
        action={{ label: "+ New Page", onClick: () => router.push(`/sites/${siteId}/pages/new`) }}
      />

      {pages.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <IconDocument className="mx-auto w-10 h-10 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">No pages yet.</p>
          <Link
            href={`/sites/${siteId}/pages/new`}
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Create Page
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_150px_100px_100px] items-center border-b border-gray-100 bg-gray-50/50 px-5 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Page Name</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Slug</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 text-center">Status</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 text-right">Actions</span>
          </div>

          {/* Page rows */}
          {pages.map((page) => {
            const isLive = page.status === "published";
            const slugKey = page.slug.toLowerCase();
            const Icon = pageIconMap[slugKey] || IconDocument;

            return (
              <div
                key={page._id}
                className="grid grid-cols-[1fr_150px_100px_100px] items-center border-b border-gray-50 px-5 py-4 hover:bg-gray-50/50 transition-colors last:border-b-0"
              >
                {/* Page name + icon */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 shrink-0">
                    <Icon className="w-[18px] h-[18px] text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{page.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{timeAgo(page.updatedAt)}</p>
                  </div>
                </div>

                {/* Slug */}
                <span className="text-sm text-gray-500 font-mono">/{page.slug}</span>

                {/* Status badge */}
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isLive
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isLive && <span className="h-1.5 w-1.5 rounded-full bg-green-500" />}
                    {isLive ? "Live" : "Draft"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/editor/${siteId}/${page._id}`}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    title="Edit page"
                  >
                    <IconEdit className="w-4 h-4" />
                  </Link>
                  <button
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    title="More options"
                  >
                    <IconMoreDots className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
