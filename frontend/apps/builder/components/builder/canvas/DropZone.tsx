// DropZone — dnd-kit droppable indicator between sections
"use client";

import { useDroppable } from "@dnd-kit/core";

interface DropZoneProps {
  index: number;
  children?: React.ReactNode;
}

export function DropZone({ index, children }: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `dropzone-${index}`,
    data: { type: "dropzone", index },
  });

  return (
    <div ref={setNodeRef} className="relative py-1" data-drop-index={index}>
      <div className={`min-h-[6px] rounded transition-all duration-200 ${isOver ? "bg-brand-400 min-h-[40px] border-2 border-dashed border-brand-500 flex items-center justify-center" : ""}`}>
        {isOver && <span className="text-xs font-medium text-brand-600">Drop here</span>}
        {children}
      </div>
    </div>
  );
}
