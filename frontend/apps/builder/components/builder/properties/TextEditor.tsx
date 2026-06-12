// TextEditor — inline rich text editing with live onChange
"use client";
import type { BlockProps } from "@builder/types";

interface TextEditorProps {
  props: BlockProps;
  componentId: string;
  onChange: (newProps: Record<string, any>) => void;
}

export function TextEditor({ props, componentId, onChange }: TextEditorProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Text Content</label>
        <textarea
          value={props.text || ""}
          onChange={(e) => onChange({ text: e.target.value })}
          rows={3}
          className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200"
        />
      </div>
      {props.level !== undefined && (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Heading Level</label>
          <select
            value={props.level || "h2"}
            onChange={(e) => onChange({ level: e.target.value })}
            className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm"
          >
            {["h1", "h2", "h3", "h4", "h5", "h6"].map((h) => (
              <option key={h} value={h}>{h.toUpperCase()}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
        <div className="flex gap-1">
          {(["left", "center", "right"] as const).map((a) => (
            <button
              key={a}
              onClick={() => onChange({ align: a })}
              className={`flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors ${props.align === a ? "bg-brand-100 text-brand-700 ring-1 ring-brand-300" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
