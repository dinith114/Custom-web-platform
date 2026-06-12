// ComponentPalette — left sidebar with search + categorized draggable blocks
"use client";

import { PaletteItem } from "./PaletteItem";
import { PaletteSearch } from "./PaletteSearch";
import { BLOCK_REGISTRY } from "./componentRegistry";
import { useState } from "react";

export function ComponentPalette() {
  const [search, setSearch] = useState("");
  const filtered = BLOCK_REGISTRY.filter((b) => b.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <aside className="w-60 overflow-y-auto border-r border-gray-200 bg-white custom-scrollbar">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-900">Components</h2>
        <div className="mt-3">
          <PaletteSearch value={search} onChange={setSearch} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        {filtered.map((block) => (
          <PaletteItem key={block.type} block={block} />
        ))}
      </div>
    </aside>
  );
}
