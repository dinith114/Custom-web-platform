// PageRenderer — maps publishedContent JSON sections → React JSX
import type { PageContent } from "@builder/types";
import { HeadingBlock } from "./blocks/HeadingBlock";
import { TextBlock } from "./blocks/TextBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { ButtonBlock } from "./blocks/ButtonBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { GalleryBlock } from "./blocks/GalleryBlock";
import { FormBlock } from "./blocks/FormBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { DividerBlock } from "./blocks/DividerBlock";
import { SpacerBlock } from "./blocks/SpacerBlock";

const blockMap: Record<string, React.FC<{ props: any }>> = {
  heading: HeadingBlock, text: TextBlock, image: ImageBlock, button: ButtonBlock,
  hero: HeroBlock, gallery: GalleryBlock, form: FormBlock, video: VideoBlock,
  divider: DividerBlock, spacer: SpacerBlock,
};

interface PageRendererProps { content: PageContent | null; }

export function PageRenderer({ content }: PageRendererProps) {
  if (!content || !content.sections) {
    return <div className="flex min-h-[50vh] items-center justify-center text-gray-400">No content available</div>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      {content.sections.sort((a, b) => a.order - b.order).map((section) => (
        <section key={section.id} className="py-4">
          {section.components.map((component) => {
            const Block = blockMap[component.type];
            if (!Block) return null;
            return <Block key={component.id} props={component.props} />;
          })}
        </section>
      ))}
    </div>
  );
}
