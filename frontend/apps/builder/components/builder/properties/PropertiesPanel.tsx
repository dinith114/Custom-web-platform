// PropertiesPanel — right sidebar editing selected component props, connected to store
"use client";
import { useBuilderStore } from "@/store/builderStore";
import { TextEditor } from "./TextEditor";
import { StyleEditor } from "./StyleEditor";
import { LinkEditor } from "./LinkEditor";
import { ImagePicker } from "./ImagePicker";
import { SeoPanel } from "./SeoPanel";
import { useCallback } from "react";
import { IconSliders, IconClose } from "@/components/shared/Icons";

export function PropertiesPanel() {
  const { selectedComponentId, sections, updateComponentInSection } = useBuilderStore();

  // Find the selected component and its parent section
  let selected: any = null;
  let parentSectionId: string | null = null;
  for (const section of sections) {
    const found = section.components.find((c) => c.id === selectedComponentId);
    if (found) {
      selected = found;
      parentSectionId = section.id;
      break;
    }
  }

  const handlePropsChange = useCallback((newProps: Record<string, any>) => {
    if (selected && parentSectionId) {
      updateComponentInSection(parentSectionId, selected.id, newProps);
    }
  }, [selected, parentSectionId, updateComponentInSection]);

  return (
    <aside className="w-72 overflow-y-auto border-l border-gray-200 bg-white custom-scrollbar">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-sm font-semibold text-gray-900">Properties</h2>
      </div>
      {!selected ? (
        <div className="flex flex-col items-center justify-center p-8 pt-24">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
            <IconSliders className="w-7 h-7 text-gray-300" />
          </div>
          <p className="mt-4 text-sm text-gray-400 text-center leading-relaxed">
            Select a component to edit its properties
          </p>
        </div>
      ) : (
        <div className="space-y-4 p-4">
          <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-between">
            <span>{selected.type}</span>
            <button
              onClick={() => useBuilderStore.getState().selectComponent(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <IconClose className="w-3.5 h-3.5" />
            </button>
          </div>

          {(selected.type === "heading" || selected.type === "text") && (
            <TextEditor props={selected.props} componentId={selected.id} onChange={handlePropsChange} />
          )}
          {selected.type === "image" && (
            <ImagePicker props={selected.props} componentId={selected.id} onChange={handlePropsChange} />
          )}
          {selected.type === "button" && (
            <LinkEditor props={selected.props} componentId={selected.id} onChange={handlePropsChange} />
          )}
          <StyleEditor props={selected.props} componentId={selected.id} onChange={handlePropsChange} />
        </div>
      )}
    </aside>
  );
}
