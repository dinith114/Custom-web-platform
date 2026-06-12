// Server fetch — GET /api/public/sites/:slug/navigation
import type { NavTree, ApiResponse } from "@builder/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchNavigation(siteSlug: string): Promise<NavTree> {
  const res = await fetch(`${API_URL}/public/sites/${siteSlug}/navigation`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Navigation not found");
  const json: ApiResponse<NavTree> = await res.json();
  return json.data;
}
