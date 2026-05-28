// UndoRedoButtons — history stack controls
"use client";
import { useBuilderStore } from "@/store/builderStore";

export function UndoRedoButtons() {
  const { undo, redo, canUndo, canRedo } = useBuilderStore();
  return (
    <div className="flex gap-1">
      <button onClick={undo} disabled={!canUndo} className="rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-30" title="Undo">↩</button>
      <button onClick={redo} disabled={!canRedo} className="rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-30" title="Redo">↪</button>
    </div>
  );
}
