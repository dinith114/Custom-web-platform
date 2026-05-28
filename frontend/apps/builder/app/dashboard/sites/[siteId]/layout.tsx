// Site-level layout — tabs navigation header for sub-pages
"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

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

  return (
    <div>
      {/* Tabs */}
      <nav className="mb-6 flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => {
          const href = tab.href(siteId);
          const isActive = tab.exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${isActive ? "border-brand-600 text-brand-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
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
