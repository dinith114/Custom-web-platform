// TopBar — top navigation bar with search, nav links, preview/publish
"use client";

import { useAuthStore } from "@/store/authStore";
import { IconSearch, IconBell } from "@/components/shared/Icons";

export function TopBar() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search sites, pages..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-200 transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* Nav links */}
        <a href="#" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
          Marketplace
        </a>
        <a href="#" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
          Templates
        </a>
        <a href="#" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
          Resources
        </a>

        {/* Notification bell */}
        <button className="relative ml-1 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <IconBell className="w-5 h-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Preview */}
        <button className="ml-1 rounded-lg px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          Preview
        </button>

        {/* Publish */}
        <button className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors shadow-sm">
          Publish
        </button>

        {/* User avatar */}
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-xs font-bold text-white cursor-pointer hover:ring-2 hover:ring-brand-200 transition-all">
          {user?.name?.charAt(0) || "U"}
        </div>
      </div>
    </header>
  );
}
