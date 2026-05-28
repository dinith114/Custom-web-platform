// PaletteSearch — filter components by name
interface PaletteSearchProps { value: string; onChange: (v: string) => void; }

export function PaletteSearch({ value, onChange }: PaletteSearchProps) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search blocks..." className="mt-2 w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-brand-400 focus:outline-none" />
  );
}
