// ComponentPalette — left sidebar with categorized draggable block list
"use client";

import { PaletteItem } from "./PaletteItem";
import { PaletteSearch } from "./PaletteSearch";
import { BLOCK_REGISTRY } from "./componentRegistry";
import { useState } from "react";

export function ComponentPalette() {
  const [search, setSearch] = useState("");
  const filtered = BLOCK_REGISTRY.filter((b) => b.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <aside className="w-64 overflow-y-auto border-r border-gray-200 bg-white custom-scrollbar">
      <div className="border-b border-gray-200 p-3">
        <h2 className="text-sm font-semibold text-gray-700">Components</h2>
        <PaletteSearch value={search} onChange={setSearch} />
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {filtered.map((block) => (
          <PaletteItem key={block.type} block={block} />
        ))}
      </div>
    </aside>
  );
}
