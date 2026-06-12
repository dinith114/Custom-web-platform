// Site overview — stat cards + quick actions matching SiteFlow design
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_SITES, MOCK_PAGES, MOCK_USER } from "@/lib/mockData";
import {
  IconPages,
  IconGlobe,
  IconClock,
  IconDocument,
  IconUpload,
  IconNavigation,
  IconGear,
  IconTrend,
  IconLink,
} from "@/components/shared/Icons";

export default function SiteOverviewPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const site = MOCK_SITES.find((s) => s._id === siteId) || MOCK_SITES[0];
  const pages = MOCK_PAGES[siteId] || [];
  const isPublished = site.status === "published";

  const updatedDate = new Date(site.updatedAt);
  const dateStr = updatedDate.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  const timeStr = updatedDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Total Pages */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Pages</h3>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
              <IconPages className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">{pages.length}</p>
          <div className="mt-3 flex items-center gap-1.5">
            <IconTrend className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-600">+2 this week</span>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
              <IconGlobe className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                isPublished ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isPublished ? "bg-green-500" : "bg-yellow-500"}`} />
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <IconLink className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">{site.slug}.siteflow.dev</span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
              <IconClock className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">{dateStr}</p>
          <p className="mt-0.5 text-sm text-gray-500">at {timeStr}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-[8px] font-bold text-white">
              {MOCK_USER.name.charAt(0)}
            </div>
            <span className="text-xs text-gray-500">by {MOCK_USER.name}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link
            href={`/sites/${siteId}/pages/new`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 group-hover:bg-brand-50 transition-colors">
              <IconDocument className="w-6 h-6 text-gray-400 group-hover:text-brand-500 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700 transition-colors">Create New Page</span>
          </Link>

          <Link
            href={`/sites/${siteId}/media`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 group-hover:bg-brand-50 transition-colors">
              <IconUpload className="w-6 h-6 text-gray-400 group-hover:text-brand-500 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700 transition-colors">Upload Media</span>
          </Link>

          <Link
            href={`/sites/${siteId}/navigation`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 group-hover:bg-brand-50 transition-colors">
              <IconNavigation className="w-6 h-6 text-gray-400 group-hover:text-brand-500 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700 transition-colors">Navigation Settings</span>
          </Link>

          <Link
            href={`/sites/${siteId}/settings`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 group-hover:bg-brand-50 transition-colors">
              <IconGear className="w-6 h-6 text-gray-400 group-hover:text-brand-500 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700 transition-colors">General Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
