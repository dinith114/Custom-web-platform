// Site-level layout — wraps all pages for a specific site with navbar + footer
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchNavigation } from "@/lib/fetchNavigation";

interface SiteLayoutProps { children: React.ReactNode; params: { siteSlug: string }; }

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { siteSlug } = params;
  let navigation = null;
  try { navigation = await fetchNavigation(siteSlug); } catch {}

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar navigation={navigation} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
