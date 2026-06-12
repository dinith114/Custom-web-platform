// Sidebar — fixed left nav matching SiteFlow design
"use client";

import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import {
  IconWebsites,
  IconAnalytics,
  IconPages,
  IconBuilder,
  IconSettings,
  IconSupport,
  IconPlus,
} from "@/components/shared/Icons";

const mainLinks = [
  { href: "/", label: "Websites", icon: IconWebsites, match: "exact" },
  { href: "/analytics", label: "Analytics", icon: IconAnalytics, match: "exact" },
  { href: "/pages", label: "Pages", icon: IconPages, match: "startsWith" },
  { href: "/builder", label: "Builder", icon: IconBuilder, match: "startsWith" },
];

export function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const siteId = params.siteId as string | undefined;

  const isActive = (href: string, match: string) => {
    if (match === "exact") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex w-60 flex-col border-r border-gray-200 bg-white">
      {/* Brand / Workspace */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-bold">
            P
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">Project Space</p>
            <p className="text-[11px] text-gray-400">Pro Plan</p>
          </div>
        </div>
      </div>

      {/* Create New Site Button */}
      <div className="px-4 pb-3">
        <button
          onClick={() => router.push("/")}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors shadow-sm"
        >
          <IconPlus className="w-4 h-4" />
          Create New Site
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        <div className="space-y-0.5">
          {mainLinks.map((link) => {
            const active = isActive(link.href, link.match);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? "text-brand-600" : "text-gray-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 px-3 py-3 space-y-0.5">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <IconSettings className="w-[18px] h-[18px] text-gray-400" />
          Settings
        </Link>
        <Link
          href="/support"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <IconSupport className="w-[18px] h-[18px] text-gray-400" />
          Support
        </Link>
      </div>

      {/* User Info */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white shrink-0">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "John Builder"}</p>
            <p className="text-[11px] text-gray-400 truncate">{user?.email || "john@example.com"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
