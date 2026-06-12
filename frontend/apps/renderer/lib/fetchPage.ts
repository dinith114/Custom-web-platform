// Server fetch — GET /api/public/sites/:slug/pages/:page
import type { Page, ApiResponse } from "@builder/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchPage(siteSlug: string, pageSlug: string): Promise<Page> {
  const res = await fetch(`${API_URL}/public/sites/${siteSlug}/pages/${pageSlug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Page not found");
  const json: ApiResponse<Page> = await res.json();
  return json.data;
}
