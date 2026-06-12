// Section — draggable section wrapper with reorder controls, delete, and selection
"use client";

import type { Section as SectionType } from "@builder/types";
import { ComponentRenderer } from "./ComponentRenderer";
import { SelectionOverlay } from "./SelectionOverlay";
import { useBuilderStore } from "@/store/builderStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SectionProps {
  section: SectionType;
  index: number;
}

export function Section({ section, index }: SectionProps) {
  const { selectedComponentId, selectComponent, removeSection } = useBuilderStore();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: { type: "section", index },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative border-b border-gray-100 p-4 hover:bg-blue-50/20 transition-colors"
      data-section-id={section.id}
    >
      {/* Section controls — visible on hover */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 hidden gap-0.5 group-hover:flex flex-col z-20">
        <button {...listeners} {...attributes} className="cursor-grab rounded bg-gray-200 p-1 text-xs text-gray-500 hover:bg-gray-300 active:cursor-grabbing" title="Drag to reorder">
          ⠿
        </button>
      </div>
      <div className="absolute right-2 top-2 hidden gap-1 group-hover:flex z-20">
        <button
          onClick={() => removeSection(section.id)}
          className="rounded bg-red-100 px-2 py-1 text-xs text-red-500 hover:bg-red-200 transition-colors"
          title="Delete section"
        >
          ✕
        </button>
      </div>

      {/* Render components in this section */}
      {section.components.map((component) => (
        <div
          key={component.id}
          className="relative cursor-pointer rounded transition-all hover:ring-1 hover:ring-brand-200"
          onClick={(e) => {
            e.stopPropagation();
            selectComponent(component.id);
          }}
        >
          {selectedComponentId === component.id && <SelectionOverlay />}
          <ComponentRenderer component={component} />
        </div>
      ))}

      {section.components.length === 0 && (
        <div className="py-4 text-center text-xs text-gray-400">Empty section — drag components here</div>
      )}
    </div>
  );
}
