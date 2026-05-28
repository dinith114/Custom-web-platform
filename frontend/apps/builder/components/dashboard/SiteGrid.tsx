// SiteGrid — uses mock data when API unavailable
"use client";

import { SiteCard } from "./SiteCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { MOCK_SITES } from "@/lib/mockData";

export function SiteGrid() {
  // Use mock data for UI preview
  const sites = MOCK_SITES;

  if (sites.length === 0) {
    return <EmptyState title="No websites yet" description="Create your first website to get started building." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sites.map((site) => (
        <SiteCard key={site._id} site={site} />
      ))}
    </div>
  );
}
