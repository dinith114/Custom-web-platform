// componentRegistry — registry of all available block types with SVG icon names
import type { BlockType, BlockProps } from "@builder/types";

export interface BlockRegistryItem {
  type: BlockType;
  label: string;
  iconName: string;
  category: "content" | "media" | "layout" | "interactive";
  defaultProps: BlockProps;
}

export const BLOCK_REGISTRY: BlockRegistryItem[] = [
  { type: "heading", label: "Heading", iconName: "heading", category: "content", defaultProps: { text: "Heading", level: "h2", align: "left" } },
  { type: "text", label: "Text", iconName: "text", category: "content", defaultProps: { text: "Enter your text here...", align: "left" } },
  { type: "image", label: "Image", iconName: "image", category: "media", defaultProps: { src: "", alt: "Image", objectFit: "cover" } },
  { type: "button", label: "Button", iconName: "button", category: "interactive", defaultProps: { label: "Click Me", href: "#", variant: "primary" } },
  { type: "hero", label: "Hero", iconName: "hero", category: "layout", defaultProps: { backgroundImage: "", overlay: "rgba(0,0,0,0.4)", minHeight: "400px" } },
  { type: "gallery", label: "Gallery", iconName: "gallery", category: "media", defaultProps: { images: [], columns: 3, gap: "16px" } },
  { type: "form", label: "Form", iconName: "form", category: "interactive", defaultProps: { fields: [], submitLabel: "Submit" } },
  { type: "video", label: "Video", iconName: "video", category: "media", defaultProps: { src: "", controls: true, autoPlay: false, muted: false } },
  { type: "divider", label: "Divider", iconName: "divider", category: "layout", defaultProps: { dividerStyle: "solid", color: "#e5e7eb" } },
  { type: "spacer", label: "Spacer", iconName: "spacer", category: "layout", defaultProps: { height: "48px" } },
];
