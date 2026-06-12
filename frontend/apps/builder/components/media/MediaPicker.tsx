// MediaPicker — modal to select a file from library, returns URL
"use client";

interface MediaPickerProps { isOpen: boolean; onClose: () => void; onSelect: (url: string) => void; siteId: string; }

export function MediaPicker({ isOpen, onClose, onSelect, siteId }: MediaPickerProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Media</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="min-h-[300px] text-center text-gray-400 flex items-center justify-center">Media files will appear here</div>
      </div>
    </div>
  );
}
