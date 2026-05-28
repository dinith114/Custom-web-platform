// DeviceToggle — desktop / tablet / mobile viewport switcher
"use client";
import { useBuilderStore } from "@/store/builderStore";

const devices = [
  { mode: "desktop" as const, icon: "🖥️", label: "Desktop" },
  { mode: "tablet" as const, icon: "📱", label: "Tablet" },
  { mode: "mobile" as const, icon: "📲", label: "Mobile" },
];

export function DeviceToggle() {
  const { deviceMode, setDeviceMode } = useBuilderStore();
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-0.5">
      {devices.map((d) => (
        <button key={d.mode} onClick={() => setDeviceMode(d.mode)} title={d.label} className={`rounded-md px-2.5 py-1 text-sm transition-colors ${deviceMode === d.mode ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          {d.icon}
        </button>
      ))}
    </div>
  );
}
