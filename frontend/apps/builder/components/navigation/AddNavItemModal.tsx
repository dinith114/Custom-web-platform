// AddNavItemModal — modal with label/URL form, connected via onAdd callback
"use client";

import { useState } from "react";

interface AddNavItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (label: string, url: string) => void;
}

export function AddNavItemModal({ isOpen, onClose, onAdd }: AddNavItemModalProps) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    onAdd(label.trim(), url.trim() || "#");
    setLabel("");
    setUrl("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-gray-900">Add Menu Item</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Label</label>
            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="About Us" autoFocus className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/about or https://..." className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  );
}
