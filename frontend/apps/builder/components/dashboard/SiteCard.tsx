// SiteCard — individual site card with status, slug, quick links
"use client";

import Link from "next/link";
import type { Site } from "@builder/types";

interface SiteCardProps {
  site: Site;
}

const colorPalettes = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-cyan-500 to-blue-600",
];

export function SiteCard({ site }: SiteCardProps) {
  const idx = site.name.charCodeAt(0) % colorPalettes.length;
  const gradient = colorPalettes[idx];

  return (
    <Link href={`/sites/${site._id}`} className="group block overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-lg transition-all duration-200">
      {/* Color header */}
      <div className={`h-24 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
        <span className="text-3xl font-bold text-white/80">{site.name.charAt(0)}</span>
        <div className="absolute top-2 right-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${site.status === "published" ? "bg-green-400/20 text-white" : "bg-white/20 text-white"}`}>
            {site.status === "published" ? "● Live" : "● Draft"}
          </span>
        </div>
      </div>
      {/* Card body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors">{site.name}</h3>
        <p className="mt-0.5 text-xs text-gray-400 font-mono">/{site.slug}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>Updated {new Date(site.updatedAt).toLocaleDateString()}</span>
          <span className="text-brand-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
        </div>
      </div>
    </Link>
  );
}
