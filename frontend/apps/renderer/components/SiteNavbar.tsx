// SiteNavbar — renders published navigation menu with dropdowns
import type { NavTree } from "@builder/types";

interface SiteNavbarProps { navigation: NavTree | null; }

export function SiteNavbar({ navigation }: SiteNavbarProps) {
  const items = navigation?.items?.filter((i) => i.isVisible) || [];
  return (
    <header className="border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-bold text-gray-900">Site</div>
        <ul className="flex gap-6">
          {items.map((item) => (
            <li key={item.id}><a href={item.url || "#"} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{item.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
