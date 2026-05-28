// StyleEditor — color, spacing, font controls with live onChange
"use client";
import type { BlockProps } from "@builder/types";

interface StyleEditorProps {
  props: BlockProps;
  componentId: string;
  onChange: (newProps: Record<string, any>) => void;
}

export function StyleEditor({ props, componentId, onChange }: StyleEditorProps) {
  const style = props.style || {};

  const updateStyle = (key: string, value: string) => {
    onChange({ style: { ...style, [key]: value } });
  };

  return (
    <div className="space-y-3 border-t border-gray-200 pt-3">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Style</h4>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Text Color</label>
          <input type="color" value={props.color || "#000000"} onChange={(e) => onChange({ color: e.target.value })} className="h-8 w-full cursor-pointer rounded border border-gray-200" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">BG Color</label>
          <input type="color" value={style.backgroundColor || "#ffffff"} onChange={(e) => updateStyle("backgroundColor", e.target.value)} className="h-8 w-full cursor-pointer rounded border border-gray-200" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Padding</label>
        <input type="text" value={style.padding || ""} onChange={(e) => updateStyle("padding", e.target.value)} placeholder="e.g. 16px" className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-brand-400 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Font Size</label>
        <input type="text" value={style.fontSize || ""} onChange={(e) => updateStyle("fontSize", e.target.value)} placeholder="e.g. 18px" className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-brand-400 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Border Radius</label>
        <input type="text" value={style.borderRadius || ""} onChange={(e) => updateStyle("borderRadius", e.target.value)} placeholder="e.g. 8px" className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-brand-400 focus:outline-none" />
      </div>
    </div>
  );
}
