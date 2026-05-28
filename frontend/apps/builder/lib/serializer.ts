// serializer — serialize(sections) ↔ deserialize(json) for builder state ↔ API JSON
// This is the bridge between the editing UI and the database
import type { Section, PageContent } from "@builder/types";

/** Convert builder state sections to API JSON format */
export function serialize(sections: Section[]): PageContent {
  return {
    sections: sections.map((section, index) => ({
      ...section,
      order: index,
      components: section.components.map((component) => ({
        ...component,
        props: { ...component.props },
      })),
    })),
  };
}

/** Convert API JSON back to builder state sections */
export function deserialize(content: PageContent | null): Section[] {
  if (!content || !content.sections) return [];
  return content.sections
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      ...section,
      components: section.components.map((component) => ({
        ...component,
        props: { ...component.props },
      })),
    }));
}
