// Editor page — uses mock data, full DnD builder with working drag-drop
"use client";

import { useParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { BuilderCanvas } from "@/components/builder/canvas/BuilderCanvas";
import { ComponentPalette } from "@/components/builder/palette/ComponentPalette";
import { PropertiesPanel } from "@/components/builder/properties/PropertiesPanel";
import { BuilderToolbar } from "@/components/builder/toolbar/BuilderToolbar";
import { useBuilderStore } from "@/store/builderStore";
import { MOCK_PAGES } from "@/lib/mockData";
import type { Section } from "@builder/types";

function idGen(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function EditorPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const pageId = params.pageId as string;
  const [activeDragType, setActiveDragType] = useState<string | null>(null);

  const { addSection, setSections, sections } = useBuilderStore();

  // Load mock page content into builder store on mount
  useEffect(() => {
    const allPages = Object.values(MOCK_PAGES).flat();
    const page = allPages.find((p) => p._id === pageId);
    if (page?.draftContent?.sections) {
      setSections(page.draftContent.sections as Section[]);
    }
  }, [pageId, setSections]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.type === "palette-item") setActiveDragType(data.blockType);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragType(null);
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === "palette-item") {
      const dropIndex = overData?.index ?? sections.length;
      const newSection: Section = {
        id: idGen(),
        order: dropIndex,
        components: [{
          id: idGen(),
          type: activeData.blockType,
          props: { ...activeData.defaultProps },
          order: 0,
        }],
      };
      addSection(newSection, dropIndex);
    }
  }, [addSection, sections.length]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen flex-col">
        <BuilderToolbar siteId={siteId} pageId={pageId} />
        <div className="flex flex-1 overflow-hidden">
          <ComponentPalette />
          <BuilderCanvas />
          <PropertiesPanel />
        </div>
      </div>
      <DragOverlay>
        {activeDragType && (
          <div className="rounded-lg border-2 border-brand-400 bg-white px-4 py-2.5 shadow-xl text-sm font-medium text-brand-600 flex items-center gap-2">
            <span className="text-lg">+</span> {activeDragType}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
