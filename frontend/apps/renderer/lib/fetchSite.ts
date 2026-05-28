// Server fetch — GET /api/public/sites/:siteSlug
import type { Site, ApiResponse } from "@builder/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchSite(siteSlug: string): Promise<Site> {
  const res = await fetch(`${API_URL}/public/sites/${siteSlug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Site not found");
  const json: ApiResponse<Site> = await res.json();
  return json.data;
}
