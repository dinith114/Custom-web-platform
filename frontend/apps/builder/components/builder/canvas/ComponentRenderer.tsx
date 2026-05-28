// ComponentRenderer — renders any component by its type from the registry
import type { Component } from "@builder/types";
import { HeadingBlock } from "../blocks/HeadingBlock";
import { TextBlock } from "../blocks/TextBlock";
import { ImageBlock } from "../blocks/ImageBlock";
import { ButtonBlock } from "../blocks/ButtonBlock";
import { HeroBlock } from "../blocks/HeroBlock";
import { GalleryBlock } from "../blocks/GalleryBlock";
import { FormBlock } from "../blocks/FormBlock";
import { VideoBlock } from "../blocks/VideoBlock";
import { DividerBlock } from "../blocks/DividerBlock";
import { SpacerBlock } from "../blocks/SpacerBlock";

const blockMap: Record<string, React.FC<{ props: any }>> = {
  heading: HeadingBlock, text: TextBlock, image: ImageBlock, button: ButtonBlock,
  hero: HeroBlock, gallery: GalleryBlock, form: FormBlock, video: VideoBlock,
  divider: DividerBlock, spacer: SpacerBlock,
};

interface ComponentRendererProps { component: Component; }

export function ComponentRenderer({ component }: ComponentRendererProps) {
  const Block = blockMap[component.type];
  if (!Block) return <div className="p-2 text-sm text-red-500">Unknown block: {component.type}</div>;
  return <Block props={component.props} />;
}
