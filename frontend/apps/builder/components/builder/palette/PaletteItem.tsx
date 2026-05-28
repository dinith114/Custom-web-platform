// PaletteItem — dnd-kit draggable block from palette
"use client";

import { useDraggable } from "@dnd-kit/core";
import type { BlockRegistryItem } from "./componentRegistry";

interface PaletteItemProps {
  block: BlockRegistryItem;
}

export function PaletteItem({ block }: PaletteItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${block.type}`,
    data: {
      type: "palette-item",
      blockType: block.type,
      defaultProps: block.defaultProps,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex cursor-grab flex-col items-center gap-1.5 rounded-lg border border-gray-200 p-3 text-center transition-all hover:border-brand-300 hover:bg-brand-50 hover:shadow-sm active:cursor-grabbing active:scale-95 ${isDragging ? "opacity-50 ring-2 ring-brand-400" : ""}`}
    >
      <span className="text-xl">{block.icon}</span>
      <span className="text-[11px] font-medium text-gray-600 leading-tight">{block.label}</span>
    </div>
  );
}
