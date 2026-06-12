// SiteCard — site card with gradient header, letter avatar, status badge
"use client";

import Link from "next/link";
import type { Site } from "@builder/types";

interface SiteCardProps {
  site: Site;
}

const colorPalettes = [
  { bg: "from-violet-500 to-indigo-600", letter: "bg-violet-400/60" },
  { bg: "from-blue-500 to-cyan-500", letter: "bg-blue-400/60" },
  { bg: "from-emerald-500 to-teal-500", letter: "bg-emerald-400/60" },
  { bg: "from-orange-400 to-rose-500", letter: "bg-orange-400/60" },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Updated today";
  if (days === 1) return "Updated 1 day ago";
  if (days < 7) return `Updated ${days} days ago`;
  if (days < 30) return `Updated ${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  return `Updated ${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
}

export function SiteCard({ site }: SiteCardProps) {
  const idx = site.name.charCodeAt(0) % colorPalettes.length;
  const palette = colorPalettes[idx];
  const isLive = site.status === "published";

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-lg transition-all duration-200">
      {/* Gradient header */}
      <div className={`relative h-40 bg-gradient-to-br ${palette.bg} flex items-center px-5`}>
        {/* Letter avatar */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${palette.letter} backdrop-blur-sm text-xl font-bold text-white`}>
          {site.name.charAt(0)}
        </div>
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md ${
              isLive
                ? "bg-green-400/20 text-white"
                : "bg-white/20 text-white"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-green-400" : "bg-orange-300"}`} />
            {isLive ? "Live" : "Draft"}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm">{site.name}</h3>
        <p className="mt-0.5 text-xs text-gray-400 font-mono">/{site.slug}</p>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-400">{timeAgo(site.updatedAt)}</span>
          <Link
            href={`/sites/${site._id}`}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Edit Site
          </Link>
        </div>
      </div>
    </div>
  );
}
