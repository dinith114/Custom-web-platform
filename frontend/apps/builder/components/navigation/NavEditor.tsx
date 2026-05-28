// NavEditor — sortable navigation editor using useNavigation hook
"use client";

import { useState } from "react";
import { useNavigation } from "@/hooks/useNavigation";
import { NavItem as NavItemComponent } from "./NavItem";
import { AddNavItemModal } from "./AddNavItemModal";
import type { NavItem } from "@builder/types";

interface NavEditorProps { siteId: string; }

export function NavEditor({ siteId }: NavEditorProps) {
  const { navigation, isLoading, updateNav } = useNavigation(siteId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const items = navigation?.items || [];

  const handleAddItem = (label: string, url: string) => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label,
      url,
      order: items.length,
      isVisible: true,
    };
    updateNav.mutate({
      items: [...items, newItem],
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    updateNav.mutate({
      items: items.filter((i) => i.id !== id),
    });
  };

  const handleEditItem = (item: NavItem) => {
    // TODO: Open edit modal with item data
  };

  const handleSave = () => {
    updateNav.mutate({ items });
  };

  if (isLoading) {
    return <div className="mx-auto max-w-2xl space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-100" />)}</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Menu Items ({items.length})</h3>
          <button onClick={() => setIsAddModalOpen(true)} className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700 transition-colors">
            + Add Item
          </button>
        </div>
        <div className="space-y-2">
          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No menu items yet. Add your first navigation link.</p>
          ) : (
            items.map((item) => (
              <NavItemComponent key={item.id} item={item} onEdit={handleEditItem} onDelete={handleDeleteItem} />
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button onClick={handleSave} disabled={updateNav.isPending} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 transition-colors flex items-center gap-2">
              {updateNav.isPending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
              Save Navigation
            </button>
          </div>
        )}
      </div>
      <AddNavItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddItem} />
    </div>
  );
}
