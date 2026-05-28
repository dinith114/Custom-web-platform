// Sidebar — fixed left nav with user info and site links
"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const dashboardLinks = [
  { href: "/", label: "🏠 Dashboard", match: "exact" },
];

const siteLinks = [
  { href: (id: string) => `/sites/${id}`, label: "📊 Overview", match: "exact" },
  { href: (id: string) => `/sites/${id}/pages`, label: "📄 Pages", match: "startsWith" },
  { href: (id: string) => `/sites/${id}/media`, label: "📁 Media", match: "startsWith" },
  { href: (id: string) => `/sites/${id}/navigation`, label: "🔗 Navigation", match: "startsWith" },
  { href: (id: string) => `/sites/${id}/settings`, label: "⚙️ Settings", match: "startsWith" },
];

export function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const user = useAuthStore((s) => s.user);
  const siteId = params.siteId as string | undefined;

  const isActive = (href: string, match: string) => {
    if (match === "exact") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex w-56 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white text-xs font-bold">W</div>
        <span className="text-sm font-semibold text-gray-900">Builder</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {dashboardLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${isActive(link.href, link.match) ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {siteId && (
          <>
            <div className="my-3 border-t border-gray-100" />
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Site</p>
            <div className="space-y-0.5">
              {siteLinks.map((link) => {
                const href = link.href(siteId);
                return (
                  <Link key={href} href={href} className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${isActive(href, link.match) ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </nav>

      {/* User */}
      <div className="border-t border-gray-100 p-3">
        <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-600 text-xs font-bold text-white">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate">{user?.name || "User"}</p>
            <p className="text-[10px] text-gray-400 truncate">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
