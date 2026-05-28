// Navigation page — uses mock data for UI preview
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_NAV_ITEMS } from "@/lib/mockData";
import type { NavItem } from "@builder/types";

export default function NavigationPage() {
  const params = useParams();
  const [items, setItems] = useState<NavItem[]>(MOCK_NAV_ITEMS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addItem = () => {
    if (!newLabel.trim()) return;
    setItems([...items, { id: `nav-${Date.now()}`, label: newLabel.trim(), url: newUrl.trim() || "#", order: items.length, isVisible: true, children: [] }]);
    setNewLabel("");
    setNewUrl("");
    setIsAddOpen(false);
  };

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));
  const toggleVisibility = (id: string) => setItems(items.map((i) => i.id === id ? { ...i, isVisible: !i.isVisible } : i));

  return (
    <div>
      <PageHeader title="Navigation Menu" />
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Menu Items ({items.length})</h3>
          <button onClick={() => setIsAddOpen(true)} className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700 transition-colors">+ Add Item</button>
        </div>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-gray-300 transition-colors">
              <span className="cursor-grab text-gray-300 hover:text-gray-500">⠿</span>
              <span className="text-xs text-gray-400 w-5">{idx + 1}</span>
              <span className={`flex-1 text-sm font-medium ${item.isVisible ? "text-gray-700" : "text-gray-400 line-through"}`}>{item.label}</span>
              <span className="text-xs text-gray-400 font-mono">{item.url}</span>
              <button onClick={() => toggleVisibility(item.id)} className={`text-xs px-2 py-1 rounded ${item.isVisible ? "text-green-600 bg-green-50" : "text-gray-400 bg-gray-50"}`}>
                {item.isVisible ? "👁" : "🚫"}
              </button>
              <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors">✕</button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors">💾 Save Navigation</button>
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}>
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Menu Item</h2>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium text-gray-700">Label</label><input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="About Us" autoFocus className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700">URL</label><input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="/about" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" /></div>
              <div className="flex justify-end gap-2 pt-1">
                <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={addItem} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Add Item</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
