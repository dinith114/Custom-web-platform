// ImagePicker — URL input + media library modal trigger, live onChange
"use client";
import type { BlockProps } from "@builder/types";

interface ImagePickerProps {
  props: BlockProps;
  componentId: string;
  onChange: (newProps: Record<string, any>) => void;
}

export function ImagePicker({ props, componentId, onChange }: ImagePickerProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
        <input
          type="text"
          value={props.src || ""}
          onChange={(e) => onChange({ src: e.target.value })}
          placeholder="https://..."
          className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-brand-400 focus:outline-none"
        />
      </div>
      <button className="w-full rounded-md bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
        📁 Choose from Media Library
      </button>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
        <input
          type="text"
          value={props.alt || ""}
          onChange={(e) => onChange({ alt: e.target.value })}
          className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-brand-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Object Fit</label>
        <select
          value={props.objectFit || "cover"}
          onChange={(e) => onChange({ objectFit: e.target.value })}
          className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
  );
}
