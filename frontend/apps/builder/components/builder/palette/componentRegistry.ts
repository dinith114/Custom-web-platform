// componentRegistry — registry of all available block types with default props
import type { BlockType, BlockProps } from "@builder/types";

export interface BlockRegistryItem {
  type: BlockType;
  label: string;
  icon: string;
  category: "content" | "media" | "layout" | "interactive";
  defaultProps: BlockProps;
}

export const BLOCK_REGISTRY: BlockRegistryItem[] = [
  { type: "heading", label: "Heading", icon: "🔤", category: "content", defaultProps: { text: "Heading", level: "h2", align: "left" } },
  { type: "text", label: "Text", icon: "📝", category: "content", defaultProps: { text: "Enter your text here...", align: "left" } },
  { type: "image", label: "Image", icon: "🖼️", category: "media", defaultProps: { src: "", alt: "Image", objectFit: "cover" } },
  { type: "button", label: "Button", icon: "🔘", category: "interactive", defaultProps: { label: "Click Me", href: "#", variant: "primary" } },
  { type: "hero", label: "Hero", icon: "🎯", category: "layout", defaultProps: { backgroundImage: "", overlay: "rgba(0,0,0,0.4)", minHeight: "400px" } },
  { type: "gallery", label: "Gallery", icon: "🎨", category: "media", defaultProps: { images: [], columns: 3, gap: "16px" } },
  { type: "form", label: "Form", icon: "📋", category: "interactive", defaultProps: { fields: [], submitLabel: "Submit" } },
  { type: "video", label: "Video", icon: "🎥", category: "media", defaultProps: { src: "", controls: true, autoPlay: false, muted: false } },
  { type: "divider", label: "Divider", icon: "➖", category: "layout", defaultProps: { dividerStyle: "solid", color: "#e5e7eb" } },
  { type: "spacer", label: "Spacer", icon: "↕️", category: "layout", defaultProps: { height: "48px" } },
];
