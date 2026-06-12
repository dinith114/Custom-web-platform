// BuilderCanvas — center panel with @dnd-kit drop zones and section list
"use client";

import { useBuilderStore } from "@/store/builderStore";
import { Section } from "./Section";
import { DropZone } from "./DropZone";
import { useDroppable } from "@dnd-kit/core";
import { IconPlusCircle } from "@/components/shared/Icons";

export function BuilderCanvas() {
  const { sections, deviceMode } = useBuilderStore();
  const widthMap = { desktop: "100%", tablet: "768px", mobile: "375px" };

  const { setNodeRef, isOver } = useDroppable({ id: "canvas-root" });

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-6" ref={setNodeRef}>
      <div
        className="mx-auto min-h-full rounded-lg bg-white shadow-sm transition-all duration-300"
        style={{ maxWidth: widthMap[deviceMode] }}
      >
        {sections.length === 0 && (
          <div
            className={`flex h-[500px] items-center justify-center border-2 border-dashed rounded-lg transition-colors m-4 ${
              isOver ? "border-brand-400 bg-brand-50" : "border-gray-200"
            }`}
          >
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
                <IconPlusCircle className="w-8 h-8 text-brand-500" />
              </div>
              <p className="mt-4 text-sm font-medium text-gray-700">
                Drag a component from the left panel
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Drop it here to start building your page
              </p>
            </div>
          </div>
        )}
        {sections.map((section, index) => (
          <div key={section.id}>
            <DropZone index={index} />
            <Section section={section} index={index} />
          </div>
        ))}
        {sections.length > 0 && <DropZone index={sections.length} />}
      </div>
    </div>
  );
}
