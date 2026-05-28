// NavItem — single nav item with drag handle, label, link, visibility toggle
import type { NavItem as NavItemType } from "@builder/types";

interface NavItemProps { item: NavItemType; onEdit: (item: NavItemType) => void; onDelete: (id: string) => void; }

export function NavItem({ item, onEdit, onDelete }: NavItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
      <span className="cursor-grab text-gray-400">⠿</span>
      <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
      <span className="text-xs text-gray-400">{item.url || item.pageId || "—"}</span>
      <button onClick={() => onEdit(item)} className="text-xs text-brand-600 hover:underline">Edit</button>
      <button onClick={() => onDelete(item.id)} className="text-xs text-red-500 hover:underline">Delete</button>
    </div>
  );
}
