const Template = require("./template.model");

const starterNavigation = {
  items: [
    {
      id: "nav_home",
      label: "Home",
      url: "/",
      order: 1,
      isVisible: true,
      children: [],
    },
    {
      id: "nav_about",
      label: "About",
      url: "/about",
      order: 2,
      isVisible: true,
      children: [],
    },
    {
      id: "nav_contact",
      label: "Contact",
      url: "/contact",
      order: 3,
      isVisible: true,
      children: [],
    },
  ],
};

const starterHeroSection = (headline, description, buttonLabel, buttonUrl) => ({
  sections: [
    {
      id: "sec_hero",
      type: "hero",
      order: 1,
      components: [
        {
          type: "heading",
          text: headline,
          style: {
            fontSize: "48px",
            color: "#111827",
            textAlign: "center",
          },
        },
        {
          type: "text",
          text: description,
          style: {
            fontSize: "18px",
            color: "#4b5563",
            textAlign: "center",
          },
        },
        {
          type: "button",
          label: buttonLabel,
          link: buttonUrl,
          style: {
            backgroundColor: "#111827",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "9999px",
          },
        },
      ],
    },
  ],
});

const DEFAULT_TEMPLATES = [
  {
    name: "Business Starter",
    thumbnail: "https://placehold.co/1200x800/png?text=Business+Starter",
    category: "business",
    defaultPages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        draftContent: starterHeroSection(
          "Grow Your Business Online",
          "Launch a polished website quickly with a clean business starter layout.",
          "Get Started",
          "/contact",
        ),
        seoTitle: "Business Starter Home",
        seoDescription:
          "A clean, professional starter page for service businesses.",
      },
      {
        title: "About",
        slug: "about",
        isHomePage: false,
        draftContent: {
          sections: [
            {
              id: "sec_about",
              type: "content",
              order: 1,
              components: [
                {
                  type: "heading",
                  text: "About Our Company",
                  style: { fontSize: "36px", color: "#111827" },
                },
                {
                  type: "text",
                  text: "Use this section to describe your story, values, and services.",
                  style: { fontSize: "18px", color: "#4b5563" },
                },
              ],
            },
          ],
        },
        seoTitle: "About Us",
        seoDescription: "Learn more about the company and what it offers.",
      },
    ],
    defaultNavigation: starterNavigation,
  },
  {
    name: "Portfolio Starter",
    thumbnail: "https://placehold.co/1200x800/png?text=Portfolio+Starter",
    category: "portfolio",
    defaultPages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        draftContent: starterHeroSection(
          "Showcase Your Work",
          "Present projects, case studies, and your creative style with clarity.",
          "View Projects",
          "/projects",
        ),
      },
      {
        title: "Projects",
        slug: "projects",
        isHomePage: false,
        draftContent: {
          sections: [
            {
              id: "sec_projects",
              type: "gallery",
              order: 1,
              components: [
                {
                  type: "image",
                  src: "https://placehold.co/900x600/png?text=Project+1",
                  alt: "Project 1 preview",
                },
                {
                  type: "image",
                  src: "https://placehold.co/900x600/png?text=Project+2",
                  alt: "Project 2 preview",
                },
              ],
            },
          ],
        },
      },
    ],
    defaultNavigation: {
      items: [
        {
          id: "nav_home",
          label: "Home",
          url: "/",
          order: 1,
          isVisible: true,
          children: [],
        },
        {
          id: "nav_projects",
          label: "Projects",
          url: "/projects",
          order: 2,
          isVisible: true,
          children: [],
        },
        {
          id: "nav_contact",
          label: "Contact",
          url: "/contact",
          order: 3,
          isVisible: true,
          children: [],
        },
      ],
    },
  },
  {
    name: "Blog Starter",
    thumbnail: "https://placehold.co/1200x800/png?text=Blog+Starter",
    category: "blog",
    defaultPages: [
      {
        title: "Home",
        slug: "home",
        isHomePage: true,
        draftContent: starterHeroSection(
          "Thoughts Worth Reading",
          "Publish insights, tutorials, and updates using a structured blog layout.",
          "Read Articles",
          "/posts",
        ),
      },
      {
        title: "Posts",
        slug: "posts",
        isHomePage: false,
        draftContent: {
          sections: [
            {
              id: "sec_posts",
              type: "content",
              order: 1,
              components: [
                {
                  type: "heading",
                  text: "Latest Articles",
                  style: { fontSize: "36px", color: "#111827" },
                },
                {
                  type: "text",
                  text: "This template is ready for a feed of posts, previews, and featured stories.",
                  style: { fontSize: "18px", color: "#4b5563" },
                },
              ],
            },
          ],
        },
      },
    ],
    defaultNavigation: {
      items: [
        {
          id: "nav_home",
          label: "Home",
          url: "/",
          order: 1,
          isVisible: true,
          children: [],
        },
        {
          id: "nav_posts",
          label: "Posts",
          url: "/posts",
          order: 2,
          isVisible: true,
          children: [],
        },
        {
          id: "nav_about",
          label: "About",
          url: "/about",
          order: 3,
          isVisible: true,
          children: [],
        },
      ],
    },
  },
];

const seedDefaultTemplates = async () => {
  const existingCount = await Template.countDocuments();
  if (existingCount > 0) {
    return { inserted: 0, skipped: true };
  }

  await Template.insertMany(DEFAULT_TEMPLATES, { ordered: true });
  return { inserted: DEFAULT_TEMPLATES.length, skipped: false };
};

module.exports = {
  DEFAULT_TEMPLATES,
  seedDefaultTemplates,
};
