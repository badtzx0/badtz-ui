const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "/images"

export const registryTemplateCategories = {
  business: {
    title: "Business",
    description: "Professional templates for business applications",
    categories: [
      {
        name: "Landing Page",
        slug: "landing-page",
        hidden: false,
        image: {
          src: `${CDN_URL}/templates-categories/landing-page.webp`,
          alt: "Landing Page",
        },
      },
      {
        name: "Dashboard",
        slug: "dashboard",
        hidden: false,
        image: {
          src: `${CDN_URL}/templates-categories/dashboard.webp`,
          alt: "Dashboard",
        },
      },
      {
        name: "E-commerce",
        slug: "ecommerce",
        hidden: false,
        image: {
          src: `${CDN_URL}/templates-categories/ecommerce.webp`,
          alt: "E-commerce",
        },
      },
    ],
  },
  content: {
    title: "Content",
    description: "Templates for content-driven websites",
    categories: [
      {
        name: "Blog",
        slug: "blog",
        hidden: false,
        image: {
          src: `${CDN_URL}/templates-categories/blog.webp`,
          alt: "Blog",
        },
      },
      {
        name: "Portfolio",
        slug: "portfolio",
        hidden: false,
        image: {
          src: `${CDN_URL}/templates-categories/portfolio.webp`,
          alt: "Portfolio",
        },
      },
      {
        name: "Documentation",
        slug: "documentation",
        hidden: false,
        image: {
          src: `${CDN_URL}/templates-categories/documentation.webp`,
          alt: "Documentation",
        },
      },
    ],
  },
}
