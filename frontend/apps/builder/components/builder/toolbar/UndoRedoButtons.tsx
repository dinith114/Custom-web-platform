// UndoRedoButtons — undo/redo with SVG icons
"use client";
import { useBuilderStore } from "@/store/builderStore";
import { IconUndo, IconRedo } from "@/components/shared/Icons";

export function UndoRedoButtons() {
  const { undo, redo, canUndo, canRedo } = useBuilderStore();
  return (
    <div className="flex gap-0.5">
      <button
        onClick={undo}
        disabled={!canUndo}
        title="Undo"
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
      >
        <IconUndo className="w-4 h-4" />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        title="Redo"
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
      >
        <IconRedo className="w-4 h-4" />
      </button>
    </div>
  );
}
