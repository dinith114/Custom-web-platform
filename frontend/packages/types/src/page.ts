// Page — represents a single page within a website
// Section — a grouping of components on a page
// Component — individual block element within a section

export type BlockType =
  | "heading"
  | "text"
  | "image"
  | "button"
  | "hero"
  | "gallery"
  | "form"
  | "video"
  | "divider"
  | "spacer";

export type PageStatus = "draft" | "published";

export interface BlockProps {
  // Heading
  text?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  // Image
  src?: string;
  alt?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";

  // Button
  label?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";

  // Video
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;

  // Hero
  backgroundImage?: string;
  overlay?: string;
  minHeight?: string;

  // Gallery
  images?: Array<{ src: string; alt: string }>;
  columns?: number;
  gap?: string;

  // Form
  fields?: Array<{ name: string; type: string; label: string; required?: boolean }>;
  submitLabel?: string;
  endpoint?: string;

  // Spacer
  height?: string;

  // Divider
  dividerStyle?: "solid" | "dashed" | "dotted";

  // Shared style props
  style?: Record<string, string>;
  align?: "left" | "center" | "right";
  color?: string;

  // Generic catch-all for custom props
  [key: string]: unknown;
}

export interface Component {
  id: string;
  type: BlockType;
  props: BlockProps;
}

export type SectionType =
  | "hero"
  | "content"
  | "gallery"
  | "contact"
  | "footer"
  | "custom";

export interface Section {
  id: string;
  type: SectionType;
  order: number;
  components: Component[];
}

export interface PageContent {
  sections: Section[];
}

export interface Page {
  _id: string;
  siteId: string;
  title: string;
  slug: string;
  status: PageStatus;
  isHomePage: boolean;
  draftContent: PageContent | null;
  publishedContent: PageContent | null;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreatePagePayload {
  title: string;
  slug?: string;
  isHomePage?: boolean;
}

export interface UpdatePagePayload {
  title?: string;
  slug?: string;
  isHomePage?: boolean;
  draftContent?: PageContent;
  seoTitle?: string;
  seoDescription?: string;
}
