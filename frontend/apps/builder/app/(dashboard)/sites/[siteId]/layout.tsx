// Site-level layout — breadcrumbs + site title + tabs navigation
"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { MOCK_SITES } from "@/lib/mockData";
import { IconChevronRight } from "@/components/shared/Icons";

const tabs = [
  { href: (id: string) => `/sites/${id}`, label: "Overview", exact: true },
  { href: (id: string) => `/sites/${id}/pages`, label: "Pages" },
  { href: (id: string) => `/sites/${id}/media`, label: "Media" },
  { href: (id: string) => `/sites/${id}/navigation`, label: "Navigation" },
  { href: (id: string) => `/sites/${id}/settings`, label: "Settings" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const siteId = params.siteId as string;
  const site = MOCK_SITES.find((s) => s._id === siteId) || MOCK_SITES[0];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm mb-2">
        <Link href="/" className="text-gray-400 hover:text-brand-600 transition-colors">
          Websites
        </Link>
        <IconChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="font-medium text-gray-700">{site.name}</span>
      </div>

      {/* Site Title */}
      <h1 className="text-3xl font-bold text-gray-900">{site.name}</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your site structure, pages, and overall settings.</p>

      {/* Tabs */}
      <nav className="mt-6 mb-6 flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => {
          const href = tab.href(siteId);
          const isActive = tab.exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                isActive
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}
