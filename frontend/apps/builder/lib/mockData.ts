// Mock data for development — used when backend is not available
import type { Site, Page, MediaFile, NavItem } from "@builder/types";

export const MOCK_USER = {
  _id: "user-001",
  name: "John Builder",
  email: "john@example.com",
  role: "owner" as const,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-03-20T14:30:00Z",
};

export const MOCK_SITES: Site[] = [
  {
    _id: "site-001",
    name: "TechStartup Pro",
    slug: "techstartup-pro",
    owner: "user-001",
    status: "published",
    settings: { favicon: "", customDomain: "", globalStyles: {} },
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-03-18T09:15:00Z",
  },
  {
    _id: "site-002",
    name: "Creative Portfolio",
    slug: "creative-portfolio",
    owner: "user-001",
    status: "draft",
    settings: { favicon: "", customDomain: "", globalStyles: {} },
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-03-19T16:45:00Z",
  },
  {
    _id: "site-003",
    name: "E-Commerce Store",
    slug: "ecommerce-store",
    owner: "user-001",
    status: "published",
    settings: { favicon: "", customDomain: "shop.example.com", globalStyles: {} },
    createdAt: "2024-03-01T12:00:00Z",
    updatedAt: "2024-03-20T11:30:00Z",
  },
  {
    _id: "site-004",
    name: "Blog & News",
    slug: "blog-news",
    owner: "user-001",
    status: "draft",
    settings: { favicon: "", customDomain: "", globalStyles: {} },
    createdAt: "2024-03-10T09:00:00Z",
    updatedAt: "2024-03-15T14:20:00Z",
  },
];

export const MOCK_PAGES: Record<string, Page[]> = {
  "site-001": [
    {
      _id: "page-001",
      siteId: "site-001",
      title: "Home",
      slug: "home",
      isHomePage: true,
      status: "published",
      draftContent: {
        sections: [
          {
            id: "sec-hero",
            order: 0,
            components: [
              { id: "comp-hero-1", type: "hero", order: 0, props: { backgroundImage: "", overlay: "rgba(99,102,241,0.8)", minHeight: "400px" } },
            ],
          },
          {
            id: "sec-intro",
            order: 1,
            components: [
              { id: "comp-h1", type: "heading", order: 0, props: { text: "Welcome to TechStartup Pro", level: "h1", align: "center" } },
              { id: "comp-p1", type: "text", order: 1, props: { text: "We build innovative solutions for modern businesses. Our platform helps startups scale faster with cutting-edge technology.", align: "center" } },
            ],
          },
          {
            id: "sec-cta",
            order: 2,
            components: [
              { id: "comp-btn1", type: "button", order: 0, props: { label: "Get Started", href: "/contact", variant: "primary" } },
              { id: "comp-btn2", type: "button", order: 1, props: { label: "Learn More", href: "/about", variant: "secondary" } },
            ],
          },
          {
            id: "sec-divider",
            order: 3,
            components: [
              { id: "comp-div1", type: "divider", order: 0, props: { dividerStyle: "solid", color: "#e5e7eb" } },
            ],
          },
          {
            id: "sec-features",
            order: 4,
            components: [
              { id: "comp-h2", type: "heading", order: 0, props: { text: "Why Choose Us?", level: "h2", align: "center" } },
              { id: "comp-p2", type: "text", order: 1, props: { text: "Lightning fast performance, beautiful design, and enterprise-grade security — all in one platform.", align: "center" } },
            ],
          },
        ],
      },
      publishedContent: null,
      seoTitle: "TechStartup Pro - Home",
      seoDescription: "Build the future with TechStartup Pro",
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-03-18T09:15:00Z",
    },
    {
      _id: "page-002",
      siteId: "site-001",
      title: "About Us",
      slug: "about",
      isHomePage: false,
      status: "draft",
      draftContent: { sections: [] },
      publishedContent: null,
      seoTitle: "About Us",
      seoDescription: "",
      createdAt: "2024-02-01T10:00:00Z",
      updatedAt: "2024-03-10T14:00:00Z",
    },
    {
      _id: "page-003",
      siteId: "site-001",
      title: "Contact",
      slug: "contact",
      isHomePage: false,
      status: "published",
      draftContent: {
        sections: [
          {
            id: "sec-contact",
            order: 0,
            components: [
              { id: "comp-ch1", type: "heading", order: 0, props: { text: "Get In Touch", level: "h1", align: "center" } },
              { id: "comp-form1", type: "form", order: 1, props: { fields: [], submitLabel: "Send Message" } },
            ],
          },
        ],
      },
      publishedContent: null,
      seoTitle: "Contact Us",
      seoDescription: "Reach out to our team",
      createdAt: "2024-02-15T10:00:00Z",
      updatedAt: "2024-03-12T11:00:00Z",
    },
  ],
  "site-002": [
    {
      _id: "page-004",
      siteId: "site-002",
      title: "Portfolio Home",
      slug: "home",
      isHomePage: true,
      status: "draft",
      draftContent: { sections: [] },
      publishedContent: null,
      seoTitle: "Creative Portfolio",
      seoDescription: "",
      createdAt: "2024-02-10T08:00:00Z",
      updatedAt: "2024-03-19T16:45:00Z",
    },
  ],
};

export const MOCK_MEDIA: MediaFile[] = [
  { _id: "media-001", siteId: "site-001", fileName: "hero-banner.jpg", fileUrl: "https://picsum.photos/800/400?random=1", fileType: "image/jpeg", fileSize: 245000, createdAt: "2024-02-01T10:00:00Z" },
  { _id: "media-002", siteId: "site-001", fileName: "team-photo.png", fileUrl: "https://picsum.photos/600/400?random=2", fileType: "image/png", fileSize: 180000, createdAt: "2024-02-05T10:00:00Z" },
  { _id: "media-003", siteId: "site-001", fileName: "product-demo.jpg", fileUrl: "https://picsum.photos/500/500?random=3", fileType: "image/jpeg", fileSize: 320000, createdAt: "2024-02-10T10:00:00Z" },
  { _id: "media-004", siteId: "site-001", fileName: "logo-dark.svg", fileUrl: "https://picsum.photos/200/200?random=4", fileType: "image/svg+xml", fileSize: 12000, createdAt: "2024-02-12T10:00:00Z" },
  { _id: "media-005", siteId: "site-001", fileName: "bg-pattern.png", fileUrl: "https://picsum.photos/400/400?random=5", fileType: "image/png", fileSize: 95000, createdAt: "2024-03-01T10:00:00Z" },
  { _id: "media-006", siteId: "site-001", fileName: "icon-set.png", fileUrl: "https://picsum.photos/300/300?random=6", fileType: "image/png", fileSize: 67000, createdAt: "2024-03-05T10:00:00Z" },
];

export const MOCK_NAV_ITEMS: NavItem[] = [
  { id: "nav-1", label: "Home", url: "/", order: 0, isVisible: true },
  { id: "nav-2", label: "About", url: "/about", order: 1, isVisible: true },
  { id: "nav-3", label: "Services", url: "/services", order: 2, isVisible: true },
  { id: "nav-4", label: "Contact", url: "/contact", order: 3, isVisible: true },
];
