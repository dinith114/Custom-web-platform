// PaletteItem — dnd-kit draggable block from palette with SVG icons
"use client";

import { useDraggable } from "@dnd-kit/core";
import type { BlockRegistryItem } from "./componentRegistry";
import {
  IconHeading, IconText, IconImage, IconButton, IconHero,
  IconGallery, IconForm, IconVideo, IconDivider, IconSpacer,
} from "@/components/shared/Icons";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  heading: IconHeading,
  text: IconText,
  image: IconImage,
  button: IconButton,
  hero: IconHero,
  gallery: IconGallery,
  form: IconForm,
  video: IconVideo,
  divider: IconDivider,
  spacer: IconSpacer,
};

interface PaletteItemProps {
  block: BlockRegistryItem;
}

export function PaletteItem({ block }: PaletteItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${block.type}`,
    data: {
      type: "palette-item",
      blockType: block.type,
      defaultProps: block.defaultProps,
    },
  });

  const Icon = iconMap[block.iconName] || IconHeading;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex cursor-grab flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 text-center transition-all hover:border-brand-300 hover:bg-brand-50/50 hover:shadow-sm active:cursor-grabbing active:scale-95 ${
        isDragging ? "opacity-50 ring-2 ring-brand-400" : ""
      }`}
    >
      <Icon className="w-6 h-6 text-gray-500" />
      <span className="text-xs font-medium text-gray-600 leading-tight">{block.label}</span>
    </div>
  );
}
