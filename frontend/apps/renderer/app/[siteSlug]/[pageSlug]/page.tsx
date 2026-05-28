// Inner page — SSR fetch of publishedContent by pageSlug
import { notFound } from "next/navigation";
import { fetchPage } from "@/lib/fetchPage";
import { PageRenderer } from "@/components/PageRenderer";
import type { Metadata } from "next";

interface PageProps { params: { siteSlug: string; pageSlug: string }; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const page = await fetchPage(params.siteSlug, params.pageSlug);
    return { title: page.seoTitle || page.title, description: page.seoDescription || "" };
  } catch { return { title: "Page Not Found" }; }
}

export default async function PublicPage({ params }: PageProps) {
  try {
    const page = await fetchPage(params.siteSlug, params.pageSlug);
    return <PageRenderer content={page.publishedContent} />;
  } catch { notFound(); }
}
