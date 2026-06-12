// DeviceToggle — desktop / tablet / mobile viewport switcher with SVG icons
"use client";
import { useBuilderStore } from "@/store/builderStore";
import { IconMonitor, IconTablet, IconPhone } from "@/components/shared/Icons";

const devices = [
  { mode: "desktop" as const, icon: IconMonitor, label: "Desktop" },
  { mode: "tablet" as const, icon: IconTablet, label: "Tablet" },
  { mode: "mobile" as const, icon: IconPhone, label: "Mobile" },
];

export function DeviceToggle() {
  const { deviceMode, setDeviceMode } = useBuilderStore();
  return (
    <div className="flex gap-0.5 rounded-lg bg-gray-100 p-0.5">
      {devices.map((d) => {
        const Icon = d.icon;
        const isActive = deviceMode === d.mode;
        return (
          <button
            key={d.mode}
            onClick={() => setDeviceMode(d.mode)}
            title={d.label}
            className={`rounded-md p-2 transition-colors ${
              isActive
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
