// Mock data for development — used when backend is not available
import type { Site, Page, MediaFile, NavItem } from "@builder/types";

export const MOCK_USER = {
  _id: "user-001",
  name: "John Builder",
  email: "john@example.com",
  role: "admin" as const,
  status: "active" as const,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-03-20T14:30:00Z",
};

export const MOCK_SITES: Site[] = [
  {
    _id: "site-001",
    name: "TechStartup Pro",
    slug: "techstartup-pro",
    ownerId: "user-001",
    status: "published",
    settings: { favicon: "" },
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-03-18T09:15:00Z",
  },
  {
    _id: "site-002",
    name: "Creative Portfolio",
    slug: "creative-portfolio",
    ownerId: "user-001",
    status: "draft",
    settings: { favicon: "" },
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-03-19T16:45:00Z",
  },
  {
    _id: "site-003",
    name: "E-Commerce Store",
    slug: "ecommerce-store",
    ownerId: "user-001",
    status: "published",
    customDomain: "shop.example.com",
    settings: { favicon: "" },
    createdAt: "2024-03-01T12:00:00Z",
    updatedAt: "2024-03-20T11:30:00Z",
  },
  {
    _id: "site-004",
    name: "Blog & News",
    slug: "blog-news",
    ownerId: "user-001",
    status: "draft",
    settings: { favicon: "" },
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
            type: "hero",
            order: 0,
            components: [
              { id: "comp-hero-1", type: "hero", props: { backgroundImage: "", overlay: "rgba(99,102,241,0.8)", minHeight: "400px" } },
            ],
          },
          {
            id: "sec-intro",
            type: "content",
            order: 1,
            components: [
              { id: "comp-h1", type: "heading", props: { text: "Welcome to TechStartup Pro", level: "h1", align: "center" } },
              { id: "comp-p1", type: "text", props: { text: "We build innovative solutions for modern businesses. Our platform helps startups scale faster with cutting-edge technology.", align: "center" } },
            ],
          },
          {
            id: "sec-cta",
            type: "content",
            order: 2,
            components: [
              { id: "comp-btn1", type: "button", props: { label: "Get Started", href: "/contact", variant: "primary" } },
              { id: "comp-btn2", type: "button", props: { label: "Learn More", href: "/about", variant: "secondary" } },
            ],
          },
          {
            id: "sec-divider",
            type: "custom",
            order: 3,
            components: [
              { id: "comp-div1", type: "divider", props: { dividerStyle: "solid", color: "#e5e7eb" } },
            ],
          },
          {
            id: "sec-features",
            type: "content",
            order: 4,
            components: [
              { id: "comp-h2", type: "heading", props: { text: "Why Choose Us?", level: "h2", align: "center" } },
              { id: "comp-p2", type: "text", props: { text: "Lightning fast performance, beautiful design, and enterprise-grade security — all in one platform.", align: "center" } },
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
            type: "contact",
            order: 0,
            components: [
              { id: "comp-ch1", type: "heading", props: { text: "Get In Touch", level: "h1", align: "center" } },
              { id: "comp-form1", type: "form", props: { fields: [], submitLabel: "Send Message" } },
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
  { _id: "media-001", siteId: "site-001", uploadedBy: "user-001", fileName: "hero-banner.jpg", fileUrl: "https://picsum.photos/800/400?random=1", fileType: "image/jpeg", fileSize: 245000, storageKey: "site-001/hero-banner.jpg", uploadedAt: "2024-02-01T10:00:00Z" },
  { _id: "media-002", siteId: "site-001", uploadedBy: "user-001", fileName: "team-photo.png", fileUrl: "https://picsum.photos/600/400?random=2", fileType: "image/png", fileSize: 180000, storageKey: "site-001/team-photo.png", uploadedAt: "2024-02-05T10:00:00Z" },
  { _id: "media-003", siteId: "site-001", uploadedBy: "user-001", fileName: "product-demo.jpg", fileUrl: "https://picsum.photos/500/500?random=3", fileType: "image/jpeg", fileSize: 320000, storageKey: "site-001/product-demo.jpg", uploadedAt: "2024-02-10T10:00:00Z" },
  { _id: "media-004", siteId: "site-001", uploadedBy: "user-001", fileName: "logo-dark.svg", fileUrl: "https://picsum.photos/200/200?random=4", fileType: "image/svg+xml", fileSize: 12000, storageKey: "site-001/logo-dark.svg", uploadedAt: "2024-02-12T10:00:00Z" },
  { _id: "media-005", siteId: "site-001", uploadedBy: "user-001", fileName: "bg-pattern.png", fileUrl: "https://picsum.photos/400/400?random=5", fileType: "image/png", fileSize: 95000, storageKey: "site-001/bg-pattern.png", uploadedAt: "2024-03-01T10:00:00Z" },
  { _id: "media-006", siteId: "site-001", uploadedBy: "user-001", fileName: "icon-set.png", fileUrl: "https://picsum.photos/300/300?random=6", fileType: "image/png", fileSize: 67000, storageKey: "site-001/icon-set.png", uploadedAt: "2024-03-05T10:00:00Z" },
];

export const MOCK_NAV_ITEMS: NavItem[] = [
  { id: "nav-1", label: "Home", url: "/", order: 0, isVisible: true, children: [] },
  { id: "nav-2", label: "About", url: "/about", order: 1, isVisible: true, children: [] },
  { id: "nav-3", label: "Services", url: "/services", order: 2, isVisible: true, children: [] },
  { id: "nav-4", label: "Contact", url: "/contact", order: 3, isVisible: true, children: [] },
];
