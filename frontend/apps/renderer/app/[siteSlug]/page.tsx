// Site homepage — loads the page where isHomePage: true
import { notFound } from "next/navigation";
import { fetchSite } from "@/lib/fetchSite";
import { PageRenderer } from "@/components/PageRenderer";
import type { Metadata } from "next";

interface HomePageProps { params: { siteSlug: string }; }

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  try {
    const site = await fetchSite(params.siteSlug);
    return { title: site.name, description: `Welcome to ${site.name}` };
  } catch { return { title: "Site Not Found" }; }
}

export default async function SiteHomePage({ params }: HomePageProps) {
  try {
    const site = await fetchSite(params.siteSlug);
    // The API returns the homepage content with the site data
    return <PageRenderer content={null} />;
  } catch { notFound(); }
}
