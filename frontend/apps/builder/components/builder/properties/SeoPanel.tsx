// SeoPanel — page title, meta description fields
"use client";

export function SeoPanel() {
  return (
    <div className="space-y-3 border-t border-gray-200 pt-3">
      <h4 className="text-xs font-semibold text-gray-500 uppercase">SEO</h4>
      <div>
        <label className="block text-xs text-gray-500">Page Title</label>
        <input type="text" placeholder="SEO title..." className="mt-1 w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-brand-400 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs text-gray-500">Meta Description</label>
        <textarea placeholder="SEO description..." rows={2} className="mt-1 w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-brand-400 focus:outline-none" />
      </div>
    </div>
  );
}
