// PaletteSearch — search input with SVG icon
"use client";
import { IconSearch } from "@/components/shared/Icons";

interface PaletteSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaletteSearch({ value, onChange }: PaletteSearchProps) {
  return (
    <div className="relative">
      <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search blocks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-200 transition-colors"
      />
    </div>
  );
}
