// LinkEditor — button label, URL, and variant with live onChange
"use client";
import type { BlockProps } from "@builder/types";

interface LinkEditorProps {
  props: BlockProps;
  componentId: string;
  onChange: (newProps: Record<string, any>) => void;
}

export function LinkEditor({ props, componentId, onChange }: LinkEditorProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Button Label</label>
        <input type="text" value={props.label || ""} onChange={(e) => onChange({ label: e.target.value })} className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-brand-400 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Link URL</label>
        <input type="text" value={props.href || ""} onChange={(e) => onChange({ href: e.target.value })} placeholder="/about or https://..." className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-brand-400 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Button Style</label>
        <div className="flex gap-1">
          {(["primary", "secondary", "ghost"] as const).map((v) => (
            <button key={v} onClick={() => onChange({ variant: v })} className={`flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors ${props.variant === v ? "bg-brand-100 text-brand-700 ring-1 ring-brand-300" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
